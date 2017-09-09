
import {downloadAndUnzipFile, gzipAndUpload, parseGtfsStopsData} from '../utils';

export function processJy() {
  downloadAndUnzipFile(
    'http://data.jyvaskyla.fi/tiedostot/linkkidata.zip',
    'stops.txt',
    (data: string) => {
      parseGtfsStopsData(data, {id: 0, title: 2, lat: 3, lng: 4}, (version, stops) => {
        gzipAndUpload(version, stops, 'StopsJy_jhx45zsb');
      });
    });
}
