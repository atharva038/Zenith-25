import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

// Mapping field names to readable labels
const fieldLabels = {
  institution: "Institution Name",
  captainName: "Captain Name",
  captainContact: "Captain Contact",
  selectedGame: "Selected Game",
  fees: "Fees",
  transactionReceipt: "Transaction Receipt",
  idCard: "ID Card",
  collegeLetter: "College Letter",
};

const ErrorDialog = ({ open, onClose, missingFields }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: "flex", alignItems: "center", padding: 2, bgcolor: "#fff8e1" }}>
        <WarningAmberIcon sx={{ color: "#ff9800", fontSize: 32, marginRight: 1 }} />
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.2rem", color: "#d32f2f" }}>
          Incomplete Form
        </DialogTitle>
      </Box>

      <DialogContent sx={{ padding: "16px 24px" }}>
        <Typography variant="body1" sx={{ fontSize: "1rem", marginBottom: 1 }}>
          Please complete the following fields before submitting:
        </Typography>
        <Box component="ul" sx={{ paddingLeft: "20px", margin: "8px 0" }}>
          {missingFields.map((field, index) => (
            <li key={index} style={{ fontWeight: "bold", color: "#d32f2f", fontSize: "0.95rem" }}>
              {fieldLabels[field] || field}
            </li>
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
        <Button onClick={onClose} variant="contained" sx={{ bgcolor: "#d32f2f", color: "#fff", "&:hover": { bgcolor: "#b71c1c" } }}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
