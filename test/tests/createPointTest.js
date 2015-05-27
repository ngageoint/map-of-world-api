var demoApp = require('../constants/demoApp');

module.exports = function(browser, assertionElement) {
    browser
        .click(demoApp.tab.features)
        .clearValue(demoApp.input.featureId)
        .setValue(demoApp.input.featureId, 'myPoint')
        .clearValue(demoApp.input.theLayerId)
        .setValue(demoApp.input.theLayerId, demoApp.map.vectorLayerId)
        .clearValue(demoApp.input.pointLat)
        .setValue(demoApp.input.pointLat, '10')
        .clearValue(demoApp.input.pointLng)
        .setValue(demoApp.input.pointLng, '10')
        .click(demoApp.button.createPoint)
        .verify.elementPresent(assertionElement);
};
