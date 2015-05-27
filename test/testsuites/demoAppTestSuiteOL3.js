// url of the demo application running on localhost
var demoPageUrl = 'http://localhost:' + process.env.expressPort + '/demo/index.html';

// constants
var demoApp = require('../constants/demoApp');

// load each test individually from '../tests/' folder
var getCenterTest = require('../tests/getCenterTest');
var setCenterTest = require('../tests/setCenterTest');
var getZoomTest = require('../tests/getZoomTest');
var setZoomTest = require('../tests/setZoomTest');
var zoomOutTest = require('../tests/zoomOutTest');
var zoomInTest = require('../tests/zoomInTest');
// var createPointTest = require('../tests/createPointTest');
// var removePointTest = require('../tests/removePointTest');
// var createPolygonTest = require('../tests/createPolygonTest');
// var removePolygonTest = require('../tests/removePolygonTest');
// var createLineTest = require('../tests/createLineTest');
// var removeLineTest = require('../tests/removeLineTest');
// var createMultipointTest = require('../tests/createMultipointTest');
// var removeMultipointTest = require('../tests/removeMultipointTest');
var toggleScaleOnTest = require('../tests/toggleScaleOnTest');
var toggleScaleOffTest = require('../tests/toggleScaleOffTest');
// var toggleGraticuleOnTest = require('../tests/toggleGraticuleOnTest');
// var toggleGraticuleOffTest = require('../tests/toggleGraticuleOffTest');
var toggleCoordinatesOnTest = require('../tests/toggleCoordinatesOnTest');
var toggleCoordinatesOffTest = require('../tests/toggleCoordinatesOffTest');
var toggleZoomOnTest = require('../tests/toggleZoomOnTest');
var toggleZoomOffTest = require('../tests/toggleZoomOffTest');
// var zoomToPointsTest = require('../tests/zoomToPointsTest');
// var zoomToFullExtentTest = require('../tests/zoomToFullExtentTest');
// var clearAllFeaturesTest = require('../tests/clearAllFeaturesTest');
var createMapOL3Test = require('../tests/createMapOL3Test');

module.exports = {

    // launch demo app in browser and maximize window
    before: function(browser) {
        console.log('Launching ' + demoPageUrl + ' ...');
        browser
            .url(demoPageUrl)
            .maximizeWindow();
    },

    'Create Map (OpenLayers v3)': function(browser) { createMapOL3Test(browser, demoApp.divId.ol3); },
    'Get Center (OpenLayers v3)': function(browser) { getCenterTest(browser); },
    'Set Center (OpenLayers v3)': function(browser) { setCenterTest(browser); },
    'Get Zoom (OpenLayers v3)': function(browser) { getZoomTest(browser, demoApp.zoom.theDefault.toString()); },
    'Set Zoom (OpenLayers v3)': function(browser) { setZoomTest(browser, demoApp.zoom.newZoom.toString()); },
    'Zoom Out (OpenLayers v3)': function(browser) { zoomOutTest(browser, demoApp.zoom.newZoom - 1); },
    'Zoom In (OpenLayers v3)': function(browser) { zoomInTest(browser, demoApp.zoom.newZoom); },
    // 'Create Point (OpenLayers v3)': function(browser) { createPointTest(browser, demoApp.ol2.point); },
    // 'Remove Point (OpenLayers v3)': function(browser) { removePointTest(browser, demoApp.ol2.point); },
    // 'Create Polygon (OpenLayers v3)': function(browser) { createPolygonTest(browser, demoApp.ol2.polygon); },
    // 'Remove Polygon (OpenLayers v3)': function(browser) { removePolygonTest(browser, demoApp.ol2.polygon); },
    // 'Create Multipoint (OpenLayers v3)': function(browser) { createMultipointTest(browser, demoApp.ol2.point); },
    // 'Remove Multipoint (OpenLayers v3)': function(browser) { removeMultipointTest(browser, demoApp.ol2.point); },
    // 'Create Line (OpenLayers v3)': function(browser) { createLineTest(browser, demoApp.ol2.line); },
    // 'Remove Line (OpenLayers v3)': function(browser) { removeLineTest(browser, demoApp.ol2.line); },
    'Toggle Scale On (OpenLayers v3)': function(browser) { toggleScaleOnTest(browser, demoApp.ol3.scaleControl); },
    'Toggle Scale Off (OpenLayers v3)': function(browser) { toggleScaleOffTest(browser, demoApp.ol3.scaleControl); },
    // 'Toggle Graticule On (OpenLayers v3)': function(browser) { toggleGraticuleOnTest(browser, demoApp.ol2.graticuleControl); },
    // 'Toggle Graticule Off (OpenLayers v3)': function(browser) { toggleGraticuleOffTest(browser, demoApp.ol2.graticuleControl); },
    'Toggle Coordinates Control On (OpenLayers v3)': function(browser) { toggleCoordinatesOnTest(browser, demoApp.ol3.coordinatesControl); },
    'Toggle Coordinates Control Off (OpenLayers v3)': function(browser) { toggleCoordinatesOffTest(browser, demoApp.ol3.coordinatesControl); },
    // zoom control is enabled by default, so test toggle off then on...
    'Toggle Zoom Control Off (OpenLayers v3)': function(browser) { toggleZoomOffTest(browser, demoApp.ol3.zoomControl); },
    'Toggle Zoom Control On (OpenLayers v3)': function(browser) { toggleZoomOnTest(browser, demoApp.ol3.zoomControl); },
    // 'Zoom to Full Extent (OpenLayers v3)': function(browser) { zoomToFullExtentTest(browser, demoApp.zoom.theDefault); },
    // 'Zoom to Points (OpenLayers v3)': function(browser) { zoomToPointsTest(browser, demoApp.zoom.calculatedZoom); },
    // 'Clear All Features (OpenLayers v3)': function(browser) { clearAllFeaturesTest(browser, demoApp.ol2.point, demoApp.ol2.polygon, demoApp.ol2.line); },

    // call end() when complete to close out the test suite
    after: function(browser) {
        console.log('Wrapping up...');
        browser.end();
    }

};
