var demoApp = require('../constants/demoApp');

module.exports = function(browser, assertionElement) {
    browser
        .click(demoApp.tab.misc)
        .click(demoApp.button.exampleWmtsLayer)
        .pause(1000)
        .verify.elementPresent(assertionElement);
};
