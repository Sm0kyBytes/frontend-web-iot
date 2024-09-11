export interface DeviceModal {
  id?: number;
  userId: number;
  deviceName?: string;
  description: string;
  category: string;
  create_at?: Date;
  update_at?: Date;
}

export interface DeviceModalAdjust extends DeviceModal {
  deevice_name?: string;
}
