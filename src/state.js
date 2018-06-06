/*
state flows in as one or a set of facts ...
the database is divided into collections, which may be added or removed dynamically

a collection:
- must be able to handle any object added to it; if not, it throws an exception
- must be able to asisgn a unique to to any object added to it; access by key is thus always avaialble.
*/
define([

], function () {
    'use strict';

    class Database {
        constructor () {
            this.collections = {};
        }

        addCollection(name, collection) {
            if (name in this.collections) {
                throw new Error('Collection already exists: ' + name);
            }
            this.collections[name] = collection;
        }

        removeCollection(name) {
            let c = this.collections[name];
            delete this.collections[name];
            c.stop();            
        }
    }

    class Collection {
        constructor (name) {
            this.name = name;

            this.objectIndex = {};
            this.objects = [];
        }

        start() {

        }

        stop() {

        }

        // createKey(obj) {
        //    throw new
        // }

        add(newObject) {
            let key = this.createKey(newObject);
            if (key in this.objectIndex) {
                throw new Error('Object already exists in this collection: ' + key);
            }
            this.objectIndex[key] = newObject;
            this.objects.push(newObject);
        }

        get(objectStub, defaultValue) {
            let key = this.createKey(objectStub);
            if (key in this.objectIndex) {
                return this.objectIndex[key];
            } 
            return defaultValue;
        }
    }


    return {Database, Collection};
});