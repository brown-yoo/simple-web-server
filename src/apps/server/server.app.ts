import express from 'express';

import { Logger } from '@shared/tools';
import { getLocalIp } from './tools/get-local-ip.tool';
import { stripe } from './routes';
import { web } from './routes/web';

const app = express();
const PORT = 3000;

const logger = new Logger(['Server']);

export const serverApp = ()=>{
  app.get('/', (_req, res)=> { res.send('Hello World!') });
  app.use('/stripe', stripe);
  app.use('/web',web)

  app.listen(PORT, () => {
    const currentLocalIP = getLocalIp();
    logger.info(`서버가 실행되었습니다 http://${currentLocalIP}:${PORT}`);
  });
}