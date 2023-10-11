#!make

help:
	@echo "Usage: make [build|start|start_dev|test|lint|format_code"
	@echo ""
	@echo "Usage:"
	@echo "  make build  	         Builds the server for production and copies it to the dist folder"
	@echo "  make start  	         Starts the server in production mode"
	@echo "  make start_dev          Starts the server in development mode"
	@echo "  make test  	         Runs the server tests"
	@echo "  make lint  	         Runs the server linter"
	@echo "  make format_code        Formats the server code with prettier and fix the code style"
	@echo ""

setup: package.json
	npm install

build: setup
	npm run build

start: setup
	npm run start

start_dev: setup
	npm run dev

test: setup
	npm run test

lint: setup
	npm run lint

format-code: setup
	npm run prettier
