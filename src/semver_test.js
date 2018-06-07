define([
    './semver'
], function (
    semver
) {
    'use strict';

    function arraysEqual(a1, a2) {
        if (a1.length !== a2.length) {
            return false;
        }
        for (let i = 0; i < a1.length; i += 1) {
            if (a1[i] !== a2[i]) {
                return false;
            }
        }
        return true;
    }

    function testParseSemver(test) {
        let data = [
            {
                input: '1.2.3',
                expected: [1, 2, 3]
            }
        ];

        data.forEach((datum) => {
            let result = semver.parseSemver(datum.input);
            if (arraysEqual(result, datum.expected)) {
                test.success();
            } else {
                test.fail({
                    actual: result,
                    expected: datum.expected
                });
            }
        });
    }

    function testComparison(test) {
        let data = [
            {
                base: '1.2.3',
                version: '1.2.3',
                expected: true
            },
            {
                base: '1.2.3',
                version: '1.2.4',
                expected: 'patch-too-low'
            },
            {
                base: '1.2.3',
                version: '1.3.3',
                expected: 'minor-too-low'
            },
            {
                base: '2.2.3',
                version: '1.2.4',
                expected: 'major-incompatible'
            },
        ];

        data.forEach((datum) => {
            let result = semver.semverIsAtLeast(datum.base, datum.version);
            if (result === datum.expected) {
                test.success();
            } else {
                test.fail({
                    actual: result,
                    expected: datum.expected
                });
            }
        });
    }

    return {testParseSemver, testComparison};
});