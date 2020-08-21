import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';

//format like bearer 21321n2bmbbj

export interface AuthContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
}

const Auth: MiddlewareFn<AuthContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  try {
    if (!authorization) throw new Error('Not authenticated');
    const token = authorization.split(' ')[1];
    const payload = verify(token, 'MySecretKey');
    console.log(payload);
    context.payload = payload as any;
  } catch (err) {
    console.error(err);
  }
  return next();
};

export default Auth;
