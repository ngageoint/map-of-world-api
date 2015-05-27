/**
   Copyright 2015 Booz Allen Hamilton

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

$( document ).ready(function() {

    /*  -----------------------------------------------------------------------
     *
     *  Utility Methods
     *
     *  -----------------------------------------------------------------------
    */
    function getCoordinates() {
        var lats = [];
        $('.featureLat').each(function() {
            var lat = parseFloat($(this).val(), 10);
            lats.push(lat);
        });
        var lngs = [];
        $('.featureLng').each(function() {
            var lng = parseFloat($(this).val(), 10);
            lngs.push(lng);
        });
        if(lats.length !== lngs.length) {
            throw new Error('Mismatching number of lats & lngs!!!');
        }
        var coordinates = [];
        for(var i = 0; i < lats.length; i++) {
            var coordinate = mapapi.factory.coordinate(lats[i], lngs[i]);
            coordinates.push(coordinate);
        }
        return coordinates;
    }

    /*	-----------------------------------------------------------------------
     *
     *	Create OpenLayers 2 Map
     *
     * 	-----------------------------------------------------------------------
    */

    $('#createOLMapButton').click(function() {
        var divId = $('#mapContainer').val();
        $('#' + divId).removeClass('map-placeholder'); // remove DIV border
        var mapType = mapapi.constant.mapType.OPENLAYERS;
        mapapi.createMap(divId, mapType);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Create OpenLayers 3 Map
     *
     *  -----------------------------------------------------------------------
    */

    $('#createOL3MapButton').click(function() {
        var divId = $('#mapContainer').val();
        $('#' + divId).removeClass('map-placeholder'); // remove DIV border
        var mapType = mapapi.constant.mapType.OPENLAYERS3;
        mapapi.createMap(divId, mapType);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Create Leaflet Map
     *
     *  -----------------------------------------------------------------------
    */

    $('#createLMapButton').click(function() {
        var divId = $('#mapContainer').val();
        $('#' + divId).removeClass('map-placeholder'); // remove DIV border
        var mapType = mapapi.constant.mapType.LEAFLET;
        mapapi.createMap(divId, mapType);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Set Active Map
     *
     * 	-----------------------------------------------------------------------
    */

    $('#setActiveMapButton').click(function() {
        var divId = $('#mapContainer').val();
        mapapi.setActiveMap(divId);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Reset Map
     *
     * 	-----------------------------------------------------------------------
    */

    $('#resetMapButton').click(function() {
        var divId = $('#mapContainer').val();
        mapapi.resetMap(divId);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Destroy Map
     *
     * 	-----------------------------------------------------------------------
    */

    $('#destroyMapButton').click(function() {
        var divId = $('#mapContainer').val();
        $('#' + divId).addClass('map-placeholder'); // add DIV border
        mapapi.destroyMap(divId);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Resize Map
     *
     *  -----------------------------------------------------------------------
    */

    $('#resizeMapButton').click(function() {
        var divId = $('#mapContainer').val();
        mapapi.updateSize(divId);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Remove All Features
     *
     * 	-----------------------------------------------------------------------
    */

    $('#removeAllFeaturesButton').click(function() {
        mapapi.clearAllFeatures();
    });

    /*	-----------------------------------------------------------------------
     *
     *	Zoom In
     *
     * 	-----------------------------------------------------------------------
    */

    $('#zoomInButton').click(function() {
       mapapi.zoomIn();
    });

    /*	-----------------------------------------------------------------------
     *
     *	Zoom Out
     *
     * 	-----------------------------------------------------------------------
    */

    $('#zoomOutButton').click(function() {
       mapapi.zoomOut();
    });

    /*	-----------------------------------------------------------------------
     *
     *	Get Zoom
     *
     * 	-----------------------------------------------------------------------
    */

    $('#getZoomButton').click(function() {
        var zoomVal = mapapi.getZoom();
       $('#currentZoom').text(zoomVal);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Set Zoom
     *
     * 	-----------------------------------------------------------------------
    */

    $('#setZoomButton').click(function() {
        var zoomVal = parseFloat($('#zoomLevel').val(), 10);
        mapapi.setZoom(zoomVal);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Zoom to Full Extent
     *
     * 	-----------------------------------------------------------------------
    */

    $('#zoomToFullExtentButton').click(function() {
        mapapi.zoomToMaxExtent();
    });


    /*	-----------------------------------------------------------------------
     *
     *	Get Center
     *
     * 	-----------------------------------------------------------------------
    */

    $('#getCenterButton').click(function() {
        var theCenter = mapapi.getCenter();
        var lat = theCenter.getLatitude();
        var lng = theCenter.getLongitude();
        $('#currentLat').text(lat);
        $('#currentLong').text(lng);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Set Center
     *
     * 	-----------------------------------------------------------------------
    */

    $('#setCenterButton').click(function() {
        var lat = parseFloat($('#centerLat').val(), 10);
        var lng = parseFloat($('#centerLng').val(), 10);
        var center = mapapi.factory.coordinate(lat, lng);
        mapapi.setCenter(center);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Click Handler for 'Add Another' Button
     *
     *  -----------------------------------------------------------------------
    */
    $('#addAnotherButton').click(function() {
        var html = $('#latLngTemplate').html();
        $('#latLngWrapper').append(html);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Create Point
     *
     * 	-----------------------------------------------------------------------
    */

    $('#createPointButton').click(function() {
        var featureId = $('#featureId').val();
        var layerId = $('#theLayerId').val();
        var lat = parseFloat($('#pointLat').val(), 10);
        var lng = parseFloat($('#pointLng').val(), 10);
        var coordinate = mapapi.factory.coordinate(lat, lng);
        mapapi.addVectorLayer(layerId);
        mapapi.addPoint(featureId, layerId, coordinate);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Remove Point
     *
     * 	-----------------------------------------------------------------------
    */

    $('#removePointButton').click(function() {
        var featureId = $('#featureId').val();
        mapapi.removePoint(featureId);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Create Multipoint
     *
     * 	-----------------------------------------------------------------------
    */

    $('#createMultipointButton').click(function() {
        var featureId = $('#featureId').val();
        var layerId = $('#theLayerId').val();
        var coordinates = getCoordinates();
        mapapi.addVectorLayer(layerId);
        mapapi.addMultipoint(featureId, layerId, coordinates);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Remove Multipoint
     *
     * 	-----------------------------------------------------------------------
    */

    $('#removeMultipointButton').click(function() {
        var featureId = $('#featureId').val();
        mapapi.removeMultipoint(featureId);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Create Line
     *
     * 	-----------------------------------------------------------------------
    */

    $('#createLineButton').click(function() {
        var featureId = $('#featureId').val();
        var layerId = $('#theLayerId').val();
        var coordinates = getCoordinates();
        mapapi.addVectorLayer(layerId);
        mapapi.addLine(featureId, layerId, coordinates);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Remove Line
     *
     * 	-----------------------------------------------------------------------
    */

    $('#removeLineButton').click(function() {
        var featureId = $('#featureId').val();
        mapapi.removeLine(featureId);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Create Polygon
     *
     * 	-----------------------------------------------------------------------
    */

    $('#createPolygonButton').click(function() {
        var featureId = $('#featureId').val();
        var layerId = $('#theLayerId').val();
        var coordinates = getCoordinates();
        mapapi.addVectorLayer(layerId);
        mapapi.addPolygon(featureId, layerId, coordinates);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Remove Polygon
     *
     * 	-----------------------------------------------------------------------
    */

    $('#removePolygonButton').click(function() {
        var featureId = $('#featureId').val();
        mapapi.removePolygon(featureId);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Register Click Listener
     *
     * 	-----------------------------------------------------------------------
    */

    $('#registerClickListener').click(function() {
        var listenerId = $('#listenerId').val();
        var listener = new Function('eventData', $('#listener').val());
        mapapi.registerClickListener(listenerId, listener);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Unregister Click Listener
     *
     * 	-----------------------------------------------------------------------
    */

    $('#unregisterClickListener').click(function() {
        var listenerId = $('#listenerId').val();
        mapapi.unregisterClickListener(listenerId);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Register Hover Listener
     *
     *  -----------------------------------------------------------------------
    */

    $('#registerHoverListener').click(function() {
        var listenerId = $('#listenerId').val();
        var listener = new Function('eventData', $('#listener').val());
        mapapi.registerHoverListener(listenerId, listener);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Unregister Hover Listener
     *
     *  -----------------------------------------------------------------------
    */

    $('#unregisterHoverListener').click(function() {
        var listenerId = $('#listenerId').val();
        mapapi.unregisterHoverListener(listenerId);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Register Map Move Listener
     *
     *  -----------------------------------------------------------------------
    */

    $('#registerMapMoveListener').click(function() {
        var listenerId = $('#listenerId').val();
        var listener = new Function('eventData', $('#listener').val());
        mapapi.registerMapMoveListener(listenerId, listener);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Unregister Map Move Listener
     *
     *  -----------------------------------------------------------------------
    */

    $('#unregisterMapMoveListener').click(function() {
        var listenerId = $('#listenerId').val();
        mapapi.unregisterMapMoveListener(listenerId);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Register Zoom End Listener
     *
     *  -----------------------------------------------------------------------
    */

    $('#registerZoomEndListener').click(function() {
        var listenerId = $('#listenerId').val();
        var listener = new Function('eventData', $('#listener').val());
        mapapi.registerZoomEndListener(listenerId, listener);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Unregister Zoom End Listener
     *
     *  -----------------------------------------------------------------------
    */

    $('#unregisterZoomEndListener').click(function() {
        var listenerId = $('#listenerId').val();
        mapapi.unregisterZoomEndListener(listenerId);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Register Out Listener
     *
     *  -----------------------------------------------------------------------
    */

    $('#registerOutListener').click(function() {
        var listenerId = $('#listenerId').val();
        var listener = new Function('eventData', $('#listener').val());
        mapapi.registerOutListener(listenerId, listener);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Unregister Out Listener
     *
     *  -----------------------------------------------------------------------
    */

    $('#unregisterOutListener').click(function() {
        var listenerId = $('#listenerId').val();
        mapapi.unregisterOutListener(listenerId);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Add WMS Layer
     *
     * 	-----------------------------------------------------------------------
    */

    $('#addWmsLayer').click(function() {
        var layerId = $('#layerId').val();
        var layerUrl = $('#layerUrl').val();
        var layers = $('#layerNames').val().split(',');
        var wmsLayer = mapapi.factory.wmsLayer(layerId, layerUrl, layers);
        mapapi.addWmsLayer(wmsLayer);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Toggle Layer Visibility
     *
     * 	-----------------------------------------------------------------------
    */

    $('#toggleLayerVisibility').click(function() {
        var layerId = $('#layerId').val();
        mapapi.toggleLayer(layerId);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Remove Layer
     *
     * 	-----------------------------------------------------------------------
    */

    $('#removeLayer').click(function() {
        var layerId = $('#layerId').val();
        mapapi.removeLayer(layerId);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Get zOrder of Layer
     *
     * 	-----------------------------------------------------------------------
    */

    $('#getZorder').click(function() {
        var layerId = $('#layerId').val();
        var zOrder = mapapi.getLayerOrder(layerId);
        $('#currZorder').text(zOrder);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Set zOrder of Layer
     *
     * 	-----------------------------------------------------------------------
    */

    $('#setZorder').click(function() {
        var layerId = $('#layerId').val();
        var zOrder = parseInt($('#newZorder').val(), 10);
        mapapi.setLayerOrder(layerId, zOrder);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Set Base Layer
     *
     * 	-----------------------------------------------------------------------
    */

    $('#setBaseLayer').click(function() {
        var layerId = $('#layerId').val();
        mapapi.setBaseLayer(layerId);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Get Layer Opacity
     *
     * 	-----------------------------------------------------------------------
    */

    $('#getOpacity').click(function() {
        var layerId = $('#layerId').val();
        var opacity = mapapi.getLayerOpacity(layerId);
        $('#currOpacity').text(opacity);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Set Layer Opacity
     *
     * 	-----------------------------------------------------------------------
    */

    $('#setOpacity').click(function() {
        var layerId = $('#layerId').val();
        var opacity = parseFloat($('#newOpacity').val(), 10);
        mapapi.setLayerOpacity(layerId, opacity);
    });

    /*	-----------------------------------------------------------------------
     *
     *	Toggle UI Zoom Control
     *
     * 	-----------------------------------------------------------------------
    */

    $('#toggleZoomButton').click(function() {
        mapapi.toggleZoomControl();
    });

    /*	-----------------------------------------------------------------------
     *
     *	Toggle UI Scale Control
     *
     * 	-----------------------------------------------------------------------
    */

    $('#toggleScaleButton').click(function() {
        mapapi.toggleScaleControl();
    });

    /*	-----------------------------------------------------------------------
     *
     *	Toggle UI Coordinates Control
     *
     * 	-----------------------------------------------------------------------
    */

    $('#toggleCoordinatesButton').click(function() {
        mapapi.toggleCoordinatesControl();
    });

    /*	-----------------------------------------------------------------------
     *
     *	Toggle UI Graticule Control
     *
     * 	-----------------------------------------------------------------------
    */

    $('#toggleGraticuleButton').click(function() {
        mapapi.toggleGraticuleControl();
    });

    // ########################################################################

    /*  -----------------------------------------------------------------------
     *
     *  Add Example WMS Layer
     *
     *  -----------------------------------------------------------------------
    */

    $('#exampleWmsLayer').click(function() {
        // add a WMS layer over Denmark
        var layers = [];
        layers.push('dwd:BASISGRUNDKARTE');
        layers.push('dwd:BASISBUNDESLAENDER');
        var wmsLayer = mapapi.factory.wmsLayer('denmarkLayer', 'http://maps.dwd.de/geoserver/wms', layers);
        mapapi.addWmsLayer(wmsLayer);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Add Example WMTS Layer
     *
     *  -----------------------------------------------------------------------
    */

    $('#exampleWmtsLayer').click(function() {
        mapapi.zoomToMaxExtent();
        var layer = mapapi.factory.wmtsLayer('My WMTS Layer', 'http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_2000-2010_Population_Change/MapServer/WMTS/', 'Demographics_USA_2000-2010_Population_Change', 'default028mm', 'default');
        mapapi.addWmtsLayer(layer);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Add Example KML Layer
     *
     *  -----------------------------------------------------------------------
    */

    $('#londonKml').click(function() {
        var cntr = mapapi.factory.coordinate(51.5016636781603, -0.12578487396268453);
        mapapi.setCenter(cntr);
        mapapi.setZoom(14);
        mapapi.addKml(mapapi.factory.kmlLayer('londonKml', 'resources/mapperz-kml-example.kml'));
    });

    /*  -----------------------------------------------------------------------
     *
     *  Add Example GeoJSON Layer
     *
     *  -----------------------------------------------------------------------
    */

    $('#exampleGeoJson').click(function() {
        mapapi.addGeoJson(mapapi.factory.geoJsonLayer('myGeoJsonLayer', 'resources/exampleGeo.json'));
        var cntr = mapapi.factory.coordinate(43.94537239244285, 8.195800781250151);
        mapapi.setCenter(cntr);
        mapapi.setZoom(5);
    });


    /*  -----------------------------------------------------------------------
     *
     *  Add 25 Individual Points
     *
     *  -----------------------------------------------------------------------
    */

    $('#twentyFivePoints').click(function() {
        mapapi.addVectorLayer('twentyFivePointsLayer');
        // add 25 points
        for(var i = 0; i < 50; i += 10) {
            for(var j = 0; j < 50; j += 10) {
                var coord = mapapi.factory.coordinate(i, j);
                mapapi.addPoint('myPoint' + i + j, 'twentyFivePointsLayer', coord); // concat i, j to name for uniqueness
            }
        }
        // auto-zoom
        mapapi.zoomToData('twentyFivePointsLayer');
    });

    /*  -----------------------------------------------------------------------
     *
     *  Add Polygon + Line + Multipoint
     *
     *  -----------------------------------------------------------------------
    */

    $('#polygonLineMultiPoint').click(function() {
        mapapi.addVectorLayer('polygonLineMultiPointLayer');

        var coordinates = [];
        coordinates.push(mapapi.factory.coordinate(5, 5));
        coordinates.push(mapapi.factory.coordinate(5, 15));
        coordinates.push(mapapi.factory.coordinate(15, 5));
        mapapi.addMultipoint('myMultipoint', 'polygonLineMultiPointLayer', coordinates);

        var coordinates = [];
        coordinates.push(mapapi.factory.coordinate(35, 35));
        coordinates.push(mapapi.factory.coordinate(35, 25));
        coordinates.push(mapapi.factory.coordinate(25, 35));
        mapapi.addLine('myLine', 'polygonLineMultiPointLayer', coordinates);

        var coordinates = [];
        coordinates.push(mapapi.factory.coordinate(45, 45));
        coordinates.push(mapapi.factory.coordinate(45, 55));
        coordinates.push(mapapi.factory.coordinate(55, 45));
        mapapi.addPolygon('myPolygon', 'polygonLineMultiPointLayer', coordinates);

        mapapi.zoomToData('polygonLineMultiPointLayer');
    });

    /*  -----------------------------------------------------------------------
     *
     *  OpenLayers Map w/ArcGIS93Rest Base Layer
     *
     *  -----------------------------------------------------------------------
    */

    $('#olArcGIS93Rest').click(function() {
        // create map
        var callback = function() {
            // set center
            var coord = mapapi.factory.coordinate(34, -90);
            mapapi.setCenter(coord);
            // set zoom for optimal display
            mapapi.setZoom(4);
        };
        var baseLayer = mapapi.factory.arcGIS93RestLayer('http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/export');
        mapapi.createMap('map1', mapapi.constant.mapType.OPENLAYERS, callback, baseLayer);
    });

    /*  -----------------------------------------------------------------------
     *
     *  Leaflet Map w/ArcGIS93Rest Base Layer
     *
     *  -----------------------------------------------------------------------
    */

    $('#lArcGIS93Rest').click(function() {
        var callback; // omitted
        var baseLayer = mapapi.factory.arcGIS93RestLayer('http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/export');
        mapapi.createMap('map2', mapapi.constant.mapType.LEAFLET, callback, baseLayer);
    });

    /*  -----------------------------------------------------------------------
     *
     *  OpenLayers Map w/ArcGISCache Base Layer
     *
     *  -----------------------------------------------------------------------
    */

    $('#olArcGISCache').click(function() {
        var callback = function() {
            // set center
            var coord = mapapi.factory.coordinate(29, -22);
            mapapi.setCenter(coord);
            // set zoom for optimal display
            mapapi.setZoom(2);
        };
        var baseLayer = mapapi.factory.arcGISCacheLayer('http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer');
        mapapi.createMap('map1', mapapi.constant.mapType.OPENLAYERS, callback, baseLayer);
    });

    $('#addVectorLayer').click(function() {
        var layerId = $('#layerId').val();
        mapapi.addVectorLayer(layerId);
    });

});
