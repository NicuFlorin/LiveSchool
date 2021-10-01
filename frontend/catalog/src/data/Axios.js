import axios from "axios";
import config from "../config.json";

const axiosInstance = axios.create({
  withCredentials: true,
  timeout: 200000,
  baseURL: config.backendAddress,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (
        error.response.status === 403 &&
        error.response.config.url !== "/login" &&
        window.location.pathname !== "/login"
      ) {
        let urlAfterLogin = window.location.pathname;

        window.history.pushState({ previousUrl: urlAfterLogin });
        window.location.reload();
      }
    } else {
      console.log("!!!!" + error);
      console.log("!!!!" + error.message);
    }
    return Promise.reject(error);
  }
);

const getRequestError = (err) => {
  if (!err.response) {
    return { ok: false, message: `Internal client error: ${err.message}` };
  } else if (err.response.data.message) {
    return { ok: false, message: `${err.response.data.message}` };
  } else {
    return {
      ok: false,
      message: `Internal server error:${err.response.status}`,
    };
  }
};

export default axiosInstance;
export { getRequestError };
