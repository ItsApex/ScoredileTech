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

const myLocationicon = icon({
  iconUrl: "man_pin.png",
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
});

function LeafletMap({ lat, lng }) {
  const [coordinates, setCoordinates] = useState([]);
  const [imdNowcastAlerts, setImdNowcastAlerts] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const imageInputRef = useRef(null);
  const [alerts, setAlerts] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    latitude: lat,
    longitude: lng,
    alertName: '',
    alertDescription: '',
    alertSeverity: '',
  });

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

  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const recorder = RecordRTC(stream, {
            type: 'video',
          });
  
          recorder.startRecording();
          setIsRecording(true);
  
          recorder.ondataavailable = (event) => {
            if (event.data) {
              const blob = event.data;
              // Handle the recorded video blob as needed (e.g., upload it)
              // For now, you can display a video preview
              const videoPreview = document.getElementById('video-preview');
              videoPreview.src = URL.createObjectURL(blob);
            }
          };
  
          recorder.onstop = () => {
            setIsRecording(false);
            stream.getTracks().forEach((track) => track.stop());
          };
  
          // Stop recording after a set duration (e.g., 10 seconds)
          setTimeout(() => {
            recorder.stopRecording(() => {
              // Access the recorded blob here
              const blob = recorder.getBlob();
              // Handle the recorded video blob as needed (e.g., upload it)
              // For now, you can display a video preview
              const videoPreview = document.getElementById('video-preview');
              videoPreview.src = URL.createObjectURL(blob);
            });
          }, 10000); // Stop recording after 10 seconds
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    } else {
      // Stop recording
      // Recording will also stop automatically after a set duration
      setIsRecording(false);
    }
  };

  const handleFabClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

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
    
      axios.get('https://sachet.ndma.gov.in/cap_public_website/FetchIMDNowcastAlerts')
      .then((response) => {
        setImdNowcastAlerts(response.data.nowcastDetails);
      })
      .catch((error) => {
        console.error('Error fetching IMD Nowcast alerts data:', error);
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
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <TextField
            name="latitude"
            label="Latitude"
            fullWidth
            margin="dense"
            value={formData.latitude}
            onChange={handleFormChange}
          />
          <TextField
            name="longitude"
            label="Longitude"
            fullWidth
            margin="dense"
            value={formData.longitude}
            onChange={handleFormChange}
          />
          <TextField
            name="alertName"
            label="Alert Name"
            fullWidth
            margin="dense"
            value={formData.alertName}
            onChange={handleFormChange}
          />
          {/* The Image upload */}
          {/* <video id="video-preview" autoPlay muted style={{ width: '100%', maxHeight: '300px' }} />
          <Button
            variant="contained"
            size="large"
            onClick={toggleRecording}
            disabled={isRecording}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>

          {/* Display a preview of the selected image */}
          {/* {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Event"
              style={{ maxWidth: '100%', marginTop: '20px' }}
            />
          )}  */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Alert Severity</InputLabel>
            <Select
              name="alertSeverity"
              value={formData.alertSeverity}
              onChange={handleFormChange}
            >
              <MenuItem value="Green alert">Green alert</MenuItem>
              <MenuItem value="Orange alert">Orange alert</MenuItem>
              <MenuItem value="Red alert">Red alert</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
</>
  );
}

export default LeafletMap;
