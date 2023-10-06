import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Map } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { icon } from 'leaflet';
import axios from 'axios';

const myLocationicon = icon({
  
  iconUrl: 'man_pin.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const disasterIcon = icon({
  iconUrl: 'man_pin.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

function LeafletMap({ lat, lng }) {
  const [coordinates, setCoordinates] = useState([lat, lng]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setCoordinates([lat, lng]);

    // Fetch alerts data using Axios
    axios.get('https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails')
      .then((response) => {
        setAlerts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching alerts data:', error);
      });
  }, [lat, lng]);

  return (
    <MapContainer
      center={coordinates}
      zoom={14}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates} icon={myLocationicon}>
        <Popup>Your Current Location</Popup>
      </Marker>

      {/* Display markers for alert locations */}
      {alerts.map((alert, index) => (
        <Marker
          icon={disasterIcon}
          key={index}
          position={[
            parseFloat(alert.centroid.split(',')[1]),
            parseFloat(alert.centroid.split(',')[0]),
          ]}
        >
          <Popup>
            <strong>{alert.disaster_type}</strong>
            <br />
            Severity: {alert.severity}
            <br />
            Location: {alert.area_description}
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
}

export default LeafletMap;