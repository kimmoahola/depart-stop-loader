
import {downloadAndUnzipFile, gzipAndUpload, parseGtfsStopsData} from '../utils';

export function processTre() {
  downloadAndUnzipFile(
    'http://data.itsfactory.fi/journeys/files/gtfs/latest/gtfs_tampere.zip',
    'stops.txt',
    (data: string) => {
      parseGtfsStopsData(data, {id: 0, title: 2, lat: 3, lng: 4}, (version, stops) => {
        gzipAndUpload(version, stops, 'StopsTre_jhx45zsb', 2500);
      });
    });
}
