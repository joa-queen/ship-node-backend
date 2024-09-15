import express from 'express';

import { getHealth } from './handlers/get-health';

export const healthRouter = express.Router();

healthRouter.get('/', getHealth);
