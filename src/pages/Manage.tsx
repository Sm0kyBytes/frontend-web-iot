import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useDevices from "../hooks/useDevice";
import { DeviceModal, DeviceModalAdjust } from "../models/device";

const ManagePage: React.FC = () => {
  const {
    devices,
    getDevices,
    createDevice,
    updateDeviceById,
    deleteDevise,
    isError,
    isLoading,
  } = useDevices();

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <div>
      <h1>Manage Page</h1>
      <p>This is web application for manage device.</p>
      <ul>
        <li>
          <Link to="/manage/create">New device</Link>
        </li>
      </ul>
      <h2>Display device</h2>
      {devices[0] ? (
        devices.map((device: DeviceModalAdjust) => (
          <div key={device.id} className="card-container">
            <h6>{device.deevice_name}</h6>
            <div>
              <p>{device.description}</p>
            </div>
            <p>{device.category}</p>
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>Not device found.</p>
        </div>
      )}
    </div>
  );
};

export default ManagePage;
