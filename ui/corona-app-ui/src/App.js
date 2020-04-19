import React from 'react';
import mapboxgl from 'mapbox-gl';
import { renderer } from './Renderer';

mapboxgl.accessToken = 'pk.eyJ1IjoibGdkZWxhY3J1eiIsImEiOiJjanVqMjR2c2UwNHhjNGRtaXdicnlwNnN1In0.wEDSlf607s7WuQ49-AZhBA';



function App() {

  const mapContainerRef = React.useRef();

  React.useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-119.4179, 36.7783],
      zoom: 4
    });


    fetch('http://localhost:3001')
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        const coors = [];
        Object.keys(json).forEach(state => {
          if (json[state].coors) {
            coors.push(
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [json[state].coors.longitude, json[state].coors.latitude]
                }
              }
            )
          }
        });

        const pulsingDot = renderer(map);


        map.on('load', function () {
          map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

          map.addSource('points', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': coors
            }
          });

          map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
              'icon-image': 'pulsing-dot'
            }
          });
        });
      })
      .catch(err => {
        console.log(err)
      })

  });


  return (
    <div className="App">
      <div ref={mapContainerRef} className="mapContainer" />
    </div>
  );
}

export default App;
