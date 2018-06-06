/*eslint-env node*/
let util = require('util');

define([], function () {
    'use strict';

    class Test {
        constructor(name, test, reporter) {
            this.name = name;
            this.testFun = test;
            this.reporter = reporter;
        }

        reportTest(name, elapsed, status, failure, exception) {
            this.reporter.reportTest({
                name: name,
                elapsed: elapsed,
                status: status,
                failure: failure,
                exception: exception
            });
           
        }
    
        run() {
            let name = this.name;
            let fun = this.testFun;
            let start = new Date().getTime();
            try {
                let result = fun();
                let elapsed = new Date().getTime() - start;

                if (result === true) {
                    this.reportTest(name, elapsed, 'passed');
                } else {
                    this.reportTest(name, elapsed, 'failed', result);
                }
            } catch (ex) {
                let elapsed = new Date().getTime() - start;
                this.reportTest(name, elapsed, 'exception', null, ex);
            }
        }
    }

    class TestSuite {
        constructor(name, reporter) {
            this.name = name;
            this.reporter = reporter;
            this.tests = [];
        }

        addTest(name, test) {
            this.tests.push(new Test(name, test, this.reporter));
        }

        run() {
            process.stdout.write(util.format('\n** %s\n', this.name));
            this.tests.forEach((tester) => {
                tester.run();
            });
        }
    }

    return {Test, TestSuite};
});