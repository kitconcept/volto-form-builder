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

.PHONY: build-backend
build-backend:  ## Create virtualenv and run buildout
	@echo "$(GREEN)==> Setup Build$(RESET)"
	(cd api && python3 -m venv .)
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
	PYTHONWARNINGS=ignore bin/test --xml

.PHONY: test-acceptance
test-acceptance: ## Run Acceptance Tests
	@echo "$(GREEN)==> Run Acceptance Tests$(RESET)"
	yarn ci:cypress:run

.PHONY: start-backend
start-backend: ## Start Plone Backend
	@echo "$(GREEN)==> Start Plone Backend$(RESET)"
	(cd api && PYTHONWARNINGS=ignore bin/instance fg)

.PHONY: start-test-backend
start-test-backend: ## Start Plone Test Backend
	@echo "$(GREEN)==> Start Plone Test Backend$(RESET)"
	ZSERVER_PORT=55001 CONFIGURE_PACKAGES=plone.app.contenttypes,plone.app.multilingual,plone.restapi,kitconcept.volto,kitconcept.volto.cors APPLY_PROFILES=plone.app.contenttypes:plone-content,plone.restapi:default,plone.app.multilingual:default,kitconcept.volto:default ./api/bin/robot-server plone.app.robotframework.testing.PLONE_ROBOT_TESTING

.PHONY: start-test-frontend
start-test-frontend: ## Start Volto Test Frontend
	@echo "$(GREEN)==> Start Volto Test Frontend$(RESET)"
	RAZZLE_API_PATH=http://localhost:55001/plone yarn build && NODE_ENV=production node build/server.js

.PHONY: start-test
start-test: ## Start Tests
	@echo "$(GREEN)==> Start Test$(RESET)"
	NODE_ENV=development yarn cypress open
