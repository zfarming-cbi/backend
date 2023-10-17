export class MeasuringDataDTO {
  code: string;
  value: string;
}

export class MeasuringHistoryDTO {
  deviceId: string;
  data: MeasuringDataDTO[];
}
