import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import DialogContentText from "@mui/material/DialogContentText";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DialogActions from "@mui/material/DialogActions";
function SideBar(props) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [imdNowcastAlerts, setImdNowcastAlerts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [formData, setFormData] = useState({
    latitude: props.lat,
    longitude: props.lng,
    alertName: '',
    alertDescription: '',
    alertSeverity: '',
  });
  const handleFabClick = () => {
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

  const theme = useTheme();
  return (
    <>
      <Paper
        elevation={6}
        sx={{
          position: "absolute",
          width: "20vw",
          borderRadius: "20px",
          height: "85vh",
          margin: "1vh  0 0 2vw",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Hey this is your sexy side bar</Typography>

        <Button>This is a button </Button>

        <Fab
          sx={{
            position: "absolute",
            bottom: "4%",
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
      </Paper>

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

export default SideBar;
