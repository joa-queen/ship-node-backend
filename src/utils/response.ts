import { Response } from 'express';

import { User } from '@prisma/client';

export enum ErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  // Add more error codes as needed
}

type SuccessResponse<T> = {
  success: true;
  data: T;
  upserted?: {
    users?: Record<string, User>;
  };
  deleted?: {
    users?: string[];
  };
};

type ErrorResponse = {
  success: false;
  message: string;
  code: ErrorCode;
  issues?: Record<string, string[]>;
};

export type ApiResponse<T = never> = SuccessResponse<T> | ErrorResponse;

const inferErrorCode = (statusCode: number): ErrorCode => {
  switch (statusCode) {
    case 400:
      return ErrorCode.BAD_REQUEST;
    case 401:
      return ErrorCode.UNAUTHORIZED;
    case 403:
      return ErrorCode.FORBIDDEN;
    case 404:
      return ErrorCode.NOT_FOUND;
    case 500:
      return ErrorCode.INTERNAL_SERVER_ERROR;
    default:
      return ErrorCode.INTERNAL_SERVER_ERROR;
  }
};

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode = 200,
  upserted?: SuccessResponse<T>['upserted'],
  deleted?: SuccessResponse<T>['deleted'],
): void => {
  const response: SuccessResponse<T> = {
    success: true,
    data,
    ...(upserted && { upserted }),
    ...(deleted && { deleted }),
  };
  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  issues?: Record<string, string[]>,
  statusCode = 400,
  code?: ErrorCode,
): void => {
  const inferredCode = code || inferErrorCode(statusCode);

  const response: ErrorResponse = {
    success: false,
    message,
    code: inferredCode,
    ...(issues && { issues }),
  };
  res.status(statusCode).json(response);
};
