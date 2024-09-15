import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { ApiResponse, sendError } from '@/utils/response';
import logger from '@/lib/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ApiResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const validationError = fromZodError(err);
    return sendError(res, {
      message: validationError.message,
      issues: {
        validation: validationError.details.map((e) => e.message),
      },
    });
  }

  logger.error(String(err));
  return sendError(res, {
    message: 'Internal Server Error',
    statusCode: 500,
  });
};
