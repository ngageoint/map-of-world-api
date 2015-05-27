API Usage
-----------

Include the CSS file for the desired map implementation:

    <!-- OpenLayers -->
    <link rel="stylesheet" href="<openlayers_path>/style.css" />

    <!-- or -->

    <!-- Leaflet -->
    <link rel="stylesheet" href="<leaflet_path>/leaflet.css" />

Include the minified Map API JavaScript source:

    <script type="text/javascript" src="<path>/mapapi.min.js"></script>

All API functionality exists under the global `mapapi` namespace.

Constants are provided under the `mapapi.constant.*` namespace and factory methods are provided under the `mapapi.factory.*` namespace.

API Usage Examples
------------------

Create an OpenLayers 2 map bound to `<div id='map1'>`:

    mapapi.createMap('map1', mapapi.constant.mapType.OPENLAYERS);

Create a Leaflet map bound to `<div id='map2'>`:

    mapapi.createMap('map2', mapapi.constant.mapType.LEAFLET);

Create an OpenLayers 3 map bound to `<div id='map1'>`:

    mapapi.createMap('map1', mapapi.constant.mapType.OPENLAYERS3);

Create an OpenLayers 2 map bound to `<div id='map1'>` with a callback function that is called once the map has loaded:

    var callback = function() {
        console.log('Map is done loading.');
    }
    mapapi.createMap('map1', mapapi.constant.mapType.OPENLAYERS, callback);

Create a Leaflet map bound to `<div id='map2'>` with a callback function that is called once the map has loaded:

    var callback = function() {
        console.log('Map is done loading.');
    }
    mapapi.createMap('map2', mapapi.constant.mapType.LEAFLET, callback);

Create an OpenLayers 2 map bound to `<div id='map1'>` with an ArcGIS93Rest base layer:

    var callback; // omitted
    var baseLayer = mapapi.factory.arcGIS93RestLayer('http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/export');
    mapapi.createMap('map1', mapapi.constant.mapType.OPENLAYERS, callback, baseLayer);

Create a Leaflet map bound to `<div id='map2'>` with an ArcGIS93Rest base layer:

     var callback; // omitted
     var baseLayer = mapapi.factory.arcGIS93RestLayer('http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/export');
     mapapi.createMap('map2', mapapi.constant.mapType.LEAFLET, callback, baseLayer);

Create an OpenLayers 2 map bound to `<div id='map1'>` with an ArcGISCache base layer:

    var callback; // omitted
    var baseLayer = mapapi.factory.arcGISCacheLayer('http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer');
    mapapi.createMap('map1', mapapi.constant.mapType.OPENLAYERS, callback, baseLayer);

Create an OpenLayers 2 map bound to BLAH with a KML base layer:

    var callback; // omitted
    var kmlLayer = mapapi.factory.kmlLayer('londonKml', 'resources/mapperz-kml-example.kml');
    mapapi.createMap('map1', mapapi.constant.mapType.OPENLAYERS, callback, kmlLayer);

Create an OpenLayers 2 map bound to BLAH with a GeoJSON base layer:

    var callback; // omitted
    var geoJsonLayer = mapapi.factory.geoJsonLayer('myGeoJsonLayer', 'resources/exampleGeo.json');
    mapapi.createMap('map1', mapapi.constant.mapType.OPENLAYERS, callback, geoJsonLayer);

Set the OpenLayers map (`map1`) as the active map:

    mapapi.setActiveMap('map1');

Reset the map with ID = `map1`:

    mapapi.resetMap('map1');

Destroy the map with ID = `map1`:

    mapapi.destroyMap('map1');

Update the size of `map1` after the containing DIV has been resized:

    mapapi.updateSize('map1');

Remove all features from the active map:

    mapapi.clearAllFeatures();

Zoom the map in one level:

    mapapi.zoomIn();

Zoom the map out one level:

    mapapi.zoomOut();

Get the current zoom level of the map:

    mapapi.getZoom();

Set the current zoom level of the map:

    mapapi.setZoom(3);

Zoom to the full extent and recenter:

    mapapi.zoomToMaxExtent();

Automatically calculate the bounds of the layer named `vector` and zoom accordingly:

    mapapi.zoomToData('vector');

Get the center of the map:

    mapapi.getCenter();

Set the center of the map:

    var coord = mapapi.factory.coordinate(10, 10);
    mapapi.setCenter(coord);

Create a Point with featureId = `myPoint`:

    var coord = mapapi.factory.coordinate(10, 10);
    mapapi.addPoint('myPoint', 'myLayerId', coord);

Remove the Point with featureId = `myPoint`:

    mapapi.removePoint('myPoint');

