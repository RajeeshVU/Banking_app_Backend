import jwt from "jsonwebtoken";
import environments from "../../../config/environments/environments.js";
import MongoServices from "../../../shared/genericService/genericService.js";
import UserModel from "../../../models/user/userEntity.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const mongoService = new MongoServices(UserModel, {
    ...req.body,
    password: hashPassword,
    photo:req.file? "files" + "/" + req.file.filename :"",
  });
  const response = await mongoService.create();
  res.status(response.status).json(response);
};

export const login = async (req, res) => {
  const mongoService = new MongoServices(UserModel, req.body);
  const response = await mongoService.auth();
  res.status(response.status).json(response);
};

export const accessToken = async (req, res) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing authorization header" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, environments.refreshKey);
    if (decoded) {
      var accessToken = jwt.sign(
        { id: decoded.id, role: decoded.role },
        environments.secretKey,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token: accessToken });
    }
  } catch (error) {
    return res.status(401).json({ message: "Session expired ! login Again" });
  }
};
