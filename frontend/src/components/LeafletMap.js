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
  iconUrl: 'alert_img.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

const thunderstormIcon = icon({
  iconUrl: 'thunderstorm_img.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

function LeafletMap({ lat, lng }) {
  const [coordinates, setCoordinates] = useState([lat, lng]);
  const [imdNowcastAlerts, setImdNowcastAlerts] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setCoordinates([lat, lng]);

    axios.get('https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails')
      .then((response) => {
        setAlerts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching alerts data:', error);
      });
    
      axios.get('https://sachet.ndma.gov.in/cap_public_website/FetchIMDNowcastAlerts')
      .then((response) => {
        setImdNowcastAlerts(response.data.nowcastDetails);
      })
      .catch((error) => {
        console.error('Error fetching IMD Nowcast alerts data:', error);
      });
  }, [lat, lng]);

  return (
    <MapContainer
      center={coordinates}
      zoom={14}
      style={{ height: '100vh', width: '100%' , position: 'absolute', top: '0', left: '0', zIndex: '-2' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates} icon={myLocationicon}>
        <Popup>Your Current Location</Popup>
      </Marker>

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
            <br />
            Alert Start: {alert.effective_start_time}
            <br />
            Alert End: {alert.effective_end_time}
          </Popup>
        </Marker>
      ))}

      {imdNowcastAlerts.map((alert, index) => (
        <Marker
          icon={thunderstormIcon}
          key={index}
          position={[alert.location.coordinates[1], alert.location.coordinates[0]]}
        >
          <Popup>
            <strong>IMD Nowcast Alert</strong>
            <br />
            Severity: {alert.severity}
            <br />
            Location: {alert.area_description}
            <br />
            Alert Start: {alert.effective_start_time}
            <br />
            Alert End: {alert.effective_end_time}
            <br />
            Event Category: {alert.event_category}
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
}

export default LeafletMap;
