import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../server';
import User from '../models/user.model';

const router = express.Router();

function sendToken(user: User, res: Response): void {
  const jwtToken = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_KEY || 'secret',
    { expiresIn: '60m' },
  );
  res.status(200);
  res.send({ jwtToken });
}

async function auth(req: Request, res: Response) {
  const isNewUser = req.params.isNewUser === 'true';
  try {
    if (isNewUser) {
      const pswdHash = await bcrypt.hash(req.body.passW, 10);
      req.body.passW = pswdHash;
      const user = await User.create(req.body);
      sendToken(user, res);
    } else {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) throw new Error('No user found with this email!');
      const isValidPassW = await bcrypt.compare(req.body.passW, user.passW);
      if (!isValidPassW) throw new Error('Invalid password!');
      sendToken(user, res);
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
}

router.post('/auth/:isNewUser', auth);

export default router;
