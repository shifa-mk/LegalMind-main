import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://legalmind-backend-83kj.onrender.com",
  withCredentials: true,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

const persistedToken = localStorage.getItem("token");
if (persistedToken) {
  setAuthToken(persistedToken);
}

export default api;
