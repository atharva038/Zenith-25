import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  FormLabel,
  RadioGroup,
  Radio,
  CircularProgress,
} from "@mui/material";
import { db } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import styles from "./RegistrationForm.module.css";
import FormGuidelinesDialog from "./FormGuidelinesDialog";
import SubmissionSuccessDialog from "./SubmissionSuccessDialog";
import ErrorDialog from "./ErrorDialog";
import ConfirmationDialog from "./ConfirmationDialog";

const gamesWithFees = [
  { name: "Cricket Mens", fee: 6500 },
  { name: "Basketball Mens", fee: 2500 },
  { name: "Basketball Womens", fee: 1500 },
  { name: "Basketball 3X3", fee: 500 },
  { name: "Volleyball Mens", fee: 2200 },
  { name: "Volleyball Womens", fee: 1500 },
  { name: "Rink Football Mens", fee: 2200 },
  { name: "Rink Football Womens", fee: 1500 },
  { name: "Football Mens", fee: 3000 },
  { name: "Kho-Kho Mens", fee: 1500 },
  { name: "Kabaddi Mens", fee: 2200 },
  { name: "Kabaddi Womens", fee: 1500 },
  // { name: "Chess ", fee: 1500 },
  { name: "Chess Solo", fee: 200 },
  { name: "Handball Mens", fee: 1500 },
  { name: "Badminton Mens", fee: 500 },
  { name: "Badminton Womens", fee: 400 },

  { name: "Athletics Team", fee: 700 },
  { name: "Athletics Solo", fee: 200 },
  { name: "Tug of War", fee: 1000 },
  { name: "Powerlifting", fee: 250 },

];

const RegistrationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    institution: "",
    captainName: "",
    captainContact: "",
    collegeAddress: "",
    alternateContact: "",
    email: "",
    teamName: "",
    accommodation: false,
    selectedGame: "",
    fees: 0,
    transactionReceipt: null,
    idCard: null,
    collegeLetter: null,
  });

  const [errors, setErrors] = useState({});
  const [successOpen, setSuccessOpen] = useState(false);
  const [uploading, setUploading] = useState({
    transactionReceipt: false,
    idCard: false,
  });
  const [errorOpen, setErrorOpen] = useState(false); // Error Dialog state
  const [missingFields, setMissingFields] = useState([]); // Stores missing fields
  const [loading, setLoading] = useState(false); // Loader state
  const [confirmOpen, setConfirmOpen] = useState(false); // For confirmation dialog

  const uploadToCloudinary = async (file, fieldName) => {
    setUploading((prev) => ({ ...prev, [fieldName]: true })); // Show loader

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "f9vlinoa");
    formData.append("folder", "zenith-registrations");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvmsho3pj/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, [fieldName]: data.secure_url })); // Store Cloudinary URL
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setUploading((prev) => ({ ...prev, [fieldName]: false })); // Hide loader
    }
  };

  const handleChange = (e) => {
    const { name, type, checked, files } = e.target;

    if (files && files.length > 0) {
      uploadToCloudinary(files[0], name); // Upload file and store URL
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : e.target.value,
      }));
    }
  };

  const validateStep = () => {
    let newErrors = {};

    if (activeStep === 0) {
      if (!formData.institution.trim())
        newErrors.institution = "Institution name is required.";
      if (!formData.collegeAddress.trim())
        newErrors.collegeAddress = "College Address is required.";
      if (!formData.captainName.trim())
        newErrors.captainName = "Captain name is required.";
      if (!/^\d{10}$/.test(formData.captainContact))
        newErrors.captainContact = "Enter a valid 10-digit number.";
      if (
        formData.alternateContact &&
        !/^\d{10}$/.test(formData.alternateContact)
      )
        newErrors.alternateContact = "Enter a valid 10-digit number.";
      if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
      )
        newErrors.email = "Enter a valid email.";
      if (!formData.teamName.trim())
        newErrors.teamName = "Team name is required.";
    }

    if (activeStep === 1) {
      if (!formData.selectedGame)
        newErrors.selectedGame = "Please select a game.";
    }

    if (activeStep === 2) {
      if (!formData.transactionReceipt)
        newErrors.transactionReceipt = "Transaction receipt is required.";
      if (!formData.idCard) newErrors.idCard = "Captain's ID card is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === 1) {
        const selectedGame = gamesWithFees.find(
          (game) => game.name === formData.selectedGame
        );
        setFormData({ ...formData, fees: selectedGame?.fee || 0 });
      }
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Required fields validation
    const requiredFields = [
      "institution",
      "captainName",
      "captainContact",
      "selectedGame",
      "collegeAddress",
      "fees",
    ];

    const emptyFields = requiredFields.filter((field) => !formData[field]);

    // Check file inputs separately
    if (!formData.transactionReceipt) emptyFields.push("Transaction Receipt");
    if (!formData.idCard) emptyFields.push("ID Card");
    if (!formData.collegeLetter) emptyFields.push("College Letter");

    if (emptyFields.length > 0) {
      setMissingFields(emptyFields);
      setErrorOpen(true);
      return;
    }

    setConfirmOpen(true); // Open confirmation dialog before submitting
  };

  const handleConfirmSubmit = async () => {
    setConfirmOpen(false);
    setLoading(true);

    try {
      await addDoc(collection(db, "registrations"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      setSuccessOpen(true)
            setFormData({
        institution: "",
        captainName: "",
        captainContact: "",
        alternateContact: "",
        collegeAddress: "",
        email: "",
        teamName: "",
        accommodation: false,
        selectedGame: "",
        fees: 0,
        transactionReceipt: null,
        idCard: null,
        collegeLetter: null
      });
    } catch (error) {
      console.error("Error saving registration:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={styles.registrationForm}>
      <FormGuidelinesDialog></FormGuidelinesDialog>
      <Container maxWidth="sm" className={styles.fromContainer}>
        <Paper
          sx={{
            width: "100%",
            padding: "10px 10px",
            marginTop: "10px",
            boxShadow: "0px 0px 0px",
            backgroundColor: 'transparent',
            backdropFilter: "blur(5px)",
          }}
        >
          <div className={styles.formHeader}>
            <div className={styles.zenithTitle}> Zenith </div>
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              sx={{ fontFamily: "Outfit", fontSize: "20px", fontWeight: "400" }}
            >
              Sports Event Registration
            </Typography>
          </div>

          <Stepper activeStep={activeStep} alternativeLabel sx={{
    "& .MuiStepLabel-label": { color: "white !important" }, // Step label text
    "& .MuiStepIcon-root": { color: "white !important" }, // Step icon
    "& .MuiStepIcon-text": { fill: "black !important", fontSize: '15px', fontWeight: 'bold' }, // Step number inside icon
    "& .MuiStepConnector-line": { borderColor: "white !important" }, // Stepper line
  }}>
            {["Team Details", "Game Selection", "Payment & Submission"].map(
              (label) => (
                <Step key={label}>
                  <StepLabel >{label}</StepLabel>
                </Step>
              )
            )}
          </Stepper>

          <form onSubmit={handleSubmit} className={styles.form}>
            {activeStep === 0 && (
              <Box>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Institution Name"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  error={!!errors.institution}
                  helperText={errors.institution}
                  required
                  sx={{
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  }}                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Captain Name"
                  name="captainName"
                  value={formData.captainName}
                  onChange={handleChange}
                  error={!!errors.captainName}
                  helperText={errors.captainName}
                  required
                  sx={{
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  }} 
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Captain Contact No."
                  name="captainContact"
                  value={formData.captainContact}
                  onChange={handleChange}
                  error={!!errors.captainContact}
                  helperText={errors.captainContact}
                  required
                  sx={{
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  }} 
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="College Address"
                  name="collegeAddress"
                  value={formData.collegeAddress}
                  onChange={handleChange}
                  error={!!errors.collegeAddress}
                  helperText={errors.collegeAddress}
                  required
                  sx={{
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  }} 
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Alternate Contact (Optional)"
                  name="alternateContact"
                  type="tel"
                  value={formData.alternateContact}
                  onChange={handleChange}
                  error={!!errors.alternateContact}
                  helperText={errors.alternateContact}
                  sx={{
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  }} 
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email ID"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  sx={{
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  }} 
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Team Name"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  error={!!errors.teamName}
                  helperText={errors.teamName}
                  required
                  sx={{
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  }} 
                />
                <FormControlLabel
                
                  control={
                    <Checkbox
                      name="accommodation"
                      checked={formData.accommodation}
                      onChange={handleChange}
                      sx={{
                        color: "white", // Default color
                        "&.Mui-checked": { color: "white" }, // Color when checked
                      }}
                    />
                  }
                  label="Need Accommodation?"
                  sx={{ color: "white" }}
                />
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <FormControl
                  component="fieldset"
                  fullWidth
                  margin="normal"
                  error={!!errors.selectedGame}
                  sx={{
                    "& .MuiFormLabel-root": { color: "white !important" }, // "Select Game" label color
                    "& .MuiTypography-root": { color: "white !important" }, // Radio label color
                    "& .MuiRadio-root": { color: "white !important" }, // Radio icon color
                    "& .Mui-checked": { color: "white !important" }, // Checked radio button color
                  }}
                >
                  <FormLabel
                    component="legend"
                    sx={{ fontSize: "1.2rem", fontWeight: "bold", mb: 1 }}
                  >
                    Select Game
                  </FormLabel>{" "}
                  <RadioGroup
                    name="selectedGame"
                    value={formData.selectedGame}
                    onChange={handleChange}
                  >
                    {gamesWithFees.map((game) => (
                      <FormControlLabel
                        key={game.name}
                        value={game.name}
                        control={<Radio />}
                        label={`${game.name} - ₹${game.fee}`}
                        sx={{ color: "white !important" }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{ width: "100%" }}>
                {/* Payment Details */}
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    marginBottom: 2,
                    marginTop: "20px",
                    width: "100%",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Payment Details
                  </Typography>
                  <Typography variant="body1">
                    <strong>Selected Game:</strong>{" "}
                    {formData.selectedGame || "Not Selected"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Amount to Pay:</strong> ₹{formData.fees}
                  </Typography>

                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      backgroundColor: "#f9f9f9",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" mb={2}>
                      Payment Options
                    </Typography>

                    

                    {/* QR Code Payment */}
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Scan the QR code below to pay:
                      </Typography>
                      <Box
                        component="img"
                        src="https://res.cloudinary.com/dvmsho3pj/image/upload/v1739551679/zenith-qr/witik3lqcnqqibjsgqfd.jpg" // Replace with your actual QR code image path
                        alt="Scan to Pay"
                        sx={{
                          width: "100%",
                          mt: 2,
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Light shadow for better visibility
                        }}
                      />
                    </Box>
                  </Box>
                </Paper>

                {/* File Upload Section */}
                <Paper
                  elevation={3}
                  sx={{
                    padding: 3,
                    borderRadius: 2,
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Upload Documents
                  </Typography>

                  <Box display="flex" flexDirection="column" gap={3}>
                    {/* Upload College Permission letter */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography variant="body1" fontWeight="bold">
                        Upload College Permission letter :
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                      With sign of Dean Student Affair and Student Incharge and College Stamp
                      </Typography>

                      <Button
                        variant="contained"
                        component="label"
                        sx={{ textTransform: "none", width: "fit-content" }}
                      >
                        Choose File
                        <input
                          type="file"
                          name="collegeLetter"
                          accept="image/*" // Only images
                          hidden
                          onChange={handleChange}
                        />
                      </Button>
                      {uploading.collegeLetter ? (
                        <CircularProgress size={24} />
                      ) : (
                        formData.collegeLetter && (
                          <Typography variant="body2" color="success.main">
                            Uploaded: {formData.collegeLetter.split("/").pop()}
                          </Typography>
                        )
                      )}
                    </Box>
                    {/* Upload Transaction Receipt */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography variant="body1" fontWeight="bold">
                        Upload Transaction Receipt:
                      </Typography>
                      <Button
                        variant="contained"
                        component="label"
                        sx={{ textTransform: "none", width: "fit-content" }}
                      >
                        Choose File
                        <input
                          type="file"
                          name="transactionReceipt"
                          accept="image/*" // Restricts to images only
                          hidden
                          onChange={handleChange}
                        />
                      </Button>
                      {uploading.transactionReceipt ? (
                        <CircularProgress size={24} />
                      ) : (
                        formData.transactionReceipt && (
                          <Typography variant="body2" color="success.main">
                            Uploaded:{" "}
                            {formData.transactionReceipt.split("/").pop()}
                          </Typography>
                        )
                      )}
                    </Box>

                    {/* Upload Captain’s ID Card */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography variant="body1" fontWeight="bold">
                        Upload Captain’s ID Card:
                      </Typography>
                      <Button
                        variant="contained"
                        component="label"
                        sx={{ textTransform: "none", width: "fit-content" }}
                      >
                        Choose File
                        <input
                          type="file"
                          name="idCard"
                          accept="image/*" // Only images
                          hidden
                          onChange={handleChange}
                        />
                      </Button>
                      {uploading.idCard ? (
                        <CircularProgress size={24} />
                      ) : (
                        formData.idCard && (
                          <Typography variant="body2" color="success.main">
                            Uploaded: {formData.idCard.split("/").pop()}
                          </Typography>
                        )
                      )}
                    </Box>
                    
                  </Box>
                </Paper>
              </Box>
            )}

            <Box
              mt={6}
              textAlign="center"
              display="flex"
              justifyContent="center"
              gap={8}
            >
              {activeStep > 0 && (
                <Button
                  onClick={handleBack}
                  variant="outlined"
                  sx={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    textTransform: "none",
                    color: "#1976D2",
                    borderColor: "#1976D2",
                    "&:hover": {
                      backgroundColor: "#E3F2FD",
                      borderColor: "#1259a3",
                    },
                  }}
                >
                  Back
                </Button>
              )}

              {activeStep < 2 ? (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  sx={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    textTransform: "none",
                    backgroundColor: "#1976D2",
                    "&:hover": {
                      backgroundColor: "#1259a3",
                    },
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  // type="submit"
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    textTransform: "none",
                    backgroundColor: "#2E7D32",
                    "&:hover": {
                      backgroundColor: "#1B5E20",
                    },
                  }}
                  disabled={loading} // Disable button when loading
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Container>
      {/* Error Dialog (Missing Fields) */}
      <ErrorDialog
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        missingFields={missingFields}
      />
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmSubmit}
        formData={formData}
      />
      <SubmissionSuccessDialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
      />
    </div>
  );
};

export default RegistrationForm;
