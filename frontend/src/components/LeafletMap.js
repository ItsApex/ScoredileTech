import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Map } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "leaflet/dist/leaflet.css";
import axios from "axios";
// import HeatmapLayer from "react-leaflet-heatmap-layer";
import { icon } from "leaflet";
// import HeatmapLayer from "react-leaflet-heatmap-layer";

const myLocationicon = icon({
  iconUrl: "man_pin.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const disasterIcon = icon({
  iconUrl: "man_pin.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function LeafletMap({ lat, lng }) {
  const [coordinates, setCoordinates] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
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

  const handleFabClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

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

        {/* HeatmapLayer */}
        {/* <HeatmapLayer data={heatmapData} /> */}
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
      <Fab
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          backgroundColor: "#c9474d",
          "&:hover": {
            background: "#e8767c",
          },
        }}
        onClick={handleFabClick}
      >
        <AddIcon sx={{}} aria-label="add" />
      </Fab>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a dummy dialog box content.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default LeafletMap;
