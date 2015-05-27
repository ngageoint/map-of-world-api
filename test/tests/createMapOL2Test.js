var demoApp = require('../constants/demoApp');

var OPEN_LAYERS_MAP_CONTAINER_CSS_CLASS = 'olMap';

module.exports = function(browser, optionValue) {
    browser
        .setValue(demoApp.select.mapContainer, optionValue)
        .click(demoApp.button.createMapOL2)
        .verify.cssClassPresent(demoApp.map.ol2, OPEN_LAYERS_MAP_CONTAINER_CSS_CLASS);
};
