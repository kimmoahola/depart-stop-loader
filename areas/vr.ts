
import { downloadJsonFile, gzipAndUpload } from '../utils';

interface LocationType {
  lon: number;
  lat: number;
}

interface StationType {
  abbreviation: string;
  name: string;
  type: string;
  location: LocationType;
}

export function processVr() {
  downloadJsonFile(
    'https://junatkartalla-cal-prod.herokuapp.com/stations/list/fi-FI',
    (json: Array<StationType>) => {

      const version = 2;
      const result: Array<StopType> = [];

      json.filter(station => station.type === 'Station' || station.type === 'Service station')
          .forEach(station => {
        result.push([
          station.name,
          station.abbreviation,
          Math.round(station.location.lat * 1e6),
          Math.round(station.location.lon * 1e6),
        ]);
      });

      gzipAndUpload(version, result, 'StopsVr_jhx45zsb');
    });
}
