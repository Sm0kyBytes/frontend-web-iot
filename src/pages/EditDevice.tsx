import React, { useState, useEffect } from "react";
import { DeviceModalAdjust } from "../models/device";
import useDevices from "../hooks/useDevice";
import { useAuth } from "../context/authentication";
import { useNavigate, useParams } from "react-router-dom";
//import MUI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const EditDevicePage: React.FC = () => {
  const { getDevices, devices, updateDeviceById } = useDevices();
  const [deviceName, setDeviceName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [deviceId, setDeviceId] = useState(-1);
  const authContext = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

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
    console.log(deviceId, newDevice);

    updateDeviceById(deviceId, newDevice);
  };

  useEffect(() => {
    getDevices();
    console.log(devices);
    if (id) {
      let numId = parseInt(id);
      setDeviceId(numId);
    }
    if (devices[0] !== undefined) {
      const arrDevice = devices;
      const filterDevice = arrDevice.filter((device) => device.id == id);
      console.log(filterDevice[0]);

      if (filterDevice[0] !== undefined) {
        // if (filterDevice[0].id && filterDevice[0].id !== undefined) {
        //   setDeviceId(filterDevice[0].id);
        // }
        if (
          filterDevice[0].deevice_name &&
          filterDevice[0].deevice_name !== undefined
        ) {
          setDeviceName(filterDevice[0].deevice_name);
        }
        if (
          filterDevice[0].description &&
          filterDevice[0].description !== undefined
        )
          setDescription(filterDevice[0].description);
      }
      if (filterDevice[0].category && filterDevice[0].category !== undefined) {
        setCategory(filterDevice[0].category);
      }
    }
  }, []);

  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Edit Device Form
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
  );
};

export default EditDevicePage;
