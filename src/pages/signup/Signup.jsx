import signupSVG from '../../assets/SignUp/undraw_logic_re_nyb4.svg'
import { useForm } from "react-hook-form"
import { FaGoogle } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Signup = () => {
    const { register, handleSubmit } = useForm()
const onSubmit = (data) => {console.log("form data",data)}
    return (
        <div className='p-5'>
            <section className='flex-row lg:flex justify-evenly items-center space-y-3 lg:space-y-0'>
                {/* images */}
                <div>
                <img src={signupSVG} alt="signupsvg" />
                </div>
              {/* images */}
                {/* form */}
                <div className='border p-5 rounded-lg'>
            <form onSubmit={handleSubmit(onSubmit)}>
          <span className='text-center space-y-3'>
            <h1 className='text-2xl  font-semibold'>Sign Up</h1>
            <p className='font-light text-gray-500 text-sm'>Create Your Account</p>
          </span>
       {/* name field */}
       <label className="form-control w-full max-w-xs mx-auto">
        <div className="label">
            <span className="label-text">What is your name?</span>
        </div>
        <input type="text"  {...register("name")} placeholder="John Doe" className="input input-bordered w-full max-w-xs" required/>
       
        </label>
       {/* name field */}
       {/* email field */}
       <label className="form-control w-full max-w-xs mx-auto">
        <div className="label">
            <span className="label-text">What is your email?</span>
        </div>
        <input type="email"  {...register("email")} placeholder="johndoe@gmail.com" className="input input-bordered w-full max-w-xs" required/>
       
        </label>
       {/* email field */}
       {/*image field */}
       <label className="form-control w-full max-w-xs mx-auto">
        <div className="label">
            <span className="label-text">Upload your image link</span>
        </div>
        <input type="url"  {...register("img")} placeholder='https://image.one' className="input input-bordered w-full max-w-xs" required/>
       
        </label>
        {/* image field */}
        {/* password field */}
        <label className="form-control w-full max-w-xs mx-auto">
        <div className="label">
            <span className="label-text">Type your password</span>
        </div>
        <input type="url"  {...register("pass")} placeholder='************' className="input input-bordered w-full max-w-xs" required/>
       
        </label>
        {/* password field */}
         <div className='flex justify-center py-3'>
         <button type='submit' className='text-white bg-[#248479] px-3 py-1.5 rounded-md w-full max-w-xs hover:bg-[#67b99a]'>Sign Up</button>
         </div>
            </form>
            <h1 className='text-center text-gray-700 font-medium'>Or</h1>
           <div className='flex justify-center'> <button className='border border-green-400 px-3 py-1.5 rounded-md w-full max-w-xs flex items-center justify-center gap-2 text-sm'><span><FaGoogle></FaGoogle></span> Sign Up With Google</button></div>
           <div className='text-center py-3'>
            <p className='text-sm text-gray-700 font-medium'>Already Have an account? <Link to="/signin" className='text-[#248479]'>Sign In</Link></p>
           </div>
                </div>
             {/* form */}
            </section>
        </div>
    );
};

export default Signup;