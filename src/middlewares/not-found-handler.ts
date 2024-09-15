import { Request, Response } from 'express';

import { ApiResponse, sendError } from '@/utils/response';

export const notFoundHandler = (req: Request, res: Response<ApiResponse>) => {
  sendError(res, 'Not Found', {}, 404);
};
