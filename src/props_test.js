define([
    './props'
    // './unitTest'
], function (
    props
    // unitTest
) {
    'use strict';

    function testGetSimpleProp(test) {
        let params = [
            {
                expected: 'Coco',
                prop: 'name'
            },
            {
                expected: 'Coco',
                prop: ['name']
            }
        ];

        params.forEach((param) => {
            let data = {
                name: param.expected
            };
    
            let result = props.getProp(data, param.prop);
            if (result === param.expected) {
                test.success();
            } else {
                test.fail();
            }
        });
    }

    function testGetPropPath(test) {
        let data = {
            name: 'Coco',
            favoriteFoods: {
                breakfast: 'chow',
                lunch: 'chow',
                dinner: 'special-chow'
            }
        };

        let params = [
            {
                expected: 'special-chow',
                prop: 'favoriteFoods.dinner'
            },
            {
                expected: 'special-chow',
                prop: ['favoriteFoods', 'dinner']
            }
        ];

        params.forEach((param) => {    
            let result = props.getProp(data, param.prop);
            if (result === param.expected) {
                test.success();
            } else {
                test.fail();
            }
        });
    }

    function testSetThenGetProp(test) {
        let params = [
            {
                value: 'peet',
                prop: 'name'
            },
            {
                value: 'special-chow',
                prop: ['name']
            }
        ];

        params.forEach((param) => {   
            let data = {}; 
            props.setProp(data, param.prop, param.value);
            let result = props.getProp(data, param.prop);
            if (result === param.value) {
                test.success();
            } else {
                test.fail({
                    actual: result,
                    expected: param.value
                });
            }
        });
    }

    function testSetThenHasProp(test) {
        let params = [
            {
                value: 'peet',
                prop: 'name'
            },
            {
                value: 'special-chow',
                prop: ['name']
            }
        ];

        params.forEach((param) => {   
            let data = {}; 
            props.setProp(data, param.prop, param.value);
            if (props.hasProp(data, param.prop)) {
                test.success();
            } else {
                test.fail();
            }
        });
    }

    function testSetThenDeleteThenGetProp(test) {
        let data = {};

        let name = 'peet';
        props.setProp(data, 'name', name);
        let result1 = props.getProp(data, 'name');

        props.deleteProp(data, 'name');
        let result2 = props.getProp(data, 'name', null);

        if (result1 === name && result2 === null) {
            test.success();
        } else {
            test.fail();
        }
    }

    function testIncrement(test) {
        let params = [
            {
                prop: 'goals',
                initial: 0,
                expected: 1
            },
            {
                prop: 'goals',
                initial: -1,
                expected: 0
            },
        ];

        params.forEach((param) => {   
            let data = {
                goals: param.initial
            }; 
            props.incrProp(data, param.prop);
            let value = props.getProp(data, param.prop);
            if (value === param.expected) {
                test.success();
            } else {
                test.fail();
            }
        });
    }

    return {
        testGetSimpleProp, 
        testGetPropPath, 
        testSetThenGetProp, 
        testSetThenDeleteThenGetProp,
        testSetThenHasProp,
        testIncrement
    };
});