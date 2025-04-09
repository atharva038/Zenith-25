// // import "./Model.css";
// import { Link } from "react-router-dom";
// import styles from "./Model.module.css"
// import { X } from "lucide-react";
// const Model = ({ sport, onClose }) => {
//   return (
//     <div className={styles.Main}>
//       <div className={styles.pop_up} id="pop_up">
//         <div className={styles.btn33}>
//           <button className={styles.x} onClick={onClose}>
//             <X />
//           </button>
//         </div>
//         <h2>{sport.name}</h2>
//         <h3>{sport.boys}</h3>
//         <h3>{sport.girls}</h3>
//         <hr />

//         <hr />
//         <h3>Contact</h3>
//         <p className={styles.contact}>{sport.contact1}</p>
//         <p className={styles.contact}>{sport.contact2}</p>
//         <button className={styles.Reg}>
//           <Link to='/registration' >
//             Register
//           </Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Model;

import { Link } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, IconButton, Button, Typography } from "@mui/material";
import { X } from "lucide-react";

const Model = ({ sport, onClose }) => {
  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      sx={{
        ".MuiPaper-root": {
          padding: "30px",
          width: "500px",
          background: "linear-gradient(180deg, #707070 0%, #212020 76.26%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          borderRadius: "10px",
          textAlign: "center",
          position: "relative"
        }
      }}
    >
      {/* Close Button (Top Right) */}
      <IconButton 
  onClick={onClose} 
  sx={{
    position: "absolute",
    top: "30px",
    left: "88% !important" ,
    right: "10px",
    width: "40px",
    height: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    color: "#fff",
    
    "&:active": {
      transform: "scale(0.9)",
      transition: "transform 0.1s"
    }
  }}
>
  <X />
</IconButton>


      {/* Title */}
      <DialogTitle sx={{ color: "orange", marginTop: "-10px", paddingBottom: "10px" }}>
        {sport.name}
      </DialogTitle>

      <DialogContent>
        {/* Fees (Centered) */}
        <Typography variant="h6" sx={{ color: "#fff", margin: "5px 0" }}> {sport.boys}</Typography>
        <Typography variant="h6" sx={{ color: "#fff", margin: "5px 0" }}>{sport.girls}</Typography>

        <hr />

        {/* Contact Details (Centered) */}
        <Typography variant="h6" sx={{ color: "#fff", margin: "10px 0" }}>Contact</Typography>
        <Typography sx={{ color: "#fff", fontSize: "1rem" }}>{sport.contact1}</Typography>
        <Typography sx={{ color: "#fff", fontSize: "1rem" }}>{sport.contact2}</Typography>
        <Typography sx={{ color: "#fff", fontSize: "1rem" }}>{sport.contact3}</Typography>


        {/* Bottom Section: Register Button (Centered) */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
          <Button 
            variant="contained" 
            component={Link} 
            to="/registration" 
            sx={{
              width: "120px",
              background: "yellow",
              borderRadius: "10px",
              fontSize: "1.1rem",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
              color: 'black'
            }}
          >
            Register
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Model;