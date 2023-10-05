export class MeasuringDataDTO {
  sensorId: string;
  value: string;
}

export class MeasuringHistoryDTO {
  deviceId: string;
  data: MeasuringDataDTO[];
}
