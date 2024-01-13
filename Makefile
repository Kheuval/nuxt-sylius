NVM_DIR=$(HOME)/.nvm

.PHONY: lint
lint: lint/eslint lint/tsc

.PHONY: lint/eslint
lint/eslint:
	@echo "👉 ${GREEN}Lint${END} with Eslint..."
	. "$(NVM_DIR)/nvm.sh" && nvm exec npm run lint

.PHONY: lint/tsc
lint/tsc:
	@echo "👉 ${GREEN}Checking${END} Typescript types"
	. "$(NVM_DIR)/nvm.sh" && nvm exec npm run type-check

.PHONY: tests
tests: test/e2e

.PHONY: test/e2e
test/e2e:
	@echo "👉 ${GREEN}Testing${END} with Playwright"
	. "$(NVM_DIR)/nvm.sh" && nvm exec npm run e2e
