import { Request, Response } from 'express';

import prisma from '@/lib/prisma/client';
import { sendSuccess, sendError, ApiResponse } from '@/utils/response';

export const getHealth = async (req: Request, res: Response<ApiResponse>) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    sendSuccess(
      res,
      { data: { status: 'OK', database: 'Connected' } },
    );
  } catch (error) {
    sendError(
      res,
      {
        message: 'Database connection failed',
        issues: { database: ['Disconnected'] },
        statusCode: 500,
      },
    );
  }
};
