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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

const SubmissionSuccessDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#e8f5e9",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 10 }}
        >
          <CheckCircleIcon color="success" fontSize="large" />
        </motion.div>
        Submission Successful!
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#f1f8e9",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h6" fontWeight="bold">
            🎉 Congratulations!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Your form has been submitted successfully.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "#2e7d32", fontWeight: "bold" }}>
            You will receive a confirmation email shortly.
          </Typography>
        </motion.div>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#e8f5e9", padding: "10px" }}>
        <Button onClick={onClose} variant="contained" color="success" sx={{ marginRight: '20px', marginTop: '20px', overflow: 'hidden'}}>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubmissionSuccessDialog;
