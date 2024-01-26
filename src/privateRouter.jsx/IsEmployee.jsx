import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const IsEmployee = ({children}) => {
    const [isUser] = useUserRole();
    if(isUser?.role  === "employee"){
        return children
    }
    return <Navigate to={'/'}></Navigate>
};

export default IsEmployee;