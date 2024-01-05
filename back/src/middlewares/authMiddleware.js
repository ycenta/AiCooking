import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function(req, res, next) {
  const token = req.headers['authorization'].replace('Bearer ', '');

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      console.log(err);
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.id;
    next();
  });
}