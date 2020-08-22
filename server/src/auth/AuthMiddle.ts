import { Request } from 'express';
import { MiddlewareFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../server';

export interface AuthContext {
  req: Request;
}

const Auth: MiddlewareFn<AuthContext> = ({ context }, next) => {
  const authorization = context.req.get('Authorization');
  if (!authorization) throw new AuthenticationError('Please, log in!');

  const jwtToken = authorization.split(' ')[1];
  jwt.verify(jwtToken, JWT_KEY, (err) => {
    if (err) throw new AuthenticationError('Invalid token!');
  });

  return next();
};

export default Auth;
