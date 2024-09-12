import React, { useState } from "react";
import { DeviceModalAdjust } from "../models/device";
import useDevices from "../hooks/useDevice";
import { useAuth } from "../context/authentication";
import { useNavigate } from "react-router-dom";
//import MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Navigate } from "react-router-dom";

const CreateDevicePage: React.FC = () => {
  const [deviceName, setDeviceName] = useState("");
  const [description, setDescription] = useState("No description");
  const [category, setCategory] = useState("No category");
  const { createDevice } = useDevices();
  const authContext = useAuth();
  const navigate = useNavigate();
  const cardStyle = {
    minWidth: 300,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #888888",
    boxShadow: "5px 10px #888888",
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = authContext?.user?.id || -1;
    const newDevice: DeviceModalAdjust = {
      userId,
      deviceName,
      description,
      category,
    };
    createDevice(newDevice);
  };
  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Create Form
        </Typography>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          // noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div
            className="input-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              required
              label="deviceName"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDeviceName(event.target.value);
              }}
              value={deviceName}
            />
            <TextField
              required
              label="description"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(event.target.value);
              }}
              value={description}
            />
            <TextField
              required
              label="category"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCategory(event.target.value);
              }}
              value={category}
            />
            <Button type="submit" fullWidth sx={{ fontWeight: 700 }}>
              Submit
            </Button>
          </div>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate("/manage")}>
          Back
        </Button>
      </CardActions>
    </Card>
    // <div className="page-container">
    //   <h1>Create Device Page</h1>
    //   <div className="create-form-container">
    //     <form className="create-form" onSubmit={handleSubmit}>
    //       <h2>Create Form</h2>
    //       <div className="input-container">
    //         <label>
    //           Devise name:
    //           <input
    //             id="deviceName"
    //             name="deviceName"
    //             type="text"
    //             placeholder="Enter device name here"
    //             onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    //               setDeviceName(event.target.value);
    //             }}
    //             value={deviceName}
    //             required
    //           />
    //         </label>
    //       </div>
    //       <div className="input-container">
    //         <label>
    //           description:
    //           <input
    //             id="description"
    //             name="description"
    //             type="text"
    //             placeholder="Enter description here"
    //             onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    //               setDescription(event.target.value);
    //             }}
    //             value={description}
    //             required
    //           />
    //         </label>
    //       </div>
    //       <div className="input-container">
    //         <label>
    //           Category:
    //           <input
    //             id="category"
    //             name="category"
    //             type="text"
    //             placeholder="Enter category here"
    //             onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    //               setCategory(event.target.value);
    //             }}
    //             value={category}
    //             required
    //           />
    //         </label>
    //       </div>
    //       <div className="form-actions">
    //         <button type="submit">Submit</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
};

export default CreateDevicePage;
