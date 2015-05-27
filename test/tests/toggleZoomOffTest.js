var demoApp = require('../constants/demoApp');

module.exports = function(browser, assertionElement) {
    browser
        .click(demoApp.button.toggleZoomControl)
        .verify.elementNotPresent(assertionElement);
};
