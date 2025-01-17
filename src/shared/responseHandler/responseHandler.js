export const responseHandler = (data, type) => {
  return {
    data: data,
    message: `${type} Successful!`,
    status: 200,
    success: true,
  };
};

export const errorResponseHandler = (error,status) => {
  if (error.errorResponse) {
    return {
      data: [],
      message: error.errorResponse.errmsg,
      status: 409 ,
      success: false,
    };
  }

  return {
    data: [],
    message: `${error}!`,
    status:status || error?.status || 500,
    success: false,
  };
};
