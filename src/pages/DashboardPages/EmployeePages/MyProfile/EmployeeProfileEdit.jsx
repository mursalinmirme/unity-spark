import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { BsUpload } from "react-icons/bs";
import { toast } from "sonner";
import auth from "../../../../firebase/firebase.config";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
const image_Hosting_Api = import.meta.env.VITE_image_Hosting_Api;

const EmployeeProfileEdit = ({ user, setOpenEditor }) => {
  const PublicAxios = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const { name, email, image, _id } = user || {};

  const onSubmit = async (data) => {
    const imageFile = { image: data.photo[0] };
    if (imageFile[0] === undefined) {
      const newInfo = {
        name: data.name,
        image: image,
        email: data.email,
      };
      updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: image,
      });
      PublicAxios.put(`/users/${_id}`, newInfo).then(() => {
        toast.success("Your Info updated");
        setOpenEditor(false);
      });
    } else {
      const res = await PublicAxios.post(image_Hosting_Api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        const newInfo = {
          name: data.name,
          image: res.data.data.display_url,
          email: data.email,
        };
        updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: res.data.data.display_url,
        });
        PublicAxios.put(`/users/${_id}`, newInfo).then(() => {
          toast.success("Your Info updated");
          setOpenEditor(false);
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label>Your Name</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Enter your name..."
            defaultValue={name}
          />
        </div>
        <div>
          <span className="block font-inter font-semibold">Your Photo</span>
          <label className="w-full" htmlFor="user_photo">
            <div className="bg-primary mt-2 rounded-md py-[7px] text-white font-inter font-medium flex items-center justify-center gap-2 cursor-pointer">
              <BsUpload />
              <span> Upload Your Photo</span>{" "}
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
      <div className="mt-3">
        <label>Your Email</label>
        <input
          {...register("email")}
          type="text"
          placeholder="Enter your email..."
          defaultValue={email}
        />
      </div>
      <input
        type="number"
        {...register("number", { required: true })}
        placeholder="Your Phone Number"
        required
      />
    </form>
  );
};

export default EmployeeProfileEdit;
