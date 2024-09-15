import 'dotenv/config';
import { Server } from 'http';

import './lib/sentry-instrument'; // This needs to be imported first
import app from './app';
import logger from './lib/logger';
import envs from './lib/envs';

const port = envs.PORT;

let server: Server;

export const startServer = async () => {
  await new Promise((resolve) => {
    server = app.listen(port, () => resolve(server));
  });
  logger.success(`Server is running on port ${port}`);
};

export const stopServer = async () => {
  await server.close();
};

if (envs.NODE_ENV !== 'test') {
  startServer();
}
