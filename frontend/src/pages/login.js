import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";

function Loginpage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your login logic here, e.g., send data to a server
    console.log("Username:", formData.username);
    console.log("Password:", formData.password);
    try {
      
      const response = await axios.post("http://localhost:3001/users/login", {
        'username' : formData.username,
        'password' : formData.password
      })
      .then(
        (res)=>{
          console.log( res.data.userId)
          localStorage.setItem("userId", res.data.userId);
        }
      )
      console.log(response)

      navigate("/home");
      // console.log("logging successful:", response.data);
    } catch (error) {
      // Handle registration errors (e.g., validation errors, server errors)
      console.error("Error logining user:", error);
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // This will make the container take up the full viewport height
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          backgroundColor: "#030d17",
          py: 6,
          px: 5,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Loginpage;
