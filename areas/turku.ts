import { downloadJsonFile, gzipAndUpload } from '../utils';

interface StopsType {
  [stop_code: string]: StationType;
}

interface StationType {
  stop_code: string;
  stop_name: string;
  stop_lat: number;
  stop_lon: number;
}

export function processTurku() {
  downloadJsonFile(
    'http://data.foli.fi/gtfs/v0/stops',
    (json: StopsType) => {

      const version = 2;
      const result: Array<StopType> = [];

      for (let stopCode in json) {
        const station = json[stopCode];
        result.push([
          station.stop_name,
          station.stop_code,
          Math.round(station.stop_lat * 1e6),
          Math.round(station.stop_lon * 1e6),
        ]);
      }

      gzipAndUpload(version, result, 'StopsTurku_jhx45zsb', 2500);
    });
}
