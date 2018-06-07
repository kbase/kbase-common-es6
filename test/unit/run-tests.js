/*eslint-env node*/
/*eslint {strict: ['error', 'global']}*/
'use strict';

let Promise = require('bluebird');
let requirejs = Promise.promisify(require('requirejs'));
let process = require('process');
let util = require('util');
let istanbul = require('istanbul');
let glob = Promise.promisify(require('glob').Glob);
let path = require('path');

// let reporter = require('./reporter');
let test = require('./testRunner');

requirejs.config({
    baseUrl: './instrumented',
    nodeRequire: require
});

function print(message) {
    process.stdout.write(util.format('%s\n', message));
}

glob('*_test.js', {
    cwd: 'src/',
    nodir: true
})
    .then((testFiles) => {
        let modules = testFiles.map((file) => {
            return path.basename(file, '.js');
        });
        return requirejs(modules, function (
            stateTests,
            propsTests
        ) {
            let collector = new istanbul.Collector();
            let reporter = new istanbul.Reporter();
            let instrumenter = new istanbul.Instrumenter();
            let report = istanbul.Report.create('text');

            let testRunner = new test.UnitTestRunner({
                testModules: [propsTests, stateTests],
                coverage: {
                    collector, reporter, instrumenter, report
                }
            });
            testRunner.run();
            testRunner.report();
            report.writeReport(collector);

            if (testRunner.anyFailureType()) {
                print('one or more tests failed, errored, or were incomplete');
                process.exit(1);
            } 
            print('all tests finished successfully or were skipped');
            process.exit(0);
        });
    });