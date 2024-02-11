import axios from "axios";
import { useForm } from "react-hook-form";
import { BsUpload } from "react-icons/bs";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;

const AddNewCourse = () => {
    const { register, handleSubmit ,  formState: { errors },} = useForm()
const onSubmit = async (data) => {
    
    const imageFile = { image: data.photo[0] };
    const res = await axios.post(image_Hosting_Api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if(res.data.success){
        const courseInfo = {
            title: data?.title,
            tags: data?.tags,
            image: res?.data?.data?.display_url,
            description: data?.description,
            
          };
          console.log(courseInfo);
    }
  
}
    return (
     <div className="p-3">
            <h1 className="text-2xl font-bold my-3">Add a New Course</h1>

            {/* form  */}
            <div className="border-2 border-[#D9D9D9] p-5 rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>

            <div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-lg">Course Name</span>
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Enter Your Course Name"
              className="input input-bordered"
            />
            {errors.title && <p className="text-red-500">title is required.</p>}
          </div>
          
            </div>
            <div className="flex-row md:flex justify-center items-center gap-5">
            <div className="flex-1">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-lg">Tags</span>
            </label>
            <input
              {...register("tags", { required: true })}
              type="text"
              placeholder="Enter Tags"
              className="input input-bordered"
            />
            {errors.title && <p className="text-red-500">tags is required.</p>}
          </div>
          
            </div>
            <div className="form-control flex-1">
            <label className="label mb-1.5">
              <span className="label-text font-bold text-lg">Course Banner</span>
            </label>
            <label className="w-full" htmlFor="user_photo">
              <div className="bg-primary rounded-md py-[11px] text-white font-inter font-medium flex items-center justify-center gap-2 cursor-pointer">
                <BsUpload />
                <span> Upload Photo</span>{" "}
              </div>
            </label>
            <input
              {...register("photo")}
              className="hidden"
              type="file"
              id="user_photo"
            />
          </div>
      
            </div>
            <div className="form-control">
          <label className="label">
            <span className="label-text font-bold text-lg">Description</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            rows={6}
            placeholder="Write About Your Course"
            className="textarea textarea-bordered text-base"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">description is required.</p>
          )}
        </div>

        <button className="px-3.5 md:px-6 py-2 md:py-3 bg-[#433EBE] text-white text-xl font-semibold mt-4 rounded-xl" type="submit">
                Publish
        </button>
    </form>
            </div>
            {/* form  */}
        </div>
    );
};

export default AddNewCourse;