import { Link } from 'react-router-dom'
import blogImg1 from '../../assets/images/blog_page/1.jpg'

const BlogsBanner = ({blog}) => {
    const {title} = blog || {}
    
    const bannerBlogStyle = {
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${blogImg1})`,
        backgroundSize: 'cover'
    }

    return (
        <Link to={`/blog/${blog?._id}`}>
            <div style={bannerBlogStyle} className='h-[400px] rounded-xl flex flex-col gap-3 justify-end p-5'>
                <h5 className='text-gray-300'>posted 1min ago</h5>
                <h2 className='text-white text-2xl font-medium font-inter'>{title} </h2>
            </div>
        </Link>
    );
};

export default BlogsBanner;