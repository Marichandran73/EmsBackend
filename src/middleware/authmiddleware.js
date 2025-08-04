import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authmiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined in environment');
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
    

    const newUser = await User.findById(decodedToken.id).select('-password');
    if (!newUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.user = newUser;
    next();
  } catch(error) {
    console.error('Error in auth middleware:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export default authmiddleware;
