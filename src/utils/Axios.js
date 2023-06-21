import axios from "axios";
import { setupInterceptorsTo } from "./interceptor";

 const base_url = "http://localhost:5000/api";

const Axios = setupInterceptorsTo(
    axios.create({
      baseURL: base_url,
      headers: {
        "Content-Type": "application/json",
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