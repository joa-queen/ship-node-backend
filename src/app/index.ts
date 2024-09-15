import express from 'express';
import * as Sentry from '@sentry/node';

import { errorHandler } from '@/middlewares/error-handler';
import { notFoundHandler } from '@/middlewares/not-found-handler';
import { healthRouter } from '@/app/health/router';

const app = express();

app.use(express.json());

app.use('/health', healthRouter);

Sentry.setupExpressErrorHandler(app);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
