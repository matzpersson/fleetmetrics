import React from 'react';
import { connect } from "react-redux";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import {defaults as defaultControls} from 'ol/control';
import MousePosition from 'ol/control/MousePosition';
import {createStringXY, format} from 'ol/coordinate';
import XYZ from 'ol/source/XYZ';
import {fromLonLat, transform} from 'ol/proj.js';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import WKT from 'ol/format/WKT';
import Point from 'ol/geom/Point';
import {Vector as VectorSource, Cluster} from 'ol/source';
import {Vector as VectorLayer, Heatmap} from 'ol/layer';
import SlidingPanel from 'react-sliding-side-panel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import assetIcon from '../../images/asset.png';

import {
  Icon,
  Style,
  Fill,
  Stroke,
  Circle as CircleStyle,
  Text }
from 'ol/style';

// var mousePositionControl = new MousePosition({
//   coordinateFormat: createStringXY(4),
//   projection: 'EPSG:4326',
//   // comment the following two lines to have the mouse position
//   // be placed within the map.
//   className: 'custom-mouse-position',
//   target: document.getElementById('mouse-position'),
//   undefinedHTML: '&nbsp;'
// });

class FleetMap extends React.Component {
  constructor() {
    super();

    this.state = {
      currentPosition: {
        lat: 0,
        lng: 0
      },
      lastClick: '0,0',
      iconFeature: {},
      assetLayer: null,
      map:{},
      sidePanelOpen:false
    }

    this.toggleSidePanel = this.toggleSidePanel.bind(this);
  }

 componentDidMount() {
    this.renderMap(); 
  }

