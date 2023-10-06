import React, { createContext, useContext, useState } from "react";

const MapContext = createContext();

export function useMap() {
  return useContext(MapContext);
}

export function MapProvider({ children }) {
  const [changeCursor, setChangeCursor] = useState(false);
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });

  const toggleCursor = () => {
    setChangeCursor(!changeCursor);
  };

  const setCoordinates = (lat, lng) => {
    setLatLng({ lat, lng });
  };

  return (
    <MapContext.Provider
      value={{ changeCursor, toggleCursor, latLng, setCoordinates }}
    >
      {children}
    </MapContext.Provider>
  );
}
