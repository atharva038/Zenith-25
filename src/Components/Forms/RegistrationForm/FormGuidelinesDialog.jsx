import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PaymentIcon from "@mui/icons-material/Payment";

const FormGuidelinesDialog = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth sx={{ overflow: 'hidden'}}>
      <DialogTitle
        sx={{
          backgroundColor: "#f0f8ff",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <InfoIcon color="primary" />
        How to Fill the Registration Form
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#f9fcff", padding: "20px", boxSizing: 'border-box' }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <InfoIcon color="action" />
          <Typography variant="body1" sx={{ marginTop: '20px' }}>Enter your personal and college details.</Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "#007acc", fontWeight: "bold", ml: 4 }}>
          Note: For solo games, enter your name in place of the captain's name.
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mt={2} mb={2}>
          <SportsEsportsIcon color="action" />
          <Typography variant="body1">Select the game you want to register for.</Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "#007acc", fontWeight: "bold", ml: 4 }}>
          Note: One game per form. Submit another form if registering for multiple games.
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mt={2} mb={2}>
          <PaymentIcon color="action" />
          <Typography variant="body1">
            Pay using the given QR Code and take a screenshot of the receipt.
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ ml: 4 }}>
          Upload the payment receipt along with the captain's ID card.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#f0f8ff", padding: "10px", boxSizing: 'border-box' }}>
        <Button onClick={() => setOpen(false)} variant="contained" color="primary" sx={{ marginRight: '20px'}}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormGuidelinesDialog;
