import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

import { processAreas } from './processAreas';

export const getStops: Handler = (_event: APIGatewayEvent, _context: Context, cb: Callback) => {

  processAreas();

  const response = {
    statusCode: 200,
    body: "",
  };

  cb(null, response);
}
