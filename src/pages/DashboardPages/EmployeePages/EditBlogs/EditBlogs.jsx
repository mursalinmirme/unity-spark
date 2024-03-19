import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import JoditEditor from "jodit-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BsUpload } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUserInfo from "../../../../hooks/useUserInfo";
import { SlCloudUpload } from "react-icons/sl";
import "../EmployeeHome/AddBlogs/addBlogs.css";
const image_Hosting_Api = import.meta.env.VITE_image_Hosting_Api;
import "./blogs.css";
const EditBlogs = () => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [users] = useUserInfo();
  // console.log(user)
  const { id } = useParams();
  // console.log(id)
  const axiosPublic = useAxiosPublic();
  const { data: SingleEvent, refetch } = useQuery({
    queryKey: ["SingleEvent"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogs/${id}`);
      setContent(res.data?.description);
      return res?.data;
    },
  });
  console.log(SingleEvent);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    let newImage = SingleEvent?.image;
    if (data.photo.length !== 0) {
      const imageFile = { image: data.photo[0] };
      const res = await axios.post(image_Hosting_Api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      newImage = res?.data?.data?.display_url;
    }

    const newInfo = {
      title: data?.title || SingleEvent?.title,
      image: newImage || SingleEvent?.image,
      description: content,
      bloggerEmail: user?.email,
      bloggerInfo: users?._id,
    };

    axiosPublic
      .put(`/blogs/${id}`, newInfo)
      .then((res) => {
        if (res?.data?.modifiedCount > 0) {
          toast.success("Blog Updated Successfully");
          reset();
          refetch();
        } else {
          toast.error("Up to date");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold font-inter mb-5">Update Blog</h1>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex gap-3 space-y-3 md:space-y-0">
          <div className="form-control w-full">
            <label>
              <span className="blogs_input_title">Blog Title</span>
            </label>
            <input
              {...register("title")}
              type="text"
              placeholder="Blog title..."
              className="blogs_input"
              defaultValue={SingleEvent?.title}
            />
            {/* {errors.title && <p className="text-red-500">title is required.</p>} */}
          </div>
          <div className="form-control w-full">
            <label>
              <span className="blogs_input_title">Add photo</span>
            </label>
            <label className="w-full" htmlFor="user_photo">
              <div className="bg-primary rounded-md mt-1 py-2.5 text-white font-inter font-medium flex items-center justify-center gap-2 cursor-pointer text-sm">
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
          <label>
            <span className="blogs_input_title">Description</span>
          </label>
          <JoditEditor
            className="h-[500px] mt-2"
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
          {errors.description && (
            <p className="text-red-500">Description is required.</p>
          )}
        </div>
        <div className="pt-4">
          <input className="nbtn-fixed-bg w-32" type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
};

export default EditBlogs;
