/*
 Copyright (c) 2012, Bjorn Sandvik
 Categorical map plugin for Leaflet powered maps.
 https://github.com/turban/leaflet-plugins
*/
L.Categorical = L.GeoJSON.extend({

  options: {
    noDataColor: '#CCC',
    normalStyle: {
      weight: 0.5,
      opacity: 1,
      color: '#000',
      fillOpacity: 1      
    },
    highlightStyle: {
      weight: 2
    },
    legend: null
  },

  initialize: function (geojson, options) {
    options = L.Util.setOptions(this, options);
    options.style = options.style || L.Util.bind(this._getStyle, this);

    this._layers = {};

    // Add feature properties
    if (options.properties) {
      for (var i = 0; i < geojson.features.length; i++) {
        var feature = geojson.features[i];
        feature.properties = L.Util.extend(feature.properties || {}, options.properties[feature.id]); 
      }
    }

    // Translate table group into object for easy lookup
    var group = options.group;
    if (this._isArray(group)) {
      var items = {};
      for (var i = 0; i < group.length; i++) {
        var item = group[i];
        for (var y = 0; y < item.features.length; y++) {
          items[item.features[y]] = item;
        }
      }
      if (!options.legend && group.length > 1) {
        options.legend = group;
      }
      options.group = items;
    }

    this.on({
      mouseover: this._highlightFeature, 
      mouseout: this._resetHighlight
    });

    this.addData(geojson);
  },

  // Returns feature style
  _getStyle: function(feature) {
    var style = this.options.normalStyle;
    style.fillColor = this._getColor(feature);
    return style;
  },

  _getColor: function (feature) {
    var id = (this.options.id) ? feature.properties[this.options.id] : feature.id;
    if (this.options.group[id]) {
      return this.options.group[id].color;
    } else {
      return this.options.noDataColor;
    }
  },

  // mouseover handler
  _highlightFeature: function(e) {
    e.layer.setStyle(this.options.highlightStyle);
    if (!L.Browser.ie && !L.Browser.opera) {
      e.layer.bringToFront();
    }
  },

  // mouseout handler
  _resetHighlight: function(e) {
    this.resetStyle(e.layer);
  },

  _isArray: function(input){
    return typeof input == 'object' && input instanceof Array;
  }  

});

L.categorical = function (geojson, options) {
  return new L.Categorical (geojson, options);
};