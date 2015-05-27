var demoApp = require('../constants/demoApp');

module.exports = function(browser, optionValue) {
    browser
        .setValue(demoApp.select.mapContainer, optionValue)
        .click(demoApp.button.createMapOL3)
        .pause(1000)
        .waitForElementPresent(demoApp.map.ol3, 5000, false);
};
