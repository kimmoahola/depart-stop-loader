
import * as request from 'request';
import * as AdmZip from 'adm-zip';
import * as AWS from 'aws-sdk';
import * as csvParse from 'csv-parse';
import { gzip } from 'zlib';

export function downloadAndUnzipFile(
    url: string,
    fileName: string,
    callback: (data: string) => void): void {

  let options = {
    method: 'GET',
    url,
    encoding: null,
  };

  request(options, (error, _response, body: string) => {
    if (error) throw error;

    const zip = new AdmZip(body);

    for (let zipEntry of zip.getEntries()) {
      if (zipEntry.entryName === fileName) {
        callback(zipEntry.getData().toString());
        break;
      }
    }

  });
}

export function downloadJsonFile(
    url: string,
    callback: (data: any) => void): void {

  let options = {
    method: 'GET',
    url,
    followAllRedirects: true,
    gzip: true,
  };

  request(options, (error, _response, body: string) => {
    if (error) throw error;
    callback(JSON.parse(body));
  });
}

export function gzipAndUpload(version: number, stops: Array<StopType>, keyName: string, minAmount: number) {

  if (stops.length < minAmount) {
    console.log(`Too few stops (${stops.length}) for ${keyName}. Min amount was ${minAmount}.`);
  } else {
    const data = version + '\n' + JSON.stringify(stops.sort());
    gzip(data, function (error, gzipped) {
      if (error) throw error;
      uploadToS3(gzipped, keyName);
    });
  }
}

export function parseGtfsStopsData(
    data: string, indexes: {title: number, id: number, lat: number, lng: number},
    callback: (version: number, stops: Array<StopType>) => void): void {

  const version = 2;
  const result: Array<StopType> = [];

  csvParse(data, {}, function(error: any, output: Array<any>) {
    if (error) throw error;
    output.forEach(line => {
      const title = line[indexes.title];
      const id = line[indexes.id];
      const lat = Math.round(Number(line[indexes.lat]) * 1e6);
      const lng = Math.round(Number(line[indexes.lng]) * 1e6);

      if (title && id && lat && lng) {
        result.push([title, id, lat, lng]);
      }
    });

    callback(version, result);
  });
}

function uploadToS3(binaryData: Buffer, keyName: string) {
  const s3 = new AWS.S3();

  var params = {
    ACL: 'public-read',
    Body: binaryData,
    Bucket: 'eu.cdn.sekakuoro.com',
    Key: keyName,
  };

  s3.putObject(params, function(error) {
    if (error) throw error;
  });
}
