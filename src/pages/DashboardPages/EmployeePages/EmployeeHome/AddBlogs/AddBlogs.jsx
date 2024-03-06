import axios from "axios";
import JoditEditor from "jodit-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { SlCloudUpload } from "react-icons/sl";
import { toast } from "sonner";
import { AuthContext } from "../../../../../Provider/AuthProvider";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import useUserInfo from "../../../../../hooks/useUserInfo";
import "../../MyProfile/profile.css";
import "./addBlogs.css";
const image_Hosting_Api = import.meta.env.VITE_image_Hosting_Api;

const AddBlogs = () => {
  const [users] = useUserInfo();
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    setIsUploading(true);
    console.log(data);
    if (data.photo.length === 0) {
      toast.error("An image must be added");
      setIsUploading(false);
      return;
    }

    if (!content) {
      toast.error("You haven't added any content yet!");
      setIsUploading(false);
      return;
    }

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
        description: content,
        bloggerEmail: user?.email,
        bloggerInfo: users?._id,
      };
      // console.log(newInfo);
      axiosPublic.post("/blogs", newInfo).then(() => {
        toast.success("blog successfully added");
        reset();
        setContent("");
        setIsUploading(false);
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Add Blog</h1>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex gap-3">
          <div className="form-control w-full">
            <label>
              <span className="user_profile_input_title">Blog Title</span>
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Blog title..."
              className="user_profile_input"
            />
            {errors.title && <p className="text-red-500">title is required.</p>}
          </div>
          <div className="form-control w-full">
            <label>
              <span className="user_profile_input_title">Add photo</span>
            </label>
            <label
              className="font-medium w-full text-white cursor-pointer font-inter text-base px-8 py-2 bg-primary rounded-md transition-all duration-500 mt-1.5 mb-0.5"
              htmlFor="user_photo"
            >
              <div className="flex justify-center items-center gap-3">
                {" "}
                {/* <img className="w-5 h-5" src={download_icon} alt="" />{" "} */}
                <SlCloudUpload className="w-5 h-5" />
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
          <label className="mb-2.5">
            <span className="user_profile_input_title">Description</span>
          </label>
          <JoditEditor
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-32 nbtn-fixed-bg flex justify-center items-center"
          >
            {isUploading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogs;
