import logo from "./logo.svg";
import "./App.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RegistrationPage from "./pages/register";
import Loginpage from "./pages/login";
import ResponsiveAppBar from "./components/appbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LeafletMap from "./components/LeafletMap";
import { useState,useEffect } from "react";
import { useTheme } from "@emotion/react";
// import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [locationFetched, setLocationFetched] = useState(false);

  useState(() => {
    // Use the Geolocation API to get current location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({
        lat: latitude,
        lng: longitude,
      });
      setLocationFetched(true);
    });
  }, []);
  
  
  return (
    <>
      <Router>
        <ResponsiveAppBar />

        <Routes>
          <Route exact path="/register" element={<RegistrationPage />}></Route>
          <Route exact path="/login" element={<Loginpage />}></Route>
          {locationFetched && (
          <Route exact path="/map" element={<LeafletMap lat={currentLocation.lat} lng={currentLocation.lng} />}></Route>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;

// <div className="App">
//   <Box sx={{ flexGrow: 1 }}>
//     <AppBar position="static">
//       <Toolbar>
//         <IconButton
//           size="large"
//           edge="start"
//           color="inherit"
//           aria-label="menu"
//           sx={{ mr: 2 }}
//         >
//           {/* <MenuIcon /> */}
//         </IconButton>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           Disaster
//         </Typography>
//         <Router>

//     <Routes>
//       <Route exact path="/Register" element={LoginPage}></Route>
//     </Routes>
// </Router>
//         <Button color="inherit">Login</Button>
//       </Toolbar>
//     </AppBar>
//   </Box>
// </div>
