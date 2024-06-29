import environments from "../../config/environments/environments.js";
import jwt from "jsonwebtoken";

export const authGuard = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing authorization header",status:401,success:false });
  }
  const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, environments.secretKey);
      if(decoded)
        {
            req.id=decoded.id
            req.role=decoded.role
            next()
        }
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
