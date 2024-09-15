import winston from 'winston';

import envs from './envs';

const transports = envs.NODE_ENV === 'production'
  ? new winston.transports.File({ filename: 'error.log', level: 'error' })
  : new winston.transports.Console({ format: winston.format.simple() });

let level = 'info';

if (envs.NODE_ENV === 'test') {
  level = 'error';
} else if (envs.NODE_ENV === 'development') {
  level = 'debug';
}

const logger = winston.createLogger({
  level,
  format: winston.format.json(),
  transports,
});

export default logger;
