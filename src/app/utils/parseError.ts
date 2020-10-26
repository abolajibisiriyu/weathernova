import { AxiosError } from "axios";

const parseError = (error: AxiosError) => {
  let errorMessage;
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage = error.response.data;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // errorMessage = error.request;
    errorMessage = "An Error Ocurred, Please Try Again.";
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = error.message;
  }
  if (error.response?.status === 500) {
    errorMessage = "An Error Ocurred, Please Try Again.";
  }
  return errorMessage;
};

export default parseError;