  toggleSidePanel() {
    this.setState({sidePanelOpen: !this.state.sidePanelOpen})
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  createLayer() {
    var vectorSource = new VectorSource({
      features: []
    });
    var vectorLayer = new VectorLayer({
      source: vectorSource
    });
    return vectorLayer;
  }

  renderSensor() {
    let {
      sensorLayer,
      map
    } = this.state;

    let source = sensorLayer.getSource();
    let features = source.getFeatures();
    var coord = fromLonLat([153.4458, -27.3]);
  
    const sensorFeature = new Feature({
      geometry: new Point(coord),
      name: 'bla',
    });

    var iconStyle = new Style({
      image: new CircleStyle({
        radius: 10,
        fill: new Fill({color: 'red'}),
        opacity: 0.5,
        stroke: new Stroke({
          color: 'gray', width: 1
        })
      })
    });

    sensorFeature.setStyle(iconStyle);

    features.push(sensorFeature);
    this.state.sensorLayer.setSource(
      new VectorSource({
        features: features
      })
    );

  }

  renderTrail(metric, assetFeature) {
    let trailFeature = new Feature({
      geometry: new Point(fromLonLat([ parseFloat(metric.data.lon), parseFloat(metric.data.lat)] )),
      name: metric.topic
    });

    var iconStyle = new Style({
      image: new CircleStyle({
        radius: 2,
        fill: new Fill({color: assetFeature.get('trailColour')}),
        opacity: 0.5,
        stroke: new Stroke({
          color: 'gray', width: 1
        })
      })
    });

    trailFeature.setStyle(iconStyle);
    return trailFeature;
  }

  toRadians(degrees) {
    return degrees * Math.PI / 180;
  };

  // Converts from radians to degrees.
  toDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  bearing(startLat, startLng, destLat, destLng){
    startLat = this.toRadians(startLat);
    startLng = this.toRadians(startLng);
    destLat = this.toRadians(destLat);
    destLng = this.toRadians(destLng);

    var y = Math.sin(destLng - startLng) * Math.cos(destLat);
    var x = Math.cos(startLat) * Math.sin(destLat) -

    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    var brng = Math.atan2(y, x);
    return brng;
  }

  renderAssetMovement() {
    const {
      metric
    } = this.props.metrics;

    let {
      currentPosition,
      assetLayer
    } = this.state;

    if (metric && metric.data.lat && metric.data.lon) {
      let source = assetLayer.getSource();
      let features = source.getFeatures();

      var assetFeature = source.getFeatureById(metric.topic);
      if (assetFeature) {
        assetFeature.set('lastCoord', assetFeature.getGeometry().getCoordinates());
        assetFeature.getGeometry().setCoordinates(fromLonLat([ parseFloat(metric.data.lon), parseFloat(metric.data.lat)] ));
      } else {
        assetFeature = new Feature({
          geometry: new Point(fromLonLat([ parseFloat(metric.data.lon), parseFloat(metric.data.lat)] )),
          name: metric.topic,
        });
        assetFeature.setId(metric.topic);
        assetFeature.set('trailColour', this.getRandomColor());
        assetFeature.set('trailPoints', []);
        assetFeature.set('lastCoord', {lat:0, lng:0});
      }

      let trailPoints = assetFeature.get('trailPoints');
      trailPoints.push(fromLonLat([ parseFloat(metric.data.lon), parseFloat(metric.data.lat)] ))

      const coordNow = transform(assetFeature.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');
      const coordPrev = transform(assetFeature.get('lastCoord'), 'EPSG:3857', 'EPSG:4326');
      const radians = this.bearing(coordPrev[1], coordPrev[0], coordNow[1], coordNow[0]);
      const operationsType = metric.sentenceModel;
      const operationsColour = 'black';

      if (radians !== 0) {
        var imageStyle = new Style({
          image: new Icon({
            anchor: [0.5, 15],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: assetIcon,
            rotation: radians
          }),
          text: new Text({
            font: '12px Arial',
            fill: new Fill({ color: operationsColour }),
            stroke: new Stroke({
              color: '#fff', 
              width: 1
            }),
            text: `${metric.topic}\n${operationsType}\n${metric.sentenceType}\n${metric.recorded}ft`,
            fontWeight: "bold",
            offsetX: 25,
            offsetY: -15,
            // outline: '#fff',
            // outlineWidth: 5,
            placement: 'wrap',
            textAlign: 'left'
          })
        });
        
        assetFeature.setStyle(imageStyle);
      }

      let trailFeature = this.renderTrail(metric, assetFeature)

      features.push(trailFeature);
      features.push(assetFeature);
      this.state.assetLayer.setSource(
        new VectorSource({
          features: features
        })
      );

      if (currentPosition.lat !== metric.data.lat && currentPosition.lng !== metric.data.lon) {
        currentPosition.lat = metric.data.lat;
        currentPosition.lng = metric.data.lon;
        this.setState({
          assetLayer,
          currentPosition
        });

      }
    }
  }

  renderMap() {
    var coord = fromLonLat([146.2, -16.45]);
    var sensorLayer = this.createLayer();
    var assetLayer = this.createLayer();

    var mp = new MousePosition({
      displayProjection : "EPSG:4326",
      // coordinateFormat: createStringXY(4),
      coordinateFormat: function(coordinate) {
        return format(coordinate, 'Mouse: {y}, {x}', 4);
      },
      projection: 'EPSG:4326',
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position')
    });

    var map = new Map({
      target: this.refs.mapContainer,
      // target: 'mapContainer',
      layers: [
        new TileLayer({
          source: new XYZ({
             url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          })
        }),
        new TileLayer({
          source: new XYZ({
             url: 'http://t1.openseamap.org/seamark/{z}/{x}/{y}.png',
          })
        }),
        sensorLayer,
        assetLayer
      ],
      controls: [],
      view: new View({
        // center: [-244780.24508882355, 5986452.183179816],
        center: coord,
        zoom: 9
      })
    });

    map.addControl(mp);
    map.on('click', this.handleMapClick.bind(this));

    this.setState({ 
      map,
      sensorLayer,
      assetLayer,
    });

  }

  handleMapClick(event) {
    // convert coordinate to EPSG-4326
    const lastClickCoords = transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
    this.setState({'lastClick': `${lastClickCoords[1].toFixed(4)}, ${lastClickCoords[0].toFixed(4)}`})
    // this.renderSensor()
  }

  render() {
    const {
      lastClick
    } = this.state;

    this.renderAssetMovement();

    return (
      <div className="p-0 m-0 h-100 d-flex flex-column">
        <div className="p-0 m-0 flex-grow-1" ref="mapContainer" id="mapContainer"></div>
        <div className="p-2 bg-primary text-light d-flex justify-content-between" style={{fontSize: 14}}>
          <div id="mouse-position"></div>

          <div className="d-flex">
            <FontAwesomeIcon icon={['fal', 'cube']} className={'text-white mr-3'} title="Asset configuration"/>
            <FontAwesomeIcon icon={['fal', 'stream']} className={'text-white mr-3'} title="Sentence stream"/>
            <FontAwesomeIcon icon={['fal', 'cog']} className={'text-white mr-3'} title="Settings" onClick={this.toggleSidePanel} />
            <div>Click Lat/Lng: <span className="text-warning">{lastClick}</span></div>
          </div>
          
        </div>
        <SlidingPanel
          type={'right'}
          isOpen={this.state.sidePanelOpen}
          size={15}
        >
          <div className="listview w-100">
            <div>My Panel Content</div>
            <button onClick={this.toggleSidePanel}>close</button>
          </div>
        </SlidingPanel>
      </div>
    );
  }
};

const mapStoreToProps = (store) => {
  return {
    metrics: store.metrics
  }
}

export default connect(mapStoreToProps)(FleetMap);
