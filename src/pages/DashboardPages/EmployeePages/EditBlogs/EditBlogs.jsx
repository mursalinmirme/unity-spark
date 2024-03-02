import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { BsUpload } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { useContext, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useUserInfo from "../../../../hooks/useUserInfo";
import axios from "axios";
import JoditEditor from "jodit-react";
import "../EmployeeHome/AddBlogs/addBlogs.css";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;

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
      <h1 className="text-3xl  font-bold mb-5">Update Blog</h1>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex gap-3">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-lg">Blog Title</span>
            </label>
            <input
              {...register("title")}
              type="text"
              placeholder="Blog title..."
              className="input input-bordered"
              defaultValue={SingleEvent?.title}
            />
            {/* {errors.title && <p className="text-red-500">title is required.</p>} */}
          </div>
          <div className="form-control w-full">
            <label className="label mb-1.5">
              <span className="label-text font-bold text-lg">Add photo</span>
            </label>
            <label className="w-full" htmlFor="user_photo">
              <div className="bg-primary rounded-md mt-1 py-[15px] text-white font-inter font-medium flex items-center justify-center gap-2 cursor-pointer">
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
        <div className="form-control pt-2">
          <label className="label">
            <span className="label-text font-bold text-lg">Description</span>
          </label>
          <JoditEditor
            className="h-[500px]"
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
          {errors.description && (
            <p className="text-red-500">Description is required.</p>
          )}
        </div>
        <div className="pt-4">
          <input
            className="w-32 h-12 bg-primary text-white cursor-pointer font-semibold"
            type="submit"
            value="Update"
          />
        </div>
      </form>
    </div>
  );
};

export default EditBlogs;
