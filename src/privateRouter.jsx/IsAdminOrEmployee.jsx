import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import Loading from "../pages/components/Loading/Loading";

const IsAdminOrEmployee = ({children}) => {
    const [isUser, isLoading] = useUserRole();
    if(isLoading){
        return <Loading></Loading>
    }
    if(isUser?.role  === "admin" || isUser?.role === 'employee'){
        return children
    }
    return <Navigate to={'/'}></Navigate>
};

export default IsAdminOrEmployee;