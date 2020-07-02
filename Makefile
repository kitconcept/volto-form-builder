SHELL := /bin/bash
CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))


# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

.PHONY: all
all: build

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: build
build:  ## Build
	@echo "Build"
	make build-backend
	make build-frontend

.PHONY: build-frontend
build-frontend:  ## Build React Frontend
	@echo "Build Frontend"
	yarn
	yarn build

.PHONY: start-frontend
start-frontend:  ## Start React Frontend
	@echo "Start Frontend"
	yarn start

api/bin/pip:
	@echo "$(GREEN)==> Setup Virtual Env$(RESET)"
	(cd api && python3 -m venv .)
#	(cd api && bin/pip install pip --upgrade)

.PHONY: build-backend
build-backend: api/bin/pip ## Create virtualenv and run buildout
	@echo "$(GREEN)==> Setup Build$(RESET)"
	(cd api && bin/pip install -r requirements.txt --upgrade)
	(cd api && bin/buildout)

.PHONY: clean
clean: ## Remove old virtualenv and creates a new one
	@echo "$(RED)==> Cleaning environment and build$(RESET)"
	rm -rf node_modules build
	(cd api && rm -rf bin lib include share develop-eggs .Python parts .installed.cfg .mr.developer.cfg)

.PHONY: code-analysis
code-analysis: ## Run static code analysis
	@echo "$(GREEN)==> Run static code analysis$(RESET)"
	(cd api && bin/code-analysis)

.PHONY: test
test:
	make test-backend
	make test-frontend

.PHONY: test-frontend
test-frontend: ## Run Frontend Tests
	@echo "$(GREEN)==> Run Frontend Tests$(RESET)"
	CI=true yarn test

.PHONY: test-backend
test-backend: ## Run Backend Tests
	@echo "$(GREEN)==> Run Backend Tests$(RESET)"
	(cd api && PYTHONWARNINGS=ignore bin/test --xml)

.PHONY: test-acceptance
test-acceptance: ## Run Acceptance Tests
	@echo "$(GREEN)==> Run Acceptance Tests$(RESET)"
	yarn ci:cypress:run

.PHONY: Build Backend
build-backend:  ## Build Backend
	(cd api && python3 -m venv .)
	(cd api && bin/pip install -r requirements.txt)
	(cd api && bin/buildout)

# .PHONY: Build Backend
# build-backend:  ## Build Backend
# 	docker run -it --rm --name=plone -p 8080:8080 -e SITE=Plone -e ADDONS="kitconcept.volto" -e ZCML="kitconcept.volto.cors" -e PROFILES="kitconcept.volto:default-homepage" plone

.PHONY: Build Frontend
build-frontend:  ## Build Frontend
	yarn && RAZZLE_API_PATH=http://localhost:55001/plone yarn build

test-acceptance-server:
	ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,kitconcept.volto,kitconcept.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,kitconcept.volto:default-homepage ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

dist:
	yarn
	yarn build

start-frontend: dist
	yarn start:prod

.PHONY: start-test-backend
start-test-backend: ## Start Test Plone Backend
	@echo "$(GREEN)==> Start Test Plone Backend$(RESET)"
	ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.restapi,kitconcept.volto,kitconcept.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,kitconcept.volto:default-homepage ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: start-test-frontend
start-test-frontend: ## Start Test Volto Frontend
	@echo "$(GREEN)==> Start Test Volto Frontend$(RESET)"
	RAZZLE_API_PATH=http://localhost:55001/plone yarn build && NODE_ENV=production node build/server.js

.PHONY: start-test
start-test: ## Start Test
	@echo "$(GREEN)==> Start Test$(RESET)"
	yarn cypress:open

.PHONY: start-test-all
start-test-all: ## Start Test
	@echo "$(GREEN)==> Start Test$(RESET)"
	yarn ci:cypress:run

.PHONY: start-test-frontend
start-test-frontend: ## Start Volto Test Frontend
	@echo "$(GREEN)==> Start Volto Test Frontend$(RESET)"
	RAZZLE_API_PATH=http://localhost:55001/plone yarn build && NODE_ENV=production node build/server.js

.PHONY: start-test
start-test: ## Start Tests
	@echo "$(GREEN)==> Start Test$(RESET)"
	NODE_ENV=development yarn cypress open
