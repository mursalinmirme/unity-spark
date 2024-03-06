import axios from "axios";
import { useContext } from "react";
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { loginOut } = useContext(AuthContext);
  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_server_api_url,
  });

  axiosSecure.interceptors.request.use(
    function (config) {
      // getting the token first
      const token = localStorage.getItem("Token");
      // configuring
      config.headers.authorized = `Token ${token}`;
      return config;
    },
    function (error) {
      // sending error when req is error
      return Promise.reject(error);
    }
  );

  //  intercepts 401 & 403

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      console.log("axiosSecure Page Error under 401 & 403", error);
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        await loginOut();
        toast.error("You are logged out!");
        navigate("/signin");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;

// (response) => {
//   return response;
// },
// (error) => {
//   if (error.response.status === 401 || error.response.status === 403) {
//     axiosSecure.post("/logout").then(() => {
//       loginOut();
//       toast.error("You are logged out!");
//       navigate("/signin");
//     });
//   }
// }
