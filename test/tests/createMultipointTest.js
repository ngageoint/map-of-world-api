var demoApp = require('../constants/demoApp');

module.exports = function(browser, assertionElement) {
    browser
        .clearValue(demoApp.input.featureId)
        .setValue(demoApp.input.featureId, 'myMultipoint')
        .clearValue(demoApp.input.theLayerId)
        .setValue(demoApp.input.theLayerId, demoApp.map.vectorLayerId)
        .click(demoApp.button.createMultipoint)
        .verify.elementPresent(assertionElement);
};
