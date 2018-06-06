define([], function () {
    'use strict';

    return Object.create({}, {
        getProp: {
            value: function (obj, propPath, defaultValue) {
                if (typeof propPath === 'string') {
                    propPath = propPath.split('.');
                } else if (!(propPath instanceof Array)) {
                    throw new TypeError('Invalid type for key: ' + (typeof propPath));
                }
                for (let i = 0; i < propPath.length; i += 1) {
                    if ((obj === undefined) ||
                        (typeof obj !== 'object') ||
                        (obj === null)) {
                        return defaultValue;
                    }
                    obj = obj[propPath[i]];
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
                } else if (!(propPath instanceof Array)) {
                    throw new TypeError('Invalid type for key: ' + (typeof propPath));
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
            value: function (obj, propPath, value) {
                if (typeof propPath === 'string') {
                    propPath = propPath.split('.');
                } else if (!(propPath instanceof Array)) {
                    throw new TypeError('Invalid type for key: ' + (typeof propPath));
                }
                if (propPath.length === 0) {
                    return;
                }
                // pop off the last property for setting at the end.
                let propKey = propPath[propPath.length - 1],
                    key;
                // Walk the path, creating empty objects if need be.
                for (let i = 0; i < propPath.length - 1; i += 1) {
                    key = propPath[i];
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
            value: function (obj, propPath, increment) {
                if (typeof propPath === 'string') {
                    propPath = propPath.split('.');
                } else if (!(propPath instanceof Array)) {
                    throw new TypeError('Invalid type for key: ' + (typeof propPath));
                }
                if (propPath.length === 0) {
                    return;
                }
                increment = (increment === undefined) ? 1 : increment;
                let propKey = propPath[propPath.length - 1];
                for (let i = 0; i < propPath.length - 1; i += 1) {
                    let key = propPath[i];
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
            value: function (obj, propPath) {
                if (typeof propPath === 'string') {
                    propPath = propPath.split('.');
                } else if (!(propPath instanceof Array)) {
                    throw new TypeError('Invalid type for key: ' + (typeof propPath));
                }
                if (propPath.length === 0) {
                    return;
                }
                let propKey = propPath[propPath.length - 1];
                for (let i = 0; i < propPath.length - 1; i += 1) {
                    let key = propPath[i];
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