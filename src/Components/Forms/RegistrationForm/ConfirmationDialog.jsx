import React, { useState } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Typography, Box, Modal 
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber"; // Warning icon

const ConfirmationDialog = ({ open, onClose, onConfirm, formData }) => {
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to open image modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setImageOpen(true);
  };

  return (
    <>
      {/* Main Confirmation Dialog */}
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle 
          sx={{ 
            fontWeight: "bold", 
            textAlign: "center", 
            bgcolor: "#f4f6f9", 
            color: "#333" 
          }}
        >
          Confirm Registration
        </DialogTitle>

        <DialogContent sx={{ bgcolor: "#f9fafb", p: 3 }}>
          {/* Warning Section */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            bgcolor: "#fff3cd", 
            border: "1px solid #ffeeba", 
            borderRadius: "5px", 
            p: 2, 
            mb: 2 
          }}>
            <WarningAmberIcon sx={{ color: "#856404", mr: 1 }} />
            <Typography sx={{ color: "#856404", fontWeight: "bold" }}>
              ⚠ See Your Details Before Submitting!
            </Typography>
          </Box>

          {/* User Details Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, bgcolor: "#ffffff", p: 2, borderRadius: "5px", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}>
            <Typography><strong>Institution:</strong> {formData.institution}</Typography>
            <Typography><strong>Captain Name:</strong> {formData.captainName}</Typography>
            <Typography><strong>Captain Contact:</strong> {formData.captainContact}</Typography>
            <Typography><strong>Alternate Contact:</strong> {formData.alternateContact || "N/A"}</Typography>
            <Typography><strong>Selected Game:</strong> {formData.selectedGame}</Typography>
            <Typography><strong>College Address:</strong> {formData.collegeAddress}</Typography>
            <Typography><strong>Email:</strong> {formData.email || "N/A"}</Typography>
            <Typography><strong>Team Name:</strong> {formData.teamName || "N/A"}</Typography>
            <Typography><strong>Accommodation:</strong> {formData.accommodation ? "Yes" : "No"}</Typography>
            <Typography><strong>Fees:</strong> ₹{formData.fees}</Typography>
          </Box>

          {/* Uploaded Documents Section */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Uploaded Documents:
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, bgcolor: "#ffffff", p: 2, borderRadius: "5px", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}>
              {["transactionReceipt", "idCard", "collegeLetter"].map((docKey) => (
                formData[docKey] ? (
                  <Box key={docKey} sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                      {docKey === "transactionReceipt" ? "Transaction Receipt" :
                      docKey === "idCard" ? "ID Card" :
                      "College Letter"}
                    </Typography>
                    <img
                      src={formData[docKey]}
                      alt={docKey}
                      onClick={() => handleImageClick(formData[docKey])}
                      style={{
                        width: "100%",
                        maxWidth: "200px",
                        height: "auto",
                        cursor: "pointer",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                        transition: "0.3s",
                      }}
                    />
                  </Box>
                ) : (
                  <Typography key={docKey} sx={{ color: "red", fontWeight: "bold" }}>
                    ❌ {docKey === "transactionReceipt" ? "Transaction Receipt" :
                        docKey === "idCard" ? "ID Card" :
                        "College Letter"} Not Uploaded
                  </Typography>
                )
              ))}
            </Box>
          </Box>
        </DialogContent>

        {/* Action Buttons */}
        <DialogActions sx={{ gap: 8, justifyContent: "center", pb: 2, bgcolor: "#f4f6f9" }}>
          <Button onClick={onClose} color="error" variant="outlined">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Preview Modal */}
      <Modal open={imageOpen} onClose={() => setImageOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 2,
            maxWidth: "90%",
            maxHeight: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <img
            src={selectedImage}
            alt="Enlarged Preview"
            style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: "5px" }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ConfirmationDialog;
