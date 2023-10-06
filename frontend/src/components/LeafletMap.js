import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Map } from "react-leaflet";
// import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import RecordRTC from 'recordrtc';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { styled } from '@mui/material/styles';
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "leaflet/dist/leaflet.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { icon } from "leaflet";
import Sidebar from "../components/dialogue";
const myLocationicon = icon({
  iconUrl: "man_pin.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const disasterIcon = icon({
  iconUrl: "alert_img.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const thunderstormIcon = icon({
  iconUrl: "thunderstorm_img.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function LeafletMap({ lat, lng }) {
  const [coordinates, setCoordinates] = useState([]);
  const [imdNowcastAlerts, setImdNowcastAlerts] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setCoordinates([lat, lng]);

    // Fetch alerts data using Axios
    axios
      .get("https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails")
      .then((response) => {
        setAlerts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching alerts data:", error);
      });
  }, [lat, lng]);

  useEffect(() => {
    setCoordinates([lat, lng]);

    axios
      .get("https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails")
      .then((response) => {
        setAlerts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching alerts data:", error);
      });

    axios
      .get(
        "https://sachet.ndma.gov.in/cap_public_website/FetchIMDNowcastAlerts"
      )
      .then((response) => {
        setImdNowcastAlerts(response.data.nowcastDetails);
      })
      .catch((error) => {
        console.error("Error fetching IMD Nowcast alerts data:", error);
      });

    axios
      .get(
        "https://sachet.ndma.gov.in/cap_public_website/FetchIMDNowcastAlerts"
      )
      .then((response) => {
        setImdNowcastAlerts(response.data.nowcastDetails);
      })
      .catch((error) => {
        console.error("Error fetching IMD Nowcast alerts data:", error);
      });
  }, [lat, lng]);

  return (
    <>
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

        {/* Display markers for alert locations */}
        {alerts.map((alert, index) => (
          <Marker
            icon={disasterIcon}
            key={index}
            position={[
              parseFloat(alert.centroid.split(",")[1]),
              parseFloat(alert.centroid.split(",")[0]),
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
      
      <Sidebar lat={lat} lng={lng}/>
    </>
  );
}

export default LeafletMap;
