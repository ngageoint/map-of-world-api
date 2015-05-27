var demoApp = require('../constants/demoApp');

module.exports = function(browser, assertionElement) {
    browser
        .clearValue(demoApp.input.featureId)
        .setValue(demoApp.input.featureId, 'myLine')
        .clearValue(demoApp.input.theLayerId)
        .setValue(demoApp.input.theLayerId, demoApp.map.vectorLayerId)
        .click(demoApp.button.createLine)
        .verify.elementPresent(assertionElement);
};
