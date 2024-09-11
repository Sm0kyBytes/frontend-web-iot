import React, { useState } from "react";
import { DeviceModalAdjust } from "../models/device";
import useDevices from "../hooks/useDevice";
import { useAuth } from "../context/authentication";

const CreateDevicePage: React.FC = () => {
  const [deviceName, setDeviceName] = useState("");
  const [description, setDescription] = useState("No description");
  const [category, setCategory] = useState("No category");
  const { createDevice } = useDevices();
  const authContext = useAuth();
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
    <div className="page-container">
      <h1>Create Device Page</h1>
      <div className="create-form-container">
        <form className="create-form" onSubmit={handleSubmit}>
          <h2>Create Form</h2>
          <div className="input-container">
            <label>
              Devise name:
              <input
                id="deviceName"
                name="deviceName"
                type="text"
                placeholder="Enter device name here"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDeviceName(event.target.value);
                }}
                value={deviceName}
                required
              />
            </label>
          </div>
          <div className="input-container">
            <label>
              description:
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Enter description here"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDescription(event.target.value);
                }}
                value={description}
                required
              />
            </label>
          </div>
          <div className="input-container">
            <label>
              Category:
              <input
                id="category"
                name="category"
                type="text"
                placeholder="Enter category here"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCategory(event.target.value);
                }}
                value={category}
                required
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDevicePage;
