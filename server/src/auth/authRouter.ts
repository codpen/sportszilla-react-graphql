import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../server';
import User from '../models/user.model';

const router = express.Router();

function sendJWT(user: User, res: Response): void {
  const jwtToken = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_KEY || 'secret',
    { expiresIn: '60m' },
  );
  res.status(200);
  res.send({ jwtToken });
}

async function auth(req: Request, res: Response) {
  let errStatus = 500;
  try {
    if (req.params.userType === 'new') {
      const pswdHash = await bcrypt.hash(req.body.passW, 10);
      req.body.passW = pswdHash;
      const user = await User.create(req.body);
      sendJWT(user, res);
    } else if (req.params.userType === 'returning') {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) {
        errStatus = 404;
        throw new Error('No user found with this email!');
      }
      const isValidPassW = await bcrypt.compare(req.body.passW, user.passW);
      if (!isValidPassW) {
        errStatus = 401;
        throw new Error('Invalid password!');
      }
      sendJWT(user, res);
    }
  } catch (err) {
    console.error(err);
    res.status(errStatus);
    res.send(err);
  }
}

router.post('/auth/:userType', auth);

export default router;
