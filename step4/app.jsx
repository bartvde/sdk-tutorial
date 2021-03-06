import React from 'react';
import ReactDOM from 'react-dom';
import ol from 'openlayers';
import {addLocaleData, IntlProvider} from 'react-intl';
import App from './node_modules/boundless-sdk/js/components/app.js';
import LayerList from './node_modules/boundless-sdk/js/components/LayerList.jsx';
import FeatureTable from './node_modules/boundless-sdk/js/components/FeatureTable.jsx';
import AddLayer from './node_modules/boundless-sdk/js/components/AddLayer.jsx';
import enLocaleData from './node_modules/react-intl/dist/locale-data/en.js';
import enMessages from './node_modules/boundless-sdk/locale/en.js';

addLocaleData(
  enLocaleData
);

var map = window.map = new ol.Map({
  layers: [
    new ol.layer.Group({
      type: 'base-group',
      title: 'Base maps',
      layers: [
        new ol.layer.Tile({
          type: 'base',
          title: 'Streets',
          source: new ol.source.MapQuest({layer: 'osm'})
        }),
        new ol.layer.Tile({
          type: 'base',
          visible: false,
          title: 'Aerial',
          source: new ol.source.MapQuest({layer: 'sat'})
        })
      ]
    }),
    new ol.layer.Vector({
      id: 'states',
      title: 'USA States',
      source: new ol.source.Vector({
        url: 'ne_110m_admin_1_states_provinces_shp_scale_rank.geojson',
        format: new ol.format.GeoJSON()
      })
    })
  ],
  view: new ol.View({
    center: [-10605790.55, 4363637.07],
    zoom: 4
  })
});

class MyApp extends App {
  render() {
    return (
      <article>
        <nav role='navigation'>
          <div className='toolbar'>
            <ul><AddLayer map={map} /></ul>
          </div>
        </nav>
        <div id='content'>
          <div ref='map' id='map'></div>
          <div><LayerList map={map} /></div>
          <div id='table'><FeatureTable resizeTo='table' map={map} layer={map.getLayers().item(1)} /></div>
        </div>
      </article>
    );
  }
}

ReactDOM.render(<IntlProvider locale='en' messages={enMessages}><MyApp map={map} /></IntlProvider>, document.getElementById('main'));
