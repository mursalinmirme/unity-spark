import { Link } from 'react-router-dom';
import errorImage from '../../assets/images/404.jpg'

const Error = () => {
    return (
        <div className='error'>
            <img src={errorImage} />
            <div className='text-center'>
                <Link to="/">
                    <button className="button">Back to Home</button>     
                </Link>           
            </div>
        </div>
    );
};

export default Error;