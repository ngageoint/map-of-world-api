var demoApp = require('../constants/demoApp');

module.exports = function(browser, optionValue) {
    browser
        .setValue(demoApp.select.mapContainer, optionValue)
        .click(demoApp.button.createLeafletMap)
        .pause(1000)
        .waitForElementPresent(demoApp.map.leaflet, 5000, false);
};
