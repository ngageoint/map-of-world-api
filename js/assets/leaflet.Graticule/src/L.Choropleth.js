/*
 Copyright (c) 2012, Bjorn Sandvik
 Choropleth plugin for Leaflet powered maps.
 https://github.com/turban/leaflet-plugins
*/
L.Choropleth = L.GeoJSON.extend({

  // Default options
  options: {
    name: undefined, 
    key: 'value',
    values: null,
    numDecimals: 0,
    classification: 'equal',
    numClasses: 5,
    classBreaks: null,
    noDataValue: undefined,
    noDataColor: '#CCC',
    noDataLabel: 'No data', 
    unit: null,   
    normalStyle: {
      weight: 0.5,
      opacity: 1,
      color: '#000',
      fillOpacity: 1      
    },
    highlightStyle: {
      weight: 2
    },
    featureLabel: function(feature) {
      var value = feature.properties[this.key];
      if (value === this.noDataValue) {
        value = this.noDataLabel;  
      }
      return '<strong>' + feature.properties.name + '</strong><br/>' + ((this.unit) ? this.unit + ': ' : '') + value;
    }
  },

  initialize: function (geojson, options) {
    options = L.Util.setOptions(this, options);
    options.style = options.style || L.Util.bind(this._getStyle, this);

    if (options.properties) {
      this._addProperties(geojson.features, options.properties);
    }

    options.values = (options.data) ? this._addData(geojson, options.data) : this._getValues(geojson.features);
    options.classBreaks = options.classBreaks || this['_' + options.classification](options);

    if (!this._isArray(options.colors)) {
      options.colors = options.colors[options.numClasses];
    }

    if (options.reverseColors) {
      options.colors.reverse()
    }

    this._createLegend(options.classBreaks, options.colors);

    this._layers = {};

    this.on({
      mouseover: this._highlightFeature, 
      mouseout: this._resetHighlight
    });

    this.addData(geojson);
  },

  changeValues: function (key) {

    console.log(changeValues, key, this);

  },

  _createLegend: function (breaks, colors) {
    var legend = [];
    for (var i = 0; i < breaks.length - 1; i++) {
      legend.push({
        name: breaks[i] + ' &ndash; ' + breaks[i + 1],
        color: colors[i]
      })
    }
    this.options.legend = legend;
  },

  _addProperties: function (features, properties) {
    for (var i = 0; i < features.length; i++) {
      var feature = features[i];
      if (feature.id && properties[feature.id]) {
        feature.properties = L.Util.extend( properties[feature.id], feature.properties );
      }
    }
  },

  _addData: function (geojson, data) {
    var values = [], options = this.options;

    for (var i = 0; i < geojson.features.length; i++) {
      var feature = geojson.features[i],
          id = (options.id) ? feature.properties[options.id] : feature.id,
          value = data[id];

      if (typeof value === 'object') {
        feature.properties = value;
      } 
      else if (typeof value !== 'undefined') {
        feature.properties = feature.properties || {};
        feature.properties.value = value;
        values.push(value);  
      } else {
        feature.properties.value = null;
      }
    }

    // Return sorted array
    return values.sort(function(a, b){ return a-b });
  },

  // Extract values form features
  _getValues: function (features) {
    var values = [], options = this.options;
    for (var i = 0; i < features.length; i++) {
      var feature = features[i];
      if (feature.properties) {
        var value = features[i].properties[options.key];
        if (value !== options.noDataValue) {
          values.push(value);  
        }
      }
    }

    // Return sorted array
    return values.sort(function(a, b){ return a-b });
  },

  // Returns the class index where a value belongs.
  _getClass: function (value) {
    var classBreaks = this.options.classBreaks;
    for (i = 0; i < classBreaks.length - 1; i++) {
      if (value >= classBreaks[i] && value < classBreaks[i + 1]) {
        return i;
      } else if (value == classBreaks[i + 1]){ // Exception for highest value
        return i;          
      }
    };
  },  

  // Calculate class breaks - equal intervals
  _equal: function (options) {
    var values = options.values;
    var numClasses = options.numClasses;    

    var breaks = [], 
        minValue = values[0], 
        maxValue = values[values.length-1],
        interval = (maxValue - minValue) / numClasses;

    for (var i = 0; i < numClasses; i++) {
      breaks.push( parseFloat((minValue + (interval * i)).toFixed(options.numDecimals)) );
    };  
    
    breaks.push( maxValue ); // Last class break = biggest value
    return breaks;
  },

  // Calculate class breaks - quantiles
  _quantiles: function (options) {
    var values = options.values;
    var numClasses = options.numClasses;

    var breaks = [],
        classNumber = values.length / numClasses; // Number in each class
    
    for (i = 0; i < numClasses; i++) {
      breaks.push( values[parseInt(classNumber * i)] );
    };
        
    breaks.push( values[values.length - 1] );  // Last class break = biggest value
    return breaks;
  },

  // Returns feature style
  _getStyle: function(feature) {
    var options = this.options,
        value = (feature.properties) ? feature.properties[options.key] : options.noDataValue,
        color = options.colors[this._getClass(value)],
        style = options.normalStyle;

    style.fillColor = color || options.noDataColor;
    return style;
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

L.choropleth = function (geojson, options) {
  return new L.Choropleth(geojson, options);
};