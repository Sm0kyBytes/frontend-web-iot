import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DeviceModalAdjust } from "../models/device";

const useDevices = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<DeviceModalAdjust[]>([]);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const getDevices = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await axios.get(`http://localhost:4000/devices`);
      const devicesInfo: DeviceModalAdjust[] = response.data;
      setDevices(devicesInfo);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const deleteDevise = async (deviceId: number) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.delete(`http://localhost:4000/devices/${deviceId}`);
      const newDevices = devices.filter((device) => {
        return device.id !== deviceId;
      });
      setDevices(newDevices);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const createDevice = async (device: DeviceModalAdjust) => {
    console.log(device);

    try {
      setIsError(false);
      setIsLoading(true);
      await axios.post(`http://localhost:4000/devices`, device);
      setIsLoading(false);
      navigate("/manage");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const updateDeviceById = async (
    deviceId: number,
    devise: DeviceModalAdjust
  ) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await axios.put(`http://localhost:4000/devices/${deviceId}`, devise);
      setIsLoading(false);
      navigate("/manage");
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return {
    devices,
    getDevices,
    createDevice,
    updateDeviceById,
    deleteDevise,
    isError,
    isLoading,
  };
};

export default useDevices;
