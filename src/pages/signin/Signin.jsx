/* eslint-disable react/no-unescaped-entities */
import signupSVG from '../../assets/SignIn/undraw_secure_login_pdn4.svg'
import { useForm } from "react-hook-form"
import { FaGoogle } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Signin = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {console.log("form data",data)}
    return (
        <div className='p-5'>
            <section className='flex-row lg:flex justify-evenly items-center space-y-3 lg:space-y-0'>
             
                {/* form */}
                <div className='border p-5 rounded-lg'>
            <form onSubmit={handleSubmit(onSubmit)}>
          <span className='text-center space-y-3'>
            <h1 className='text-2xl  font-semibold'>Welcome Back </h1>
            <p className='font-light text-gray-500 text-sm'>Enter Your Credentials to Sign In </p>
          </span>
      
       {/* email field */}
       <label className="form-control w-full max-w-xs mx-auto">
        <div className="label">
            <span className="label-text">Your Email</span>
        </div>
        <input type="email"  {...register("email")} placeholder="johndoe@gmail.com" className="input input-bordered w-full max-w-xs" required/>
       
        </label>
       {/* email field */}
       
        {/* password field */}
        <label className="form-control w-full max-w-xs mx-auto">
        <div className="label">
            <span className="label-text">Your password</span>
        </div>
        <input type="url"  {...register("pass")} placeholder='************' className="input input-bordered w-full max-w-xs" required/>
       
        </label>
        {/* password field */}
         <div className='flex justify-center py-3'>
         <button type='submit' className='text-white bg-[#248479] px-3 py-1.5 rounded-md w-full max-w-xs hover:bg-[#67b99a]'>Sign In</button>
         </div>
            </form>
            <h1 className='text-center text-gray-700 font-medium'>Or</h1>
           <div className='flex justify-center'> <button className='border border-green-400 px-3 py-1.5 rounded-md w-full max-w-xs flex items-center justify-center gap-2 text-sm'><span><FaGoogle></FaGoogle></span> Sign Up With Google</button></div>
           <div className='text-center py-3'>
            <p className='text-sm text-gray-700 font-medium'>Don't an account? <Link to="/signup" className='text-[#248479]'>Sign Up</Link></p>
           </div>
                </div>
             {/* form */}
                {/* images */}
                <div>
                <img src={signupSVG} alt="signupsvg" />
                </div>
              {/* images */}
            </section>
        </div>
    );
};

export default Signin;