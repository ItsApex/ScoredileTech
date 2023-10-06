import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { icon } from "leaflet";
import Sidebar from "../components/dialogue";
import { Button } from "@mui/material";

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

function LeafletMap({ lat, lng, dialogtxt }) {
  const mapRef = useRef(null); // Create a reference to the map instance
  const [coordinates, setCoordinates] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [clickedCoords, setClickedCoords] = useState([]);

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
      setTimeout(()=> {
        console.log("Map reference: ");
        if (mapRef.current) {
          console.log("Map reference: ", mapRef.current);
          // Add a click event listener to the map
          mapRef.current.on("click", handleMapClick);
        }
     }
     ,3);
  }, [lat, lng]);



  // Handle the map click event
  const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        console.log("Clicked coordinates: ", lat, lng);
  };

  return (
    <>
      <MapContainer
        ref={mapRef} // Set the reference to the map instance
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

      <Sidebar lat={lat} lng={lng} dialogtxt={dialogtxt} clikedloc={clickedCoords}/>
    </>
  );
}

export default LeafletMap;
