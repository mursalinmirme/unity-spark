import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "../pages/components/Loading/Loading";

const PrivateRouter = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    if(loading){
        return <Loading></Loading>
    }
    if(user?.email){
        return children
    }
    return <Navigate to={"/signin"}></Navigate>
};

export default PrivateRouter;