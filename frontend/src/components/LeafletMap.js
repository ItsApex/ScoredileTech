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
  const [coordinates, setCoordinates] = useState([lat, lng]);
  const [alerts, setAlerts] = useState([]);

  const [alldisasters,setDisasters] = useState([])
  const [clickedCoords, setClickedCoords] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    setCoordinates([lat, lng]);

    // Fetch alerts data using Axios
    axios
      .get("https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails")
      .then((response) => {
        setAlerts(response.data);
        console.log('alerts are',response.data)
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


     axios.get('http://localhost:3001/event/getalldisasters')
     .then((res)=>{
      console.log(res.data)
      setDisasters(res.data)
      // setAlerts((prevAlerts) => [...prevAlerts, ...res.dat]);
     })
  }, [lat, lng]);



  // Handle the map click event
  const handleMapClick = async (e) => {
        const { lat, lng } = e.latlng;
        console.log("Clicked coordinates: ", lat, lng);
        console.log("Original coordinates: ", coordinates[0], coordinates[1]);

        try {
          // Fetch the route using OpenRouteAPI
          const apiKey = '5b3ce3597851110001cf6248844ba845bb7648a3bda6b57313f08c0d';
          const startLat = coordinates[0];
          const startLng = coordinates[1];
          const endLat = lat;
          const endLng = lng;
      
          const encodedStartLat = encodeURIComponent(startLat);
          const encodedStartLng = encodeURIComponent(startLng);
          const encodedEndLat = encodeURIComponent(endLat);
          const encodedEndLng = encodeURIComponent(endLng);
          
          const url = `https://api.openroute.io/v2/directions/driving-car?api_key=${apiKey}&start=${encodedStartLng},${encodedStartLat}&end=${encodedEndLng},${encodedEndLat}`;
          console.log(url)
          const response = await axios.get(url);
          const routeData = response.data;
      
          // Extract the route coordinates from the response
          const routeCoords = routeData.features[0].geometry.coordinates;
          setRouteCoordinates(routeCoords);
        } catch (error) {
          console.error("Error fetching route:", error);
        }
        // try {
        //   // Fetch the route using OpenRouteAPI
        //   const apiKey = 'YOUR_OPENROUTE_API_KEY';
        //   const url = `https://api.openroute.io/v2/directions/driving-car?api_key=${apiKey}&start=${coordinates[1]},${coordinates[0]}&end=${lat},${lng}`;
        //   const response = await axios.get(url);
        //   const routeData = response.data;
    
        //   // Extract the route coordinates from the response
        //   const routeCoords = routeData.features[0].geometry.coordinates;
        //   setRouteCoordinates(routeCoords);
        // } catch (error) {
        //   console.error("Error fetching route:", error);
        // }
    
        // // Store the clicked coordinates
        // setClickedCoords([lat, lng]);
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

       

{/* {alldisasters
  .filter((alert) => typeof alert.latitude === 'number' && typeof alert.longitude === 'number')
  .map((alert, index) => (
    <Marker
      key={index}
      position={[alert.latitude, alert.longitude]}
    >
      <Popup>
        <strong>{alert.alertName}</strong>
        <br />
        Severity: {alert.alertSeverity}
        <br />
        Location: {alert.alertDescription}
      </Popup>
    </Marker>
  ))
} */}

      </MapContainer>

      <Sidebar lat={lat} lng={lng} dialogtxt={dialogtxt} clikedloc={clickedCoords}/>
    </>
  );
}

export default LeafletMap;
