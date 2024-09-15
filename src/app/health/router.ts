import express from 'express';

import { cacheMiddleware } from '@/middlewares/cache';

import { getHealth } from './handlers/get-health';

export const healthRouter = express.Router();

healthRouter.get('/', cacheMiddleware(60), getHealth); // Cache for 1 minute
