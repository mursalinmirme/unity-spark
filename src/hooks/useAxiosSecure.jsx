import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
  const { loginOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "https://unity-spark-server.vercel.app",
    withCredentials: true,
  });
  axiosSecure.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const status = err.response.status;
      console.log(status);
      if (status === 401 || status === 403) {
        await loginOut();
        navigate("/signin");
      }
      return Promise.reject(err);
    }
  );
};

export default useAxiosSecure;
