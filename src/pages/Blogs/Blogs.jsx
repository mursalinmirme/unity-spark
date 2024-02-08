import { Link } from "react-router-dom";
import useBlogs from "../../hooks/useBlogs";
import BlogsBanner from "./BlogsBanner";

const Blogs = () => {
    const {blogs} = useBlogs()

    return (
        <div className="blogs py-10">
            <div className="grid grid-cols-1 md:hidden lg:grid-cols-3 lg:grid  gap-5">
                {
                    blogs?.map(blog => (
                        <BlogsBanner key={blog?.id} blog={blog}></BlogsBanner>
                    )).slice(0, 3)
                }
            </div>
            <div className="hidden md:grid lg:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {
                    blogs?.map(blog => (
                        <BlogsBanner key={blog?.id} blog={blog}></BlogsBanner>
                    )).slice(0, 4)
                }
            </div>
            <div className="mt-10">
                <h2 className="text-lg font-semibold">Explore All Blogs</h2>
                {
                    blogs?.map(blog => (
                        <Link key={blog?.id} to={`/blog/${blog?._id}`}>
                            <div key={blog?.id} className="border border-gray-300 p-2 mt-3 rounded-xl grid grid-cols-5 gap-5">
                                <img src={'https://i.ibb.co/nMdbFHL/founder-3.jpg'} className="max-h-44 rounded-xl w-full" alt="" />
                                <div className="col-span-4 space-y-2 py-2">
                                    <p className="font-medium text-gray-700">posted 1day ago</p>
                                    <h2 className="text-2xl font-semibold font-inter">{blog?.title}</h2>
                                    {
                                        blog?.details.map((detail, idx) => (
                                            <p key={idx} className="font-medium text-gray-600">{detail?.paragraph} 
                                                <Link to={`/blog/${blog?._id}`}> <span className="underline text-gray-700">Read More</span></Link>
                                            </p>
                                        )).slice(0, 1)
                                    }
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Blogs;