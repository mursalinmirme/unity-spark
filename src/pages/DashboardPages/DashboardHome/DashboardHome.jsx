import { Navigate } from "react-router-dom";
import useUserRole from "../../../hooks/useUserRole";

const DashboardHome = () => {
  const [isUser] = useUserRole();
  if (isUser?.role === "admin") {
    return <Navigate to={"/dashboard/userProfile"}></Navigate>;
  }
  if (isUser?.role === "user") {
    return <Navigate to={"/dashboard/userProfile"}></Navigate>;
  }
  if (isUser?.role === "employee") {
    return <Navigate to={"/dashboard/employee-profile"}></Navigate>;
  }
};

export default DashboardHome;
