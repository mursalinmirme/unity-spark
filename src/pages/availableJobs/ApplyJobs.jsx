import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import download_icon from "../../assets/images/download-Icon.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const ApplyJobs = () => {
  const [users, setUsers] = useState(null);
  const { user } = useContext(AuthContext);
  // User Data Get
  useEffect(() => {
    axios.get(`http://localhost:5000/users/${user?.email}`).then((res) => {
      setUsers(res?.data);
    });
  }, [user?.email, setUsers]);
  const { id } = useParams();

  console.log(users);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <div className="grid md:grid-cols-2 gap-2">
          {/* name field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter"> Your Name :</span>
            </div>
            <input
              type="text"
              {...register("name")}
              placeholder="Please Your Name"
              defaultValue={users?.name}
            />
          </label>
          {/* Name field End */}

          {/*image field */}
          <label className="relative">
            <div className="label mb-10 md:mb-0 lg:mb-0">
              <span className="font-bold font-inter"> Your Photo : </span>
              <label
                className="font-semibold w-full absolute bottom-0    text-white cursor-pointer font-inter text-base px-8 py-[8px] bg-primary rounded-xl transition-all duration-500 text-[15px]"
                htmlFor="user_photo">
                <div className="flex justify-center gap-2">
                  {" "}
                  <img src={download_icon} alt="" /> <span> Upload Photo</span>{" "}
                </div>
              </label>
            </div>
            <input
              className="hidden"
              id="user_photo"
              type="file"
              {...register("image")}
              placeholder="N/A"
            />
          </label>
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          {/* Email field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter"> Your Email :</span>
            </div>
            <input
              type="email"
              {...register("email")}
              placeholder="Your Email"
              readOnly
              defaultValue={users?.email}
            />
          </label>
          {/* email field End */}

          {/* phone Number*/}
          <label>
            <div className="label">
              <span className="font-bold font-inter">Phone :</span>
            </div>
            <input
              type="number"
              {...register("phone")}
              placeholder="Your Phone Number"
              defaultValue={users?.phone}
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          {/* Current Address field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">
                {" "}
                Your Current Address:
              </span>
            </div>
            <input
              type="address"
              {...register("current")}
              placeholder="Your Current Address"
              defaultValue={users?.current_address}
            />
          </label>
          {/* Current Address field End */}

          {/* Permanent Address */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">Permanent Address</span>
            </div>
            <input
              type="address"
              {...register("permanent")}
              placeholder=" Your Permanent Address"
              defaultValue={users?.permanent_address}
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          {/* Age field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter"> Your Age</span>
            </div>
            <input
              className=""
              type="age"
              {...register("age")}
              placeholder="Your Age"
              defaultValue={users?.age}
            />
          </label>
          {/* Age field End */}

          {/* Your Gender Select */}
          <label>
            <div className="label">
              <span className="font-bold font-inter"> Your Gender :</span>
            </div>
            <select
              defaultValue="default"
              className="select select-bordered w-full"
              {...register("gender", {
                required: true,
              })}>
              <option disabled value="default">
                Your Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
      </form>
    </div>
  );
};

export default ApplyJobs;
