import { BsUpload } from "react-icons/bs";
import axios from "axios";
import { useForm } from "react-hook-form";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;

const EmployeeProfileEdit = () => {
    const { register, handleSubmit} = useForm();

    const onSubmit = async(data) => {
        console.log('hello');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label>Your Name</label>
              <input 
              type="text"
              {...register("name", { required: true })} 
              placeholder="Enter your name..." />
            </div>
            <div>
              <span className="block font-inter font-semibold">Your Photo</span>
              <label className="w-full" htmlFor="user_photo">
                <div className="bg-primary mt-2 rounded-md py-[7px] text-white font-inter font-medium flex items-center justify-center gap-2">
                  < BsUpload />
                  <span> Upload Your Photo</span>{" "}
                </div>
              </label>
              <input 
                {...register("photo", { required: true })}
                className="hidden" 
                type="file" 
                id="user_photo" />
            </div>
          </div>
          <div className="mt-3">
            <label>Your Email</label>
            <input             
            {...register("email", { required: true })}
            type="text" 
            placeholder="Enter your email..." />
          </div>
          <div className="mt-4">
            <button className="bg-primary text-white font-inter font-medium px-5 py-2 rounded-md cursor-pointer inline">Update</button>
          </div>
        </form>
    );
};

export default EmployeeProfileEdit;