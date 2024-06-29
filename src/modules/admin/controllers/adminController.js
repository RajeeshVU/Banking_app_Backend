import MongoServices from "../../../shared/genericService/genericService.js";
import UserModel from "../../../models/user/userEntity.js";
import accountModel from "../../../models/account/account.js";
import { randomNumber } from "../../../utils/numberGenerator/random.js";


export const updateUser = async (req, res) => {
  const mongoService = new MongoServices(UserModel, {
    ...req.body,
    photo: "files" + "/" + req.file.filename,
  });
  const response = await mongoService.updateById(req.params.id);
  res.status(response.status).json(response);
};

export const createUser = async (req, res) => {
  const mongoService = new MongoServices(UserModel, {
    ...req.body,
    photo:req.file? "files" + "/" + req.file.filename :"",
  });
  const response = await mongoService.create();
  res.status(response.status).json(response);
};

export const createAccount = async (req, res) => {
  const mongoService = new MongoServices(accountModel, {
    ...req.body,
    photo:req.file? "files" + "/" + req.file.filename :"",
    pin: randomNumber(),
  });
  const response = await mongoService.create();
  res.status(response.status).json(response);
};

export const updateAccount = async (req, res) => {
  const mongoService = new MongoServices(accountModel, {
    ...req.body,
    photo:req.file? "files" + "/" + req.file.filename :"",
  });
  const response = await mongoService.updateById(req.params.id);
  res.status(response.status).json(response);
};
