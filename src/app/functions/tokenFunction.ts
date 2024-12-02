import jwt from 'jsonwebtoken';


const SECRET_KEY = process.env.SECRET_KEY || "";

//יצירת טוקן
export const generateToken = (id: string, email: string, name:string, age: number, address: string, isGoogleUser:boolean) => {
    return jwt.sign(
      {id: id, email: email, name: name, age: age, address: address, isGoogleUser: isGoogleUser },
      SECRET_KEY, 
      { expiresIn: '2h' } 
    );
  };
 
//אימות טוקן
export const verifyToken = (token: string) => {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
};
