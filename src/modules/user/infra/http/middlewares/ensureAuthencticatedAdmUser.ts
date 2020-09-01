import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: number;
  access_level: string;
}

export default function ensureAuthenticatedAdmUser(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, access_level } = decoded as TokenPayload;

    if (access_level !== 'adm') {
      throw new AppError('This route is only for Adm users');
    }

    const id = sub;

    request.user = {
      id,
    };

    return next();
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError('This route is only for Adm users');
    }
    throw new AppError('Invalid JWT token!!!', 401);
  }
}
