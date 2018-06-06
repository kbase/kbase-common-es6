/*eslint-env node*/
/*eslint {strict: ['error', 'global']}*/
'use strict';

let requirejs = require('requirejs');
let process = require('process');
let util = require('util');
let istanbul = require('istanbul');

// let reporter = require('./reporter');
let test = require('./testRunner');

requirejs.config({
    baseUrl: './instrumented',
    nodeRequire: require
});

function print(message) {
    process.stdout.write(util.format('%s\n', message));
}

requirejs([
    'state_test',
    'props_test'
], function (
    stateTests,
    propsTests
) {
    // console.log('reporter?', ('reportTest' in new reporter.Reporter()));

    // let stateTest = new stateTests.TestRunner({
    //     reporter: new reporter.Reporter()
    // });
    // stateTest.run();
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


    // let propsTest = new propsTests.TestRunner({
    //     reporter: new reporter.Reporter()
    // });
    // propsTest.run();
    // propsTest.run();
    if (testRunner.anyFailureType()) {
        print('one or more tests failed, errored, or were incomplete');
        process.exit(1);
    } 
    print('all tests finished successfully or were skipped');
    process.exit(0);
});