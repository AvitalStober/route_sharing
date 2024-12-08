import jwt from 'jsonwebtoken';
import { Token } from '../types/storeState';


const SECRET_KEY = process.env.SECRET_KEY || "";

//יצירת טוקן
export const generateToken = (id: string, email: string, fullName: string) => {
  return jwt.sign(
    { id: id, email: email, fullName: fullName},
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

// הפונקציה לאימות הטוקן
export const verifyToken = (token: string): Token => {

  try {
    // מאמת את הטוקן ומפענח אותו
    const decoded = jwt.verify(token, SECRET_KEY);

    // המרה ל-DecodedToken, assuming the token contains userId, email, and fullName
    if (typeof decoded === 'object' && decoded !== null) {
      return decoded as Token; // המרה לבטיחות ל-DecodedToken
    } else {
      throw new Error('Invalid token format');
    }
  } catch (error) {
    // במקרה של שגיאה, נווט לעמוד הלוגין
    throw new Error('Invalid or expired token');
  }
};


export const decodeToken = (token: string | null): Token | null => {
  if (token) {
    try {
      // פענוח הטוקן
      const decoded = jwt.decode(token); // decode עושה פיענוח טוקן בלי לבדוק את החתימה
      console.log("Decoded Token:", decoded);
      decoded as Token;
      return decoded as Token;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null;
};
