import React, { useState } from "react";
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
// import HeatmapLayer from "react-leaflet-heatmap-layer";
import { icon } from "leaflet";
// import HeatmapLayer from "react-leaflet-heatmap-layer";

const myLocationicon = icon({
  iconUrl: "man_pin.png", // Replace with the path to your custom icon image
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});
const heatmapData = [{ lat: 19.10746, lng: 72.8375, intensity: 100 }];

function LeafletMap({ lat, lng }) {
  const [coordinates, setCoordinates] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const addCoordinate = (lat, lng) => {
    setCoordinates([...coordinates, [lat, lng]]);
  };

  const handleFabClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

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
