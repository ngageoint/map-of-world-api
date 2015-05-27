var demoApp = require('../constants/demoApp');

module.exports = function(browser) {
    var lat = '10';
    var lng = '10';
    console.log('Setting the center to [' + lat + ',' + lng + '] ...');
    browser
        .clearValue(demoApp.input.centerLat)
        .setValue(demoApp.input.centerLat, lat)
        .clearValue(demoApp.input.centerLng)
        .setValue(demoApp.input.centerLng, lng)
        .click(demoApp.button.setCenter)
        .pause(1000)
        .click(demoApp.button.getCenter)
        .getText(demoApp.span.currentLat, function(result) {
            var lat = Number(result.value);
            var inRange = lat > 0;
            console.log('Verifying lat ' + lat + ' is within reasonable range...');
            this.verify.equal(inRange, true);
        })
        .getText(demoApp.span.currentLng, function(result) {
            var lng = Number(result.value);
            var inRange = lng > 0;
            console.log('Verifying lng ' + lng + ' is within reasonable range...');
            this.verify.equal(inRange, true);
        });
};
