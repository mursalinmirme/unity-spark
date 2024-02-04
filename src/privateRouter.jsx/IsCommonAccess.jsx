import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const IsCommonAccess = ({children}) => {
    const [isUser] = useUserRole();
    if(isUser?.role  === "employee" || isUser?.role === "admin" || isUser?.role === "user"){
        return children
    }
    return <Navigate to={'/'}></Navigate>
};

export default IsCommonAccess;