Create a Point with a custom image icon:

    var img = mapapi.factory.image('http://maps.gpsvisualizer.com/google_maps/icons/google/blue.png', 20, 34);
    var coord = mapapi.factory.coordinate(10, 10);
    mapapi.addPoint('myPoint', 'myLayerId', coord, img);

Create a Multipoint with featureId = `myMultipoint`:

    var coordinates = [];
    coordinates.push(mapapi.factory.coordinate(10, 10));
    coordinates.push(mapapi.factory.coordinate(10, 20));
    coordinates.push(mapapi.factory.coordinate(20, 10));
    mapapi.addMultipoint('myMultipoint', 'myLayerId', coordinates);

Remove the Multipoint with featureId = `myMultipoint`:

    mapapi.removeMultipoint('myMultipoint');

Create a Line with featureId = `myLine`:

    var coordinates = [];
    coordinates.push(mapapi.factory.coordinate(10, 10));
    coordinates.push(mapapi.factory.coordinate(10, 20));
    coordinates.push(mapapi.factory.coordinate(20, 10));
    mapapi.addLine('myLine', 'nameOfLayerContainingTheLine', coordinates);

Remove the Line with featureId = `myLine`:

    mapapi.removeLine('myLine');

Create a Polygon with featureId = `myPolygon`:

    var coordinates = [];
    coordinates.push(mapapi.factory.coordinate(10, 10));
    coordinates.push(mapapi.factory.coordinate(10, 20));
    coordinates.push(mapapi.factory.coordinate(20, 10));
    mapapi.addPolygon('myPolygon', 'nameOfLayerContainingThePolygon', coordinates);

Remove the Polygon with featureId = `myPolygon`:

    mapapi.removePolygon('myPolygon');

Register a listener function to be called when points/markers are clicked:

    var listener = function(featureId) {
        alert(featureId + ' was clicked.');
    };
    mapapi.registerClickListener('myClickListenerId', listener);

Un-register an existing click listener function called `myClickListenerId`:

    mapapi.unregisterClickListener('myClickListenerId');

Register a listener function to be called when points/markers are hovered:

    var listener = function(featureId) {
        alert(featureId + ' was hovered.');
    };
    mapapi.registerHoverListener('myHoverListenerId', listener);

Register a listener function to be called after the map has been zoomed:

    var listener = function(featureId) {
        alert('Map was zoomed!');
    };
    mapapi.registerZoomEndListener('myZoomListener', listener);

Add a WMS layer:

    var layers = [];
    layers.push('dwd:BASISGRUNDKARTE');
    layers.push('dwd:BASISBUNDESLAENDER');
    var wmsLayer = mapapi.factory.wmsLayer('myLayer', 'http://maps.dwd.de/geoserver/wms', layers);
    // optionally:
    // wmsLayer.setFormat('image/png');
    // etc. - reference documentation for WMSLayer
    mapapi.addWmsLayer(wmsLayer);

Add a WMTS layer:

    var layer = mapapi.factory.wmtsLayer('USA Population Change 2000-2010', 'http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_2000-2010_Population_Change/MapServer/WMTS/', 'Demographics_USA_2000-2010_Population_Change', 'default028mm', 'default');
    mapapi.addWmtsLayer(layer);

Add a KML layer (locally hosted file, accessed over HTTP):

    var kmlLayer = mapapi.factory.kmlLayer('londonKml', 'resources/mapperz-kml-example.kml');
    mapapi.addKml(kmlLayer);

Add a GeoJSON layer (locally hosted file, accessed over HTTP):

    var geoJsonLayer = mapapi.factory.geoJsonLayer('myGeoJsonLayer', 'resources/exampleGeo.json');
    mapapi.addGeoJson(geoJsonLayer);

Toggle the visibility of the layer with ID = `myLayer`:

    mapapi.toggleLayer('myLayer');

Get the layer object with ID = `myLayer`:

    mapapi.getLayer('myLayer');

Remove the layer with ID = `myLayer`:

    mapapi.removeLayer('myLayer');

Get the zOrder of a Layer:

    mapapi.getLayerOrder('myLayer');

Set the zOrder of a Layer:

    mapapi.setLayerOrder('myLayer', 3);

Set `myLayer` as the base layer:

    mapapi.setBaseLayer('myLayer');

Get the opacity of a Layer:

    mapapi.getLayerOpacity('myLayer');

Set the opacity of a Layer:

    mapapi.setLayerOpacity('myLayer', 0.5);

Toggle the user interface zoom control:

    mapapi.toggleZoomControl();

Toggle the user interface scale control:

    mapapi.toggleScaleControl();

Toggle the user interface coordinates control:

    mapapi.toggleCoordinatesControl();

Toggle the user interface graticule control:

    mapapi.toggleGraticuleControl();

Get the currently active (native) map object:

    mapapi.getActiveMapObject();
