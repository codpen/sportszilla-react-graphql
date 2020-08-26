import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import atob from 'atob';
import User from '../models/user.model';
import { JWT_KEY } from '../server';

const router = express.Router();

export function sendJWT(user: User, res: Response, newUser: boolean): void {
  const jwtToken = jwt.sign({ userId: user.id, email: user.email }, JWT_KEY!, { expiresIn: '60m' });
  res.status(newUser ? 201 : 200);
  res.send({ jwtToken, user });
}

async function faceAuth(req: Request, res: Response) {
  try {
    const { fbToken } = req.body;
    const fbUserData = JSON.parse(atob(fbToken.split('.')[1]));
    const user = await User.findOne({ where: { email: fbUserData.email, fbUser: true } });
    if (!user) {
      const newUserData = {
        firstName: fbUserData.name.split(' ')[0],
        email: fbUserData.email,
        fbUser: true,
      };
      const newUser = await User.create(newUserData);
      sendJWT(newUser, res, true);
    }
    sendJWT(user!, res, false);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
}

async function auth(req: Request, res: Response) {
  let errStatus = 500;
  try {
    if (req.params.userType === 'new') {
      const { passW } = req.body;
      const passWRgx = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
      if (!passWRgx.test(passW)) {
        errStatus = 401;
        throw new Error('Invalid password!');
      }
      const pswdHash = await bcrypt.hash(passW, 10);
      req.body.passW = pswdHash;
      const newUser = await User.create(req.body);
      sendJWT(newUser, res, true);
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
      sendJWT(user, res, false);
    }
  } catch (err) {
    console.error(err);
    res.status(errStatus);
    res.send(err);
  }
}

router.post('/auth/Face', faceAuth);
router.post('/auth/:userType', auth);

export default router;
