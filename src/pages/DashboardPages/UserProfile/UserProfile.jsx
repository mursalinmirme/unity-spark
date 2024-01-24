import "../../DashboardPages/EmployeePages/MyProfile/profile.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit3 } from "react-icons/fi";
import download_icon from "../../../assets/images/download-Icon.png";
import counter_icon from "../../../assets/images/pen.png";
const UserProfile = () => {
  const [openEditor, setOpenEditor] = useState(false);
  const { register, handleSubmit } = useForm();
  const [count, setCount] = useState(0);

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="user_profile_container">
        <img src="https://i.ibb.co/vcBNZ2H/founder-1.jpg" alt="profile" />
        <div className="flex justify-between w-full">
          <div>
            <h2>John Doe</h2>
            <h3>johndoetheheroalom@gmail.com</h3>
          </div>
          <div className="flex gap-3 items-center relative">
            <div className="border-2 border-primary rounded-lg p-1">
              <img
                style={{ height: "18px", width: "18px" }}
                src={counter_icon}
                alt=""
              />
              <span className="bg-primary  w-5 h-5 absolute top-1 md:right-[112px] text-white flex items-center justify-center rounded-lg">
                0
              </span>
            </div>

            <a className="edit_btn" onClick={() => setOpenEditor(true)}>
              <span>Edit Info</span>
              <FiEdit3 />
            </a>
          </div>
        </div>
      </div>

      <h1 className="border-t border-gray-500 mt-5"></h1>
      <div className="mt-5">
        <div className="flex justify-between items-center mb-1.5 ">
          <h2 className="text-[22px] font-bold font-inter">
            Completed You Profile
          </h2>
          <h2> {count.toFixed(2)}% </h2>
        </div>
        <ProgressBar
          completed={count}
          bgColor="#433ebe"
          height="15px"
          baseBgColor="#e3e2f5"
          labelColor="#ffffff"
          labelSize="0px"
          maxCompleted={100}
          animateOnRender
        />
      </div>

      {/** Input Form Area  */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-2">
          {/* Email field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">Email :</span>
            </div>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Your Email"
              required
              onBlur={(e) =>
                e.target.value.length >= 1
                  ? setCount(count + 8.3333333333333)
                  : setCount(count - 8.3333333333333)
              }
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
              {...register("number", { required: true })}
              placeholder="Your Phone Number"
              required
              onBlur={(e) =>
                e.target.value.length >= 1
                  ? setCount(count + 8.3333333333333)
                  : setCount(count - 8.3333333333333)
              }
            />
          </label>
        </div>

        {/**Second Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Current Address field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">Current Address:</span>
            </div>
            <input
              type="address"
              {...register("current", { required: true })}
              placeholder=" Your Current Address "
              required
              onBlur={(e) =>
                e.target.value.length >= 1
                  ? setCount(count + 8.3333333333333)
                  : setCount(count - 8.3333333333333)
              }
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
              {...register("permanent", { required: true })}
              placeholder=" Your Permanent Address"
              required
              onBlur={(e) =>
                e.target.value.length >= 1
                  ? setCount(count + 8.3333333333333)
                  : setCount(count - 8.3333333333333)
              }
            />
          </label>
        </div>

        {/**Three Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Age field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">Age</span>
            </div>
            <input
              type="age"
              {...register("age", { required: true })}
              placeholder="Your Age"
              required
              onBlur={(e) =>
                e.target.value.length >= 1
                  ? setCount(count + 8.3333333333333)
                  : setCount(count - 8.3333333333333)
              }
            />
          </label>
          {/* Age field End */}

          {/* Your Gender Select */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">Gender :</span>
            </div>
            <input
              type="text"
              {...register("gender", { required: true })}
              placeholder="Male"
              required
              onBlur={(e) =>
                e.target.value.length >= 1
                  ? setCount(count + 8.3333333333333)
                  : setCount(count - 8.3333333333333)
              }
            />
          </label>
        </div>

        {/**Four Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* name field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">Education Level :</span>
            </div>
            <input
              type="text"
              {...register("eduction", { required: true })}
              placeholder="N/A"
              required
              onBlur={(e) =>
                e.target.value.length >= 1
                  ? setCount(count + 8.3333333333333)
                  : setCount(count - 8.3333333333333)
              }
            />
          </label>
          {/* Education field End */}

          {/* Institute Name field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">Institute Name :</span>
            </div>
            <input
              type="text"
              {...register("institute", { required: true })}
              placeholder="N/A"
              required
              onBlur={(e) =>
                e.target.value.length >= 1
                  ? setCount(count + 8.3333333333333)
                  : setCount(count - 8.3333333333333)
              }
            />
          </label>
        </div>

        {/**five Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Job Preference field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">Job Preference :</span>
            </div>
            <input
              type="text"
              {...register("preference", { required: true })}
              placeholder="Remote"
              required
              onBlur={(e) =>
                e.target.value.length >= 1
                  ? setCount(count + 8.3333333333333)
                  : setCount(count - 8.3333333333333)
              }
            />
          </label>
          {/* Preference field End */}

          {/* Time Preference field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">Time Preference</span>
            </div>
            <input
              type="text"
              {...register("time_preference", { required: true })}
              placeholder="Intern"
              required
              onBlur={(e) =>
                e.target.value.length >= 1
                  ? setCount(count + 8.3333333333333)
                  : setCount(count - 8.3333333333333)
              }
            />
          </label>
        </div>

        {/**Six Two Part */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Skills field */}
          <label>
            <div className="label">
              <span className="font-bold font-inter">Skills :</span>
            </div>
            <input
              type="text"
              {...register("skills", { required: true })}
              placeholder="Your Skills Write Now"
              required
              onBlur={(e) =>
                e.target.value.length >= 1
                  ? setCount(count + 8.3333333333333)
                  : setCount(count - 8.3333333333333)
              }
            />
          </label>
          {/* Skills field End */}

          {/* Resume field */}
          <label className="relative">
            <div className="label">
              <span className="font-bold font-inter">Resume : </span>
              <label
                className="font-semibold absolute bottom-0 text-white cursor-pointer font-inter text-base px-8   sm:py-[4px] md:py-[8px] bg-primary rounded-xl transition-all duration-500 text-[15px]"
                htmlFor="user_Resume"
              >
                <div className="flex justify-center gap-2">
                  {" "}
                  <img src={download_icon} alt="" /> <span> Upload Resume</span>{" "}
                </div>
              </label>
            </div>
            <input
              className="hidden"
              id="user_Resume"
              type="file"
              {...register("resume", { required: true })}
              placeholder="N/A"
              required
              onChange={(e) =>
                e.target.files.length === 1 && setCount(count + 8.3333333333333)
              }
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
