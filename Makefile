# Project related variables
PROJECTNAME=$(shell basename "$(PWD)")
DONE="\n  $(M)  done ✨"

.SILENT: help
help: Makefile
	@echo "\n Choose a command to run in "$(PROJECTNAME)":\n"
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'

## dev: Runs everything you need to develop api and cms
.SILENT: dev 
dev:
	@echo "Starting development mode"
	$(MAKE) install
	@echo "Registering package locally via yarn link"
	yarn link 
	@echo $(DONE)

## install: Sets Volta engine and yarn installs
.PHONY: install
install:
	@echo "  $(M) Checking if there is any missing dependencies"
	volta install node@8.11.1
	volta install yarn@1.22.19 
	volta setup
	yarn 
	@echo $(DONE)