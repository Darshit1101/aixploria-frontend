import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Dynamically use the API URL from the .env file
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Use the token stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      console.error(
        `ERROR ${error.response.status}:`,
        error.response.data?.message || error.message
      );
    } else {
      console.error("ERROR:", error.message);
    }
    return Promise.reject(error);
  }
);

export { api };
