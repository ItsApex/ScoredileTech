import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Map } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import HeatmapLayer from "react-leaflet-heatmap-layer";
import { icon } from "leaflet";

const myLocationicon = icon({
  iconUrl: "man_pin.png", // Replace with the path to your custom icon image
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

function LeafletMap({ lat, lng }) {
  const [coordinates, setCoordinates] = useState([]);

  const addCoordinate = (lat, lng) => {
    setCoordinates([...coordinates, [lat, lng]]);
  };

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{
        height: "100vh",
        width: "100%",
        position: "absolute",
        top: 0,
        zIndex: -5,
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]} icon={myLocationicon}>
        <Popup>Your Current Location</Popup>
      </Marker>

      {/* HeatmapLayer */}
      {/* <HeatmapLayer
        points={coordinates}
        blur={20}
        radius={20}
        max={1.0}
        gradient={{
          0.1: "blue",
          0.5: "lime",
          0.8: "red",
        }}
      /> */}
    </MapContainer>
  );
}

export default LeafletMap;
