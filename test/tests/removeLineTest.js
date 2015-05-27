var demoApp = require('../constants/demoApp');

module.exports = function(browser, assertionElement) {
    browser
        .click(demoApp.button.removeLine)
        .verify.elementNotPresent(assertionElement);
};
