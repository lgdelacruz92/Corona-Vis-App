import React from 'react';
import mapboxgl from 'mapbox-gl';

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
        const deaths = [];
        Object.keys(json).forEach(state => {
          if (json[state].coors) {
            deaths.push(
              {
                'type': 'Feature',
                'properties': {
                  'total_death': parseInt(json[state].total_death.replace(',', '')),
                  'total_cases': parseInt(json[state].total_cases.replace(',', ''))
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': [json[state].coors.longitude, json[state].coors.latitude]
                }
              }
            )
          }
        });



        map.on('load', function () {

          map.addSource('points', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': deaths
            }
          });



          map.addLayer({
            'id': 'cases',
            'type': 'circle',
            'source': 'points',
            'paint': {
              'circle-radius': [
                'interpolate', ['linear'], ['zoom'], 
                40, [ '/', ['get', 'total_cases'], 500],
                100, [ '/', ['get', 'total_cases'], 100]
              ],
              'circle-color': 'rgba(255, 255, 0, 0.5)'
            }
          });

          map.addLayer({
            'id': 'points',
            'type': 'circle',
            'source': 'points',
            'paint': {
              'circle-radius': [
                'interpolate', ['linear'], ['zoom'], 
                10, [ '/', ['get', 'total_death'], 150],
                100, [ '/', ['get', 'total_death'], 50]
              ],
              'circle-color': 'rgba(255, 0, 0, 0.4)'
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
