NVM_DIR=$(HOME)/.nvm

.DEFAULT_GOAL := help

.PHONY: help
help: ## Show help message
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[$$()% a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: lint
lint: ## Lint project
	make lint/eslint lint/tsc

.PHONY: lint/eslint
lint/eslint: ## Lint project with Eslint
	@echo "👉 ${GREEN}Lint${END} with Eslint..."
	. "$(NVM_DIR)/nvm.sh" && nvm exec pnpm run lint

.PHONY: lint/tsc
lint/tsc: ## Lint project with Typescript
	@echo "👉 ${GREEN}Checking${END} Typescript types"
	. "$(NVM_DIR)/nvm.sh" && nvm exec npx nuxi typecheck

.PHONY: tests
tests: ## Run tests
	@echo "👉 ${GREEN}Testing...${END}"
	. "$(NVM_DIR)/nvm.sh" && nvm exec dotenv -e .env.local pnpm vitest run

.PHONY: Start dev server
dev: ## Start the dev server with env variables from .env.local
	. "$(NVM_DIR)/nvm.sh" && nvm exec dotenv -e .env.local pnpm run dev
