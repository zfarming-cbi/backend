export class DeviceDTO {
  name: string;
  description: string;
  code: string;
}

export class UpdateDeviceDTO {
  name?: string;
  description?: string;
  code?: string;
  farmId?: string;
  plantId?: string;
}
