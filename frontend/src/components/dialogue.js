import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";

function SideBar() {
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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Hey this is your sexy side bar</Typography>

        <Button>This is a button </Button>
      </Paper>
    </>
  );
}

export default SideBar;
