SHELL := /bin/bash
CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

all: build

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: Build
build:  ## Build
	build-backend
	build-frontend

.PHONY: Build Backend
build-backend:  ## Build Backend
	docker run -it --rm --name=plone -p 8080:8080 -e SITE=Plone -e ADDONS="kitconcept.volto" -e ZCML="kitconcept.volto.cors" -e PROFILES="kitconcept.volto:default-homepage" plone

.PHONY: Build Frontend
build-frontend:  ## Build Frontend
	yarn install

.PHONY: Clean
clean:  ## Clean
	git clean -Xdf

.PHONY: all clean
