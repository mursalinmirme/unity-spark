import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import Loading from "../pages/components/Loading/Loading";

const IsCommonAccess = ({children}) => {
    const [isUser, isLoading] = useUserRole();
    if(isLoading){
        return <Loading></Loading>
    }
    if(isUser?.role  === "employee" || isUser?.role === "admin" || isUser?.role === "user"){
        return children
    }
    return <Navigate to={'/'}></Navigate>
};

export default IsCommonAccess;