import axios from "axios";

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: "https://unity-spark-server.vercel.app",
    withCredentials: true
  });
  return axiosPublic;
};

export default useAxiosPublic;
