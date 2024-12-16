import { useState } from "react";
import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export function MapContainer() {
  const [viewport, setViewport] = useState({
    latitude: 35.6892,
    longitude: 51.389,
    zoom: 10,
  });

  const maptilerApiKey = "X9LDT0C0D641NEL5o6py";

  // GeoJSON data for the source
  const geoJsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-122.4194, 37.7749], // Coordinates of San Francisco
        },
        properties: {
          title: "Point of Interest",
        },
      },
    ],
  };

  if (!maptilerApiKey) {
    console.error(
      "Maptiler API key not found. Please set REACT_APP_MAPTILER_API_KEY in your .env file."
    );
    return <div>Maptiler API key is missing.</div>;
  }

  const mapStyleUrl = `https://api.maptiler.com/maps/hybrid/style.json?key=${maptilerApiKey}`;

  // Layer styling for the GeoJSON point
  const pointLayer = {
    id: "point-layer",
    type: "circle",
    source: "points",
    paint: {
      "circle-radius": 6,
      "circle-color": "#007cbf",
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
    },
  };

  return (
    <div className="h-screen w-screen">
      <Map
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle={mapStyleUrl}
        mapboxAccessToken={""} // Not needed for Maptiler
        attributionControl={true}
      >
        {/* Marker Example */}
        <Marker latitude={35.6892} longitude={51.389}>
          <div className="p-2 h-1 w-1 bg-red-500 text-white rounded-full">
            📍
          </div>
        </Marker>

        {/* Adding GeoJSON Source and Layer */}
        <Source id="points" type="geojson" data={geoJsonData}>
          <Layer {...pointLayer} />
        </Source>

        {/* Navigation Controls */}
        <NavigationControl position="top-right" />
      </Map>
    </div>
  );
}
