import MongoServices from "../genericService/genericService.js";
import userModel from "../../models/user/userEntity.js";
export const roleGuard = async (req, res, next) => {
  const mongoService = new MongoServices(userModel);
  const response = await mongoService.find(req.id);
  if (response.data.role == "admin") {
    next();
  }
  else{
    return res
    .status(401)
    .json({ message: "Unauthorized", status: 401, success: false });
  }
 
};
