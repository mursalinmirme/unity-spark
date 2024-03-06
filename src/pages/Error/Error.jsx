import { Link } from 'react-router-dom';
import errorImage from '../../assets/images/404.gif'

const Error = () => {
    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <div className='error'>
            <img src={errorImage} />
            <div className='text-center'>
                <Link to="/">
                    <button className="nbtn">Back to Home</button>     
                </Link>           
            </div>
        </div>
        </div>
    );
};

export default Error;