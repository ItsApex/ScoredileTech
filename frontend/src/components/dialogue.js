import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DialogActions from "@mui/material/DialogActions";
function SideBar() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [imdNowcastAlerts, setImdNowcastAlerts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const handleFabClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

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

        <Fab
          sx={{
            position: "absolute",
            bottom: "4%",
            right: "10%",
            backgroundColor: "#c9474d",
            "&:hover": {
              background: "#e8767c",
            },
          }}
          onClick={handleFabClick}
        >
          <AddIcon sx={{}} aria-label="add" />
        </Fab>
      </Paper>

      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a dummy dialog box content.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SideBar;
