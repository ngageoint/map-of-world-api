/**
   Copyright 2015 Booz Allen Hamilton

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

/* jshint -W097 */
'use strict';

var Constants = require('./const');

// The API supports multiple concurrent map
// instances that may be of different map types.
// This Singleton module is crucial to the
// implementation of the Map API and exists
// to decouple the public-facing API from
// the implementation specific adapters.  It
// manages all map instances created through the
// API and the implementation-specific adapters
// associated with each supported map type.

// private variables
var _mapObjects = {}; // key:value map of all map instances
var _activeMapObject; // the currently active map object

var mapManager = {

    // Registers a map object (and its associated map type)
    // within the _mapObjects data structure which acts as
    // a key value map indexed by divId.
    registerMapInstance: function(divId, mapType, mapObject) {
        if (_mapObjects[divId] !== undefined) {
            throw new Error('There is an existing map instance bound to "' + divId + '" that must be destroyed prior to instantiating a new map with that ID.');
        }
        _mapObjects[divId] = {
            div: divId,
            type: mapType,
            obj: mapObject
        };
    },

    // Looks up the map object for the given ID.  If a map
    // object for the given ID is found, it is set as active.
    // Otherwise, an Error is thrown.
    setActiveMap: function(divId) {
        if (_mapObjects[divId] !== undefined) {
            _activeMapObject = _mapObjects[divId];
        }
        else {
            throw new Error('There is no active map instance for divId=' + divId);
        }
    },

    // Un-registers a map object from the _mapObjects key:value map.
    // If another map object exists, it is set as active.  Otherwise,
    // there will be no active map until a new map instance is created.
    unregisterMapInstance: function(divId) {
        // ensure there is a registered map for key (divId)
        if (_mapObjects[divId] !== undefined) {
            // if un-registering the active map, look for another map instance to set as active
            if (_mapObjects[divId] === _activeMapObject) {
                _activeMapObject = undefined;
                for (var key in _mapObjects) {
                    if ((key !== divId) && _mapObjects.hasOwnProperty(key) && (_mapObjects[key] !== undefined)) {
                        _activeMapObject = _mapObjects[key];
                        break;
                    }
                }
            }
            // un-register the map
            _mapObjects[divId] = undefined;
        }
    },

    // Returns a reference to the appropriate map adapter
    // based on the type of the currently active map
    getActiveMapType: function() {
        if (_activeMapObject === undefined) {
            throw new Error('There is no active map.');

        }
        return _activeMapObject.type;
    },

    // Returns the implementation-specific map object
    // of the currently active map
    getActiveMapObject: function() {
        if ((_activeMapObject !== undefined) && (_activeMapObject.obj !== undefined)) {
            return _activeMapObject.obj;
        }
        else {
            throw new Error('There is no active map.');
        }
    },

    // Returns the map type for a given key, or an
    // Error if there is no active map for the key
    getMapType: function(divId) {
        if (_mapObjects[divId] !== undefined) {
            return _mapObjects[divId].type;
        }
        else {
            throw new Error('There is no active map with ID=' + divId);
        }
    }

};

module.exports = mapManager;
