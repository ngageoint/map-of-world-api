var demoApp = require('../constants/demoApp');

module.exports = function(browser, assertionElement) {
    browser
        .clearValue(demoApp.input.featureId)
        .setValue(demoApp.input.featureId, 'myPolygon')
        .clearValue(demoApp.input.theLayerId)
        .setValue(demoApp.input.theLayerId, demoApp.map.vectorLayerId)
        .clearValue(demoApp.input.pointLat2)
        .setValue(demoApp.input.pointLat2, '10')
        .clearValue(demoApp.input.pointLng2)
        .setValue(demoApp.input.pointLng2, '20')
        .clearValue(demoApp.input.pointLat3)
        .setValue(demoApp.input.pointLat3, '20')
        .clearValue(demoApp.input.pointLng3)
        .setValue(demoApp.input.pointLng3, '10')
        .click(demoApp.button.createPolygon)
        .verify.elementPresent(assertionElement);
};
