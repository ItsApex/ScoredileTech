import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system"; // Import styled from @mui/system
import { Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const CenteredContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const Form = styled("form")({
  width: "100%",
  maxWidth: "400px",
  marginTop: "16px",
});

const SubmitButton = styled(Button)({
  marginTop: "16px",
});

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('try block')
      const response = await axios.post("http://localhost:3001/users/register", formData);
      navigate("/login");
      console.log("Registration successful:", response.data);
    } catch (error) {
      // Handle registration errors (e.g., validation errors, server errors)
      console.error("Error registering user:", error);
    }
  };

  return (
    <CenteredContainer>
      <Paper
        variant="outlined"
        sx={{
          
          py: 6,
          px: 5,
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            variant="outlined"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
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
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            variant="outlined"
            margin="normal"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <SubmitButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Register
          </SubmitButton>
        </Form>
      </Paper>
    </CenteredContainer>
  );
};

export default RegistrationPage;
