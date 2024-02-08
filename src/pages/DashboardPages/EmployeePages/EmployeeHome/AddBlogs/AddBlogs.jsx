import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;
import { BsUpload } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../../../../../Provider/AuthProvider";
import useUserInfo from "../../../../../hooks/useUserInfo";
import toast from "react-hot-toast";
import axios from "axios";

const AddBlogs = () => {
  const [users] = useUserInfo();
  console.log(users?._id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.photo[0] };
    const res = await axios.post(image_Hosting_Api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const newInfo = {
        title: data.title,
        image: res.data.data.display_url,
        description: data.description,
        bloggerEmail: user?.email,
        bloggerInfo: users?._id,
      };
      console.log(newInfo);
      axiosPublic.post("/blogs", newInfo).then(() => {
        toast.success("blog successfully added");
        reset();
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl  font-bold mb-5">Add Blog</h1>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex gap-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-lg">Blog Title</span>
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Blog title..."
              className="input input-bordered"
            />
            {errors.title && <p className="text-red-500">title is required.</p>}
          </div>
          <div className="form-control w-full">
            <label className="label mb-1.5">
              <span className="label-text font-bold text-lg">Add photo</span>
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
            rows={3}
            placeholder="Description..."
            className="textarea textarea-bordered text-base"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">description is required.</p>
          )}
        </div>
        <input
          className="w-32 bg-primary text-white cursor-pointer font-semibold"
          type="submit"
          value="Add"
        />
      </form>
    </div>
  );
};

export default AddBlogs;
