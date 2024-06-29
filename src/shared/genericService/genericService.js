import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  errorResponseHandler,
  responseHandler,
} from "../responseHandler/responseHandler.js";
import environments from "../../config/environments/environments.js";
export default class MongoServices {
  constructor(model, data) {
    this.model = model;
    this.data = data;
  }

  async create() {
    try {
      const response = await this.model.create(this.data);
      return responseHandler(response, "Data added");
    } catch (error) {
      return errorResponseHandler(error);
    }
  }

  async findOne(field, value) {
    try {
      const response = await this.model.findOne(
        { [field]: value, status: true },
        { createdAt: 0, updatedAt: 0, __v: 0, status: 0 }
      );
      if (!response) {
        return errorResponseHandler("No data Found", 404);
      }
      return responseHandler(response, "Data");
    } catch (error) {
      return errorResponseHandler(error);
    }
  }
  async find(id) {
    try {
      const response = await this.model.findById(id);
      if (!response) {
        return errorResponseHandler("No data Found", 404);
      }
      return responseHandler(response, "Data");
    } catch (error) {
      return errorResponseHandler(error);
    }
  }

  async updateById(id,data) {
    try {
      const updateData=data?data:this.data

      const response = await this.model.findByIdAndUpdate(id,updateData, {
        new: true,
      });
      if (!response) {
        return errorResponseHandler("No data found", 404);
      }
      return responseHandler([], "Data updated successfully");
    } catch (error) {
      return errorResponseHandler(error);
    }
  }

  async auth() {
    try {
      const response = await this.findOne("email", this.data.email);
      if (response.success == true) {
        const data = response.data;
        data.address = null;
        const compare = await bcrypt.compare(this.data.password, data.password);
        if (compare == true) {
          var token = jwt.sign(
            { id: data.id, role: data.role },
            environments.secretKey,
            { expiresIn: "1h" }
          );
          var refreshToken = jwt.sign(
            { id: data._id, role: data.role },
            environments.refreshKey,
            { expiresIn: "12h" }
          );
          return responseHandler(
            { ...data._doc, token: token, refreshToken: refreshToken },
            "Login"
          );
        }
        return errorResponseHandler("Login failed", 401);
      }
      return errorResponseHandler("Login failed", 401);
    } catch (error) {
      return errorResponseHandler(error);
    }
  }
}
