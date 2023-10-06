import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system"; // Import styled from @mui/system

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here, e.g., sending data to the server.
    console.log(formData);
  };

  return (
    <CenteredContainer>
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
    </CenteredContainer>
  );
};

export default RegistrationPage;
