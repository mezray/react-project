import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export function verifyToken(request) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    throw new Error('No token provided');
  }

  let userId;
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    userId = decoded.id;
  } catch (err) {
    throw new Error('Failed to authenticate token');
  }

  return userId;
}