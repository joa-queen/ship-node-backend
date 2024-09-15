import { Request, Response } from 'express';

import prisma from '@/lib/prisma/client';
import { sendSuccess, sendError, ApiResponse } from '@/utils/response';

export const getHealth = async (req: Request, res: Response<ApiResponse>) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    sendSuccess(res, { status: 'OK', database: 'Connected' });
  } catch (error) {
    sendError(
      res,
      'Database connection failed',
      { database: ['Disconnected'] },
      500,
    );
  }
};
