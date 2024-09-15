import express from 'express';
import * as Sentry from '@sentry/node';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import 'express-async-errors';

import { errorHandler } from '@/middlewares/error-handler';
import { notFoundHandler } from '@/middlewares/not-found-handler';
import { healthRouter } from '@/app/health/router';

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use('/health', healthRouter);

Sentry.setupExpressErrorHandler(app);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
