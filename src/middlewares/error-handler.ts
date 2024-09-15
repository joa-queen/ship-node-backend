import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { ApiResponse, sendError } from '@/utils/response';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ApiResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const validationError = fromZodError(err);
    return sendError(res, validationError.message, {
      validation: validationError.details.map((e) => e.message),
    });
  }

  console.error(err);
  return sendError(res, 'Internal Server Error', {}, 500);
};
