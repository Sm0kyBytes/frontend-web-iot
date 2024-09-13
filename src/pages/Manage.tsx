import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDevices from "../hooks/useDevice";
import { DeviceModal, DeviceModalAdjust } from "../models/device";
//import Mui
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ManagePage: React.FC = () => {
  const { devices, getDevices, deleteDevise, isError, isLoading } =
    useDevices();
  const navigate = useNavigate();

  const cardStyle = {
    minWidth: 275,
    margin: 2,
    border: "1px solid #888888",
    boxShadow: "5px 10px #888888",
  };

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <h2>404 - Page Not Found</h2>
      ) : (
        <div>
          <Button
            size="large"
            color="primary"
            onClick={() => navigate("/manage/create")}
          >
            New device
          </Button>
          <h2>Your devices:</h2>
          <div>
            {devices[0] ? (
              devices.map((device: DeviceModalAdjust) => (
                <Card key={device.id} sx={cardStyle}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                      {device.category}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {device.deevice_name}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                      {device.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => navigate(`/manage/edit/${device.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      onClick={() => deleteDevise(device.id || -1)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ))
            ) : (
              <div>
                <p>Not device found.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePage;
