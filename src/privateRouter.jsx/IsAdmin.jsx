import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router-dom';

const IsAdmin = ({children}) => {
    const [isUser] = useUserRole();
    if(isUser?.role  === "admin"){
        return children
    }
    return <Navigate to={'/'}></Navigate>
};

export default IsAdmin;