define([], function () {
    'use strict';

    return Object.create({}, {
        getProp: {
            value: function (obj, props, defaultValue) {
                if (typeof props === 'string') {
                    props = props.split('.');
                } else if (!(props instanceof Array)) {
                    throw new TypeError('Invalid type for key: ' + (typeof props));
                }
                for (let i = 0; i < props.length; i += 1) {
                    if ((obj === undefined) ||
                        (typeof obj !== 'object') ||
                        (obj === null)) {
                        return defaultValue;
                    }
                    obj = obj[props[i]];
                }
                if (obj === undefined) {
                    return defaultValue;
                }
                return obj;
            }
        },
        
        hasProp: {
            value: function (obj, propPath) {
                if (typeof propPath === 'string') {
                    propPath = propPath.split('.');
                }
                for (let i = 0; i < propPath.length; i += 1) {
                    if ((obj === undefined) ||
                        (typeof obj !== 'object') ||
                        (obj === null)) {
                        return false;
                    }
                    obj = obj[propPath[i]];
                }
                if (obj === undefined) {
                    return false;
                }
                return true;
            }
        },
       
        setProp: {
            value: function (obj, path, value) {
                if (typeof path === 'string') {
                    path = path.split('.');
                }
                if (path.length === 0) {
                    return;
                }
                // pop off the last property for setting at the end.
                let propKey = path.pop(),
                    key;
                // Walk the path, creating empty objects if need be.
                while (path.length > 0) {
                    key = path.shift();
                    if (obj[key] === undefined) {
                        obj[key] = {};
                    }
                    obj = obj[key];
                }
                // Finally set the property.
                obj[propKey] = value;
                return value;
            }
        },
        
        incrProp: {
            value: function (obj, path, increment) {
                if (typeof path === 'string') {
                    path = path.split('.');
                }
                if (path.length === 0) {
                    return;
                }
                increment = (increment === undefined) ? 1 : increment;
                let propKey = path.pop(),
                    key;
                while (path.length > 0) {
                    key = path.shift();
                    if (obj[key] === undefined) {
                        obj[key] = {};
                    }
                    obj = obj[key];
                }
                if (obj[propKey] === undefined) {
                    obj[propKey] = increment;
                } else {
                    if (typeof obj[propKey] === 'number') {
                        obj[propKey] += increment;
                    } else {
                        throw new Error('Can only increment a number');
                    }
                }
                return obj[propKey];
            }
        },
       
        deleteProp: {
            value: function (obj, path) {
                if (typeof path === 'string') {
                    path = path.split('.');
                }
                if (path.length === 0) {
                    return;
                }
                let propKey = path.pop(),
                    key;
                while (path.length > 0) {
                    key = path.shift();
                    if (obj[key] === undefined) {
                        return false;
                    }
                    obj = obj[key];
                }
                delete obj[propKey];
                return true;
            }
        }       
    });

});