var demoApp = require('../constants/demoApp');

module.exports = function(browser, assertionElement1, assertionElement2, assertionElement3) {
    browser
        .click(demoApp.tab.features)
        .click(demoApp.button.removeAllFeatures)
        .verify.elementNotPresent(assertionElement1);
    if (assertionElement2 !== undefined) {
        browser
            .verify.elementNotPresent(assertionElement2);
    }
    if (assertionElement3 !== undefined) {
        browser
            .verify.elementNotPresent(assertionElement3);
    }
};
