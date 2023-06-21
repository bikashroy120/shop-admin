import axios from "axios";
import { setupInterceptorsTo } from "./interceptor";

 const base_url = "http://localhost:5000/api";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const Axios = setupInterceptorsTo(
    axios.create({
      baseURL: base_url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
            getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
          }`
      },
    }),
  );
  
  const AxiosM = setupInterceptorsTo(
    axios.create({
      baseURL: base_url,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  );

  export { Axios,AxiosM };