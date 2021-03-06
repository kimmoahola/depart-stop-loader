
import {downloadAndUnzipFile, gzipAndUpload, parseGtfsStopsData} from '../utils';

export function processHsl() {
  downloadAndUnzipFile(
    'https://dev.hsl.fi/gtfs/hsl.zip',
    'stops.txt',
    (data: string) => {
      parseGtfsStopsData(data, {id: 0, title: 2, lat: 4, lng: 5}, (version, stops) => {
        gzipAndUpload(version, stops, 'StopsHsl_jhx45zsb', 6500);
      });
    });
}
