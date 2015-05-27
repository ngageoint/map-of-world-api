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

var _ = require('lodash');

function EventManager() {
    this._clickListeners = {};
    this._hoverListeners = {};
    this._mapMoveListeners = {};
    this._zoomEndListeners = {};
    this._outListeners = {};
}

EventManager.prototype.registerClickListener = function(id, func) {
    this._clickListeners[id] = func;
};

EventManager.prototype.unregisterClickListener = function(id) {
    if (this._clickListeners[id] !== undefined) {
        this._clickListeners[id] = undefined;
    }
};

EventManager.prototype.handleClickEvent = function(eventData) {
    _.forOwn(this._clickListeners, function(clickListener, id) {
        if (clickListener !== undefined) {
            clickListener(eventData);
        }
    });
};

EventManager.prototype.registerHoverListener = function(id, func) {
    this._hoverListeners[id] = func;
};

EventManager.prototype.unregisterHoverListener = function(id) {
    if (this._hoverListeners[id] !== undefined) {
        this._hoverListeners[id] = undefined;
    }
};

EventManager.prototype.handleHoverEvent = function(eventData) {
    _.forOwn(this._hoverListeners, function(hoverListener, id) {
        if (hoverListener !== undefined) {
            hoverListener(eventData);
        }
    });
};

EventManager.prototype.registerMapMoveListener = function(id, func) {
    this._mapMoveListeners[id] = func;
};

EventManager.prototype.unregisterMapMoveListener = function(id) {
    if (this._mapMoveListeners[id] !== undefined) {
        this._mapMoveListeners[id] = undefined;
    }
};

EventManager.prototype.handleMapMoveEvent = function(eventData) {
    _.forOwn(this._mapMoveListeners, function(mapMoveListener, id) {
        if (mapMoveListener !== undefined) {
            mapMoveListener(eventData);
        }
    });
};

EventManager.prototype.registerZoomEndListener = function(id, func) {
    this._zoomEndListeners[id] = func;
};

EventManager.prototype.unregisterZoomEndListener = function(id) {
    if (this._zoomEndListeners[id] !== undefined) {
        this._zoomEndListeners[id] = undefined;
    }
};

EventManager.prototype.handleZoomEndEvent = function(eventData) {
    _.forOwn(this._zoomEndListeners, function(zoomEndListener, id) {
        if (zoomEndListener !== undefined) {
            zoomEndListener(eventData);
        }
    });
};

EventManager.prototype.registerOutListener = function(id, func) {
    this._outListeners[id] = func;
};

EventManager.prototype.unregisterOutListener = function(id) {
    if (this._outListeners[id] !== undefined) {
        this._outListeners[id] = undefined;
    }
};

EventManager.prototype.handleOutEvent = function(eventData) {
    _.forOwn(this._outListeners, function(outListener, id) {
        if (outListener !== undefined) {
            outListener(eventData);
        }
    });
};

module.exports = EventManager;
