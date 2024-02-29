import axios from "axios";

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: "https://unity-spark-server.onrender.com",
  });
  return axiosPublic;
};

export default useAxiosPublic;
