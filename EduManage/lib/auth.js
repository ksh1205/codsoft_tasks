import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email
    },
    SECRET,
    {
      expiresIn: "1d"
    }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}