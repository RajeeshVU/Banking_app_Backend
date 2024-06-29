import { errorResponseHandler } from "../shared/responseHandler/responseHandler.js";

export const errorHandler = (error, req, res, next) => {
  errorResponseHandler(error);
};
