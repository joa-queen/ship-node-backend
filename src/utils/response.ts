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

interface ResponseMeta {
  total: number;
  page: number;
  perPage: number;
}

type SuccessResponse<T> = {
  success: true;
  data?: T;
  meta?: ResponseMeta;
  upserted?: {
    users?: Record<string, User>;
  };
  deleted?: {
    users?: string[];
  };
};

type SendSuccess<T> = {
  data?: T;
  statusCode?: number;
  meta?: SuccessResponse<T>['meta'];
  upserted?: SuccessResponse<T>['upserted'];
  deleted?: SuccessResponse<T>['deleted'];
};

type ErrorResponse = {
  success: false;
  message: string;
  code: ErrorCode;
  issues?: Record<string, string[]>;
};

type SendError = {
  message: string;
  issues?: ErrorResponse['issues'];
  statusCode?: number;
  code?: ErrorCode;
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
  {
    data,
    meta,
    statusCode = 200,
    upserted,
    deleted,
  }: SendSuccess<T>,
): void => {
  const response: SuccessResponse<T> = {
    success: true,
    ...(data && { data }),
    ...(upserted && { upserted }),
    ...(deleted && { deleted }),
    ...(meta && { meta }),
  };
  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  {
    message,
    issues,
    statusCode = 400,
    code,
  }: SendError,
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
