import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RouteIcon from '@mui/icons-material/Route';

function RouteSet(props) {
    const [clickedData, setclickedData] = useState(props.clikedloc);
    const [formData, setFormData] = useState({
        latitude: props.lat,
        longitude: props.lng,
        alertName: '',
        alertDescription: '',
        alertSeverity: '',
      });
    
    const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

    return (
        <>
            <Typography variant="h5">Find a Safe Route</Typography>

            <div>
                <TextField
                disabled
                style={{margin:"2vh 5%", width:"90%"}}
                margin="dense"
                id="filled-disabled"
                label="Latitude"
                value={formData.latitude}
                onChange={handleFormChange}
                />

                <TextField
                disabled
                style={{margin:"2vh 5%", width:"90%"}}
                fullWidth
                margin="dense"
                id="filled-disabled"
                label="Longitude"
                value={formData.longitude}
                onChange={handleFormChange}
                />
            </div>

            <Typography variant="h6">Safe Location </Typography>

                <Button variant="contained" color="success" startIcon={<RouteIcon />}>Set Location</Button>
                <Typography variant="h6">{clickedData}</Typography>

            <Button>Another button</Button>
        </>
    )
}

export default RouteSet;