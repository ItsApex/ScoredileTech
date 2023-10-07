import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { icon } from "leaflet";
import Sidebar from "../components/dialogue";
import { Button } from "@mui/material";
import { buffer, featureCollection, point } from "@turf/turf";
import { Box } from "@mui/system";

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

const rainIcon = icon({
  iconUrl: "thunderstorm_img.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const tempPloyline = [
  [72.816449, 19.205002],
  [72.816789, 19.204936],
  [72.817027, 19.205185],
];

const filledYellowOptions = { color: 'yellow', fillColor: 'yellow' };
const filledRedOptions = { color: 'red', fillColor: 'red' };
const filledGreenOptions = { color: 'green', fillColor: 'green' };
const filledOrangeOptions = { color: 'orange', fillColor: 'orange' };

const getColorOptions = (severity) => {
  switch (severity) {
    case 'Red alert':
      return filledRedOptions;
    case 'Orange alert':
      return filledOrangeOptions;
    case 'Yellow alert':
      return filledYellowOptions;
    default:
      return filledOrangeOptions;
  }
};

const fillBlueOptions = { fillColor: "blue" };
const center = [72.816449, 19.205002];

function LeafletMap({ lat, lng, dialogtxt }) {
  const mapRef = useRef(null); // Create a reference to the map instance
  const [coordinates, setCoordinates] = useState([lat, lng]);
  const [alerts, setAlerts] = useState([]);
  const [imdNowcastAlerts, setImdNowcastAlerts] = useState([]);
  const [alldisasters, setDisasters] = useState([]);
  const [clickedCoords, setClickedCoords] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeFetched, setRouteFetched] = useState(false);
  const [avoidPolygons, setAvoidPolygons] = useState([]);

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
    setTimeout(() => {
      console.log("Map reference: ");
      if (mapRef.current) {
        console.log("Map reference: ", mapRef.current);
        // Add a click event listener to the map
        mapRef.current.on("click", handleMapClick);
      }
    }, 3);

    axios
      .get(
        "https://sachet.ndma.gov.in/cap_public_website/FetchIMDNowcastAlerts"
      )
      .then((response) => {
        setImdNowcastAlerts(response.data.nowcastDetails);
        console.log("imd nowcast alerts are", response.data.nowcastDetails);
      });

    axios.get("http://localhost:3001/event/getalldisasters").then((res) => {
      console.log(res.data);
      setDisasters(res.data);

      const bufferedPolygons = res.data.map((disaster) => {
        const radiusInMeters = 200; // Adjust the radius as needed
        const circleCenter = point([
          parseFloat(disaster.longitude),
          parseFloat(disaster.latitude),
        ]);
        const bufferedPolygon = buffer(circleCenter, radiusInMeters, {
          units: "meters",
        });
        return bufferedPolygon.geometry.coordinates[0].map((coord) => [
          coord[1],
          coord[0],
        ]);
      });
      console.log("bufferedd polygons are", bufferedPolygons);
      setAvoidPolygons(bufferedPolygons);
      // setAlerts((prevAlerts) => [...prevAlerts, ...res.dat]);
    });
  }, [lat, lng]);

  // Handle the map click event
  const handleMapClick = async (e) => {
    if (dialogtxt === "R") {
      const { lat, lng } = e.latlng;
      console.log("Clicked coordinates: ", lat, lng);
      console.log("Original coordinates: ", coordinates[0], coordinates[1]);

      try {
        const apiKey =
          "5b3ce3597851110001cf6248844ba845bb7648a3bda6b57313f08c0d";
        // const apiKey = '123'
        const startLat = coordinates[0];
        const startLng = coordinates[1];
        const endLat = lat;
        const endLng = lng;

        const encodedStartLat = encodeURIComponent(startLat);
        const encodedStartLng = encodeURIComponent(startLng);
        const encodedEndLat = encodeURIComponent(endLat);
        const encodedEndLng = encodeURIComponent(endLng);

        const avoidPolygonsParam = `&avoid_polygons=${JSON.stringify(
          avoidPolygons
        )}`;
        let url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${encodedStartLng},${encodedStartLat}&end=${encodedEndLng},${encodedEndLat}${avoidPolygonsParam}`;

        console.log(url);
        const response = await axios.get(url);
        const routeData = response.data;

        const routeCoords = routeData.features[0].geometry.coordinates;
        const swappedRouteCoords = routeCoords.map((coord) => [
          coord[1],
          coord[0],
        ]);
        setRouteCoordinates(swappedRouteCoords);
        setRouteFetched(true);
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    }
  };

  return (
    <>
      <MapContainer
        ref={mapRef}
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
        {/* <Circle center={center} pathOptions={fillBlueOptions} radius={200} /> */}
        <Marker position={[lat, lng]} icon={myLocationicon}>
          <Popup>Your Current Location</Popup>
        </Marker>

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

        {alldisasters.map((disaster, index) => (
          <>
            <Circle
              center={[
                parseFloat(disaster.latitude),
                parseFloat(disaster.longitude),
              ]}
              // pathOptions={fillBlueOptions}
              pathOptions={getColorOptions(disaster.alertSeverity)}
              radius={1000}
            >
              <Popup>
                <strong>{disaster.alertName}</strong>
                <br />
                Severity: {disaster.alertSeverity}
                <br />
                Location: {disaster.alertDescription}
              </Popup>
            </Circle>
          </>
        ))}

        {imdNowcastAlerts.map((alert, index) => (
          <Marker
            icon={rainIcon}
            key={index}
            position={[
              parseFloat(alert.location.coordinates[1]),
              parseFloat(alert.location.coordinates[0]),
            ]}
          >
            <Popup>
              <strong>{alert.events}</strong>
              <br />
              Severity: {alert.severity}
              <br />
              Location: {alert.area_description}
              <br />
              Start Time: {alert.effective_start_time}
            </Popup>
          </Marker>
        ))}

        {routeFetched && (
          <Polyline positions={routeCoordinates} color="purple" weight={5} />
        )}
      </MapContainer>

      <Sidebar
        lat={lat}
        lng={lng}
        dialogtxt={dialogtxt}
        clikedloc={clickedCoords}
      />
    </>
  );
}

export default LeafletMap;
