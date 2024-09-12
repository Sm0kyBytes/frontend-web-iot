import React from "react";
//import MUI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const Home: React.FC = () => {
  const cardStyle = {
    minWidth: 275,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #888888",
    boxShadow: "5px 10px #888888",
  };
  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #888888",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Hello! every body.
        </Typography>
        <Typography variant="h5" component="div">
          Welcome to my app.
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          This is web application for manage your iot device.
        </Typography>
        <Typography variant="body2">let have fun. 🚀</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpen}>
          Learn More
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              This is web application for manage device.
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <ol>
                <li>Click register for registration.</li>
                <li>Login with email and password</li>
                <li>Let manage your device.</li>
              </ol>
            </Typography>
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
};

export default Home;
