var demoApp = require('../constants/demoApp');

module.exports = function(browser, assertionElement) {
    browser
        .click(demoApp.button.removeMultipoint)
        .verify.elementNotPresent(assertionElement);
};
