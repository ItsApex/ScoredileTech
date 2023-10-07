import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import { Avatar, Button, Card, CardContent, CardHeader } from "@mui/material";
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
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import DialogActions from "@mui/material/DialogActions";
import RouteSet from "./RouteSet";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

import { color } from "@mui/system";
import { grey } from "@mui/material/colors";
import CabinIcon from "@mui/icons-material/Cabin"; //state
import FireTruckIcon from "@mui/icons-material/FireTruck"; // firebrigade
import WomanIcon from "@mui/icons-material/Woman"; //girl help line
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"; //ambulance
import LocalPoliceIcon from "@mui/icons-material/LocalPolice"; //police
import FloodIcon from "@mui/icons-material/Flood"; //disaste

function SideBar(props) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [imdNowcastAlerts, setImdNowcastAlerts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [formData, setFormData] = useState({
    latitude: props.lat,
    longitude: props.lng,
    alertName: "",
    alertDescription: "",
    alertSeverity: "",
  });
  const handleFabClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const [locationData, setLocationData] = useState({
    location: "",
    temperature: "",
  });

  const avatars = [
    {
      icon: <FloodIcon />,
      color: "primary",
      tooltip: "Disaster management authority",
    },
    { icon: <LocalHospitalIcon />, color: "accent", tooltip: "Ambulence" },
    { icon: <FireTruckIcon />, color: "secondary", tooltip: "Fire Department" },
    { icon: <LocalPoliceIcon />, color: "accent", tooltip: "Police" },
    { icon: <CabinIcon />, color: "secondary", tooltip: "State Helpline" },
    { icon: <WomanIcon />, color: "primary", tooltip: "Women Helpline" },
    // Add more avatars as needed
  ];
  const blogPosts = [
    {
      heading: "Mumbai Rains: An Analysis of the 2023 Flooding",
      url: "https://www.livemint.com/news/india/mumbai-rains-will-heavy-rainfall-play-a-spoilsport-in-dahi-handi-2023-celebrations-imd-janmashtami-2023downpour-11694060962392.html",
    },
    {
      heading: "Climate Change and the Future of Mumbai",
      url: " https://www.business-standard.com/article/current-affairs/climate-change-2050-why-mumbai-may-get-that-sinking-feeling-122111300289_1.html",
    },
    {
      heading: "Mumbai's Coastal Communities at Risk from Sea-Level Rise",
      url: "https://allthingsmumbai.com/is-mumbai-at-risk-of-sea-level-rise/",
    },
    {
      heading: "Landslides in Mumbai: A Growing Threat",
      url: "https://www.internetgeography.net/topics/what-challenges-have-been-caused-by-urban-growth-in-mumbai/",
    },
    {
      heading:
        "India has faced natural disaster every day in the last nine months",
      url: "https://www.mid-day.com/mumbai/mumbai-news/article/prevention-symptoms-precautions-dos-and-donts-for-battling-heatwave-mumbai-imd-alert-india-23281783",
    },
    {
      heading: "Natural Disasters and Extension & Advisory Services (EAS)",
      url: "https://www.mid-day.com/mumbai/mumbai-news/article/prevention-symptoms-precautions-dos-and-donts-for-battling-heatwave-mumbai-imd-alert-india-23281783",
    },
    {
      heading: "Mumbai's Heat Waves: A Warning Sign of Things to Come",
      url: "https://www.mid-day.com/mumbai/mumbai-news/article/prevention-symptoms-precautions-dos-and-donts-for-battling-heatwave-mumbai-imd-alert-india-23281783",
    },
    // Add more blog posts as needed
  ];

  const handleSubmit = async () => {
    setDialogOpen(false);
    // const userId = localStorage.getItem("userId");
    const response = await axios.post(
      "http://localhost:3001/event/createDisaster",
      {
        latitude: formData.latitude,
        longitude: formData.longitude,
        alertName: formData.alertName,
        alertDescription: formData.alertDescription,
        alertSeverity: formData.alertSeverity,
      }
    );
  };

  useEffect(() => {
    // Fetch location and temperature data when latitude and longitude change
    async function fetchData() {
      try {
        const apiKey = "33945f9f3d8ff7414e18b0dacb516eb5";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=${apiKey}`
        );
        const data = response.data;

        // Extract the location name and temperature from the API response
        const locationName = data.name;
        const temperature = data.main.temp;

        setLocationData({
          location: locationName,
          temperature: temperature,
        });
      } catch (error) {
        console.error("Error fetching location and temperature data:", error);
      }
    }

    fetchData();
  }, [props.lat, props.lng]);

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
          backgroundColor: "rgba(6, 19, 33, 0.75)",
          display: "flex",
          flexDirection: "column",
          py: 4,
          px: 1,
          alignItems: "center",
          backdropFilter: "blur(5px)",
        }}
      >
        {props.dialogtxt === "H" ? (
          <>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: grey[400],
              }}
            >
              Location: Mumbai | Temperature: 29°C
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: grey[400],
              }}
            >
              Saturday, 7 October 2023
            </Typography>
            <Typography
              sx={{
                mt: 1.2,
                mb: 0.5,

                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Helplines
            </Typography>
            <Box
              sx={{
                width: "90%",
                display: "flex",
                flexWrap: "wrap", // Allow Avatars to wrap to the next row
                justifyContent: "space-evenly",
                marginBottom: "1rem",
              }}
            >
              {/* First row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  margin: "0.5rem",
                }}
              >
                {avatars.slice(0, 3).map((avatar, index) => (
                  <Tooltip title={avatar.tooltip} key={index}>
                    <Avatar sx={{ bgcolor: theme.palette[avatar.color][300] }}>
                      {avatar.icon}
                    </Avatar>
                  </Tooltip>
                ))}
              </div>

              {/* Second row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  margin: "0.5rem",
                }}
              >
                {avatars.slice(3, 6).map((avatar, index) => (
                  <Tooltip title={avatar.tooltip} key={index}>
                    <Avatar sx={{ bgcolor: theme.palette[avatar.color][400] }}>
                      {avatar.icon}
                    </Avatar>
                  </Tooltip>
                ))}
              </div>
            </Box>

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
              <ErrorOutline
                fontSize="large"
                sx={{
                  width: "5rem",
                }}
                aria-label="add"
              />
            </Fab>
          </>
        ) : props.dialogtxt === "R" ? (
          // Different content to show when dialogtxt is "R"
          <RouteSet
            lat={props.lat}
            lng={props.lng}
            clikedloc={props.clikedloc}
          />
        ) : null}

        <Box
          sx={{
            height: "45vh",
            width: "98%",
            marginTop: "1vh",
            // borderRadius: "20px",
            // border: "2px solid",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "4px",
              borderRadius: "20px",
            },
            "&::-webkit-scrollbar-track": {
              background: theme.palette.primary[800],
              borderRadius: "20px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: theme.palette.primary[400],
              borderRadius: "20px",
            },
          }}
        >
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              sx={{
                my: 0.8,
                height: "8vh",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                cursor: "pointer", // Add cursor pointer for clickability
              }}
            >
              <a
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* The target="_blank" and rel="noopener noreferrer" attributes open the link in a new tab */}
                <CardHeader
                  sx={{
                    px: 1.3,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: post.avatarColor,
                        backgroundColor: theme.palette.primary[600],
                      }}
                    >
                      {/* You can add initials or icons as needed */}
                      {post.heading.charAt(0)}
                    </Avatar>
                  }
                  title={
                    <Typography sx={{ fontSize: 10 }} component="div">
                      {post.heading}
                    </Typography>
                  }
                />
              </a>
            </Card>
          ))}
        </Box>
      </Paper>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            borderRadius: 20,
            backgroundColor: theme.palette.primary[800],
            boxShadow: "none",
          },
        }}
      >
        <DialogTitle>Report an Event</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            name="latitude"
            label="Latitude"
            fullWidth
            margin="dense"
            value={formData.latitude}
            onChange={handleFormChange}
          />
          <TextField
            disabled
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
          <TextField
            name="alertDescription"
            label="Alert Description"
            fullWidth
            margin="dense"
            value={formData.alertDescription}
            onChange={handleFormChange}
          />
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
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SideBar;

function AvatarList({ avatars }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "80%",
        mb: 1.2,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {avatars.map((avatar, index) => (
        <Tooltip title={avatar.tooltip} key={index}>
          <Avatar
            sx={{
              bgcolor: theme.palette[avatar.color][500],
              margin: 0.5,
              width: 54,
              height: 54,
            }}
          >
            {avatar.initials}
          </Avatar>
        </Tooltip>
      ))}
    </Box>
  );
}
