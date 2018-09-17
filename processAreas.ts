
import { processTre } from './areas/tre';
import { processHsl } from './areas/hsl';
import { processVr } from './areas/vr';
import { processTurku } from './areas/turku';
import { processJy } from './areas/jy';

export const processAreas = () => {
  processTre();
  processVr();
  processTurku();
  processJy();
  processHsl();
};
