test: 
	@echo "Running unit tests..."
	@if [ ! -d "instrumented" ]; then mkdir instrumented; fi
	@rm instrumented/*
	@./node_modules/.bin/istanbul instrument ./src --output ./instrumented --save-baseline --x "*_test.js"
	@cp src/*_test.js instrumented
	@node test/unit/run-tests.js

.PHONY: all test build