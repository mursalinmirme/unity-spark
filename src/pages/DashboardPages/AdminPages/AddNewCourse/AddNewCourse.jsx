import axios from "axios";
import { Controller,useForm } from "react-hook-form";
import { BsUpload } from "react-icons/bs";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;
import Select from "react-select"
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
const AddNewCourse = () => {
  const axiosPublic = useAxiosPublic()
    const { control,register, handleSubmit ,  formState: { errors },reset} = useForm()
    const skillsArray = [
      { value: "Programming", label: "Programming" },
      { value: "UI/UI Design", label: "UI/UX Design" },
      { value: "Graphics Design", label: "Graphics Design" },
      { value: "SEO & SMM", label: "SEO & SMM" },
      { value: "Video Editing", label: "Video Editing" },
      { value: "Content Writing", label: "Content Writing" },
      
    ];
const onSubmit = async (data) => {
  let skillsArray = [];
  data?.skills?.map((skill) => {
    skillsArray.push(skill.label);
  });
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
            short_Description: data?.short_Description,
            description: data?.description,
            category: skillsArray,
            instructor_name: data?.instructor_name,
            intro: data?.intro,
            instructor_bio: data?.instructor_bio
            
          };
          console.log(courseInfo);

          axiosPublic.post("/courses", courseInfo)
          .then(res =>{
          if(res?.data){
            toast.success("Course Added")
            reset()
          }

          })
          .catch(error => {
            console.log(error.message);
            toast.error(error.message)
          })
    }
  
}
    return (
     <div className="p-3">
            <h1 className="text-2xl font-bold my-3">Add a New Course</h1>

            {/* form  */}
            <div className="border-2 border-[#D9D9D9] p-5 rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex-row md:flex justify-center items-center gap-5">
          <div className="form-control flex-1">
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
          <div className="flex-1">
            <label>
              <span className="font-inter text-[18px] font-bold">
                Course Category
              </span>
            </label>
            <Controller
              name="skills"
              rules={{ required: "Please select required skills" }}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={skillsArray}
                  isMulti
                  placeholder="Enter required skills"
                />
              )}
            />
          </div>
          {errors.skills && (
            <span className="error text-red-500">{errors.skills.message}</span>
          )}
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
            <span className="label-text font-bold text-lg">Short Description</span>
          </label>
          <textarea
            {...register("short_Description", { required: true })}
            rows={3}
            placeholder="Write About Your Course Intro"
            className="textarea textarea-bordered text-base"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">short description is required.</p>
          )}
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
       <div className="flex-row md:flex justify-center items-center gap-5">
            <div className="flex-1">
            <div className="form-control flex-1">
            <label className="label">
              <span className="label-text font-bold text-lg">Course Instructor Name</span>
            </label>
            <input
              {...register("instructor_name", { required: true })}
              type="text"
              placeholder="Enter Your Course Instructor Name"
              className="input input-bordered"
            />
            {errors.title && <p className="text-red-500">instructor Name is required.</p>}
          </div>
            </div>
            <div className="flex-1">
            <div className="form-control flex-1">
            <label className="label">
              <span className="label-text font-bold text-lg">Course Intro link</span>
            </label>
            <input
              {...register("intro", { required: true })}
              type="text"
              placeholder="Enter Your Course Intro Link"
              className="input input-bordered"
            />
            {errors.title && <p className="text-red-500">intro link  is required.</p>}
          </div>
            </div>
       </div>
       <div className="form-control">
          <label className="label">
            <span className="label-text font-bold text-lg">Instructor Bio</span>
          </label>
          <textarea
            {...register("instructor_bio", { required: true })}
            rows={3}
            placeholder="Write  Your Course Instructor Bio"
            className="textarea textarea-bordered text-base"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">short description is required.</p>
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