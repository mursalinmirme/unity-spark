import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { BsUpload } from "react-icons/bs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import useUserInfo from "../../../../hooks/useUserInfo";
import axios from "axios";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;

const EditBlogs = () => {
    const {user} = useContext(AuthContext)
    const [users] = useUserInfo();
    console.log(user)
    const {id} = useParams()
    console.log(id)
    const axiosPublic = useAxiosPublic()
    const {data: SingleEvent = []} = useQuery({
        queryKey:["SingleEvent"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blogs/${id}`)
            return res?.data
        }
    })
    console.log(SingleEvent)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

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
            title: data?.title,
            image: res?.data?.data?.display_url,
            description: data?.description,
            bloggerEmail: user?.email,
            bloggerInfo: users?._id,
          };
          console.log(newInfo);
         axiosPublic.put(`/blogs/${id}` , newInfo)
         .then(res => {
            if(res?.data?.modifiedCount > 0){
                toast.success("Blog Updated Successfully")
                reset()
            }
         })
         .catch(error => {
            console.log(error.message)
            toast.error(error.message)
         })
        }
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
                {...register("title", { required: true })}
                type="text"
                placeholder="Blog title..."
                className="input input-bordered"
                defaultValue={SingleEvent?.title}
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
              rows={7}
              placeholder="Description..."
              className="textarea textarea-bordered text-base p-2"
              defaultValue={SingleEvent?.description}
            ></textarea>
            {errors.description && (
              <p className="text-red-500">description is required.</p>
            )}
          </div>
          <input
            className="w-32 bg-primary text-white cursor-pointer font-semibold"
            type="submit"
            value="Update"
          />
        </form>
      </div>
    );
};

export default EditBlogs;