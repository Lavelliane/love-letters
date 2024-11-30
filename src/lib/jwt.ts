import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function signJWT() {
  const token = jwt.sign({}, JWT_SECRET, {
    expiresIn: '7d' // Token expires in 7 days
  });
  return token;
}

export function verifyJWT(token: string) {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}