define([], function () {
    function normalizePropPath(propPath) {
        if (typeof propPath === 'string') {
            return propPath.split('.');
        } else if (Array.isArray(propPath)) {
            return  propPath;
        }
        throw new TypeError('Invalid type for key: ' + (typeof propPath));
    }

    function getProp(obj, path, defaultValue) {
        const propPath = normalizePropPath(path);
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

    function hasProp(obj, path) {
        const propPath = normalizePropPath(path);
        for (const key of propPath) {
            if ((typeof obj !== 'object') ||
                (obj === null) ||
                !(key in obj)) {
                return false;
            }
            obj = obj[key];
        }
        return true;
    }

    function setProp(obj, path, value) {
        const propPath = normalizePropPath(path);
        if (propPath.length === 0) {
            return;
        }
        // pop off the last property for setting at the end.
        const propKey = propPath[propPath.length - 1];
        let key;
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

    function incrProp(obj, path, increment) {
        const propPath = normalizePropPath(path);
        if (propPath.length === 0) {
            return;
        }
        increment = (increment === undefined) ? 1 : increment;
        const propKey = propPath[propPath.length - 1];
        for (let i = 0; i < propPath.length - 1; i += 1) {
            const key = propPath[i];
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

    function deleteProp(obj, path) {
        const propPath = normalizePropPath(path);
        if (propPath.length === 0) {
            return false;
        }
        const propKey = propPath[propPath.length - 1];
        for (let i = 0; i < propPath.length - 1; i += 1) {
            const key = propPath[i];
            if (obj[key] === undefined) {
                // for idempotency, and utility, do not throw error if
                // the key doesn't exist.
                return false;
            }
            obj = obj[key];
        }
        if (obj[propKey] === undefined) {
            return false;
        }
        delete obj[propKey];
        return true;
    }

    class Props {
        constructor(config = {}) {
            if (config.data) {
                this.obj = Object.assign({}, config.data);
            } else {
                this.obj = {};
            }
        }

        getItem(path, defaultValue) {
            return getProp(this.obj, path, defaultValue);
        }

        hasItem(path) {
            return hasProp(this.obj, path);
        }

        setItem(path, value) {
            return setProp(this.obj, path, value);
        }

        incrItem(path, increment) {
            return incrProp(this.obj, path, increment);
        }

        deleteItem(path) {
            return deleteProp(this.obj, path);
        }

        getRaw() {
            return this.obj;
        }
    }

    return Object.freeze({ Props, getProp, hasProp, setProp, incrProp, deleteProp });
});