import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router-dom';
import Loading from '../pages/components/Loading/Loading';

const IsAdmin = ({children}) => {
    const [isUser, isLoading] = useUserRole();
    if(isLoading){
        return <Loading></Loading>
    }
    if(isUser?.role  === "admin"){
        return children
    }
    return <Navigate to={'/'}></Navigate>
};

export default IsAdmin;