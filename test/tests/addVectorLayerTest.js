var demoApp = require('../constants/demoApp');

module.exports = function(browser, assertionElement) {
    browser
        .click(demoApp.tab.layers)
        .clearValue(demoApp.input.layerId)
        .setValue(demoApp.input.layerId, demoApp.map.vectorLayerId)
        .click(demoApp.button.addVectorLayer)
        .pause(1000)
        .verify.elementPresent(assertionElement);
};
