import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibGdkZWxhY3J1eiIsImEiOiJjanVqMjR2c2UwNHhjNGRtaXdicnlwNnN1In0.wEDSlf607s7WuQ49-AZhBA';

function App() {

  const mapContainerRef = React.useRef();

  React.useEffect(() => {
    new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-119.4179, 36.7783],
      zoom: 4
    });
  })
  return (
    <div className="App">
      <div ref={mapContainerRef} className="mapContainer"/>
    </div>
  );
}

export default App;
