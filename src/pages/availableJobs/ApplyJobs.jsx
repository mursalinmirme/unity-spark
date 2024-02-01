import { useLocation, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Select from "react-select";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ApplyJobs = () => {
  const [users, setUsers] = useState(null);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const jobTitle = location.state.title
  // console.log(jobTitle);

  // User Data Get
  useEffect(() => {
    axiosPublic.get(`/users/${user?.email}`).then((res) => {
      setUsers(res?.data);
    });
  }, [axiosPublic, user?.email]);
  const { id } = useParams();

  const skillsArray = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React.js" },
    { value: "HTML", label: "HTML" },
    { value: "Next", label: "Next.js" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "MySQL", label: "MySQL" },
    { value: "Mongoose", label: "Mongoose" },
  ];

  const { register, handleSubmit, control, reset } = useForm();

  const onSubmit = (data) => {
    // let skillsArray = [];
    // data?.skills?.map((skill) => {
    //   skillsArray.push(skill.label);
    // });
    // {
    //   skillsArray.length === 0 &&
    //     users?.skills?.map((skill) => {
    //       skillsArray.push(skill);
    //     });
    // }
    // data?.skills?.map((skill) => {
    //   skillsArray.push(skill.label);
    // });

    const userInfo = {
      job_title : jobTitle,
      name: data?.name || users?.name,
      email: user?.email,
      applied_job_id: id,
      phone: data?.number || users?.phone,
      age: data?.age || users?.age,
      gender: data?.gender || users?.gender,
      current_address: data?.current || users?.current_address,
      permanent_address: data?.permanent || users?.permanent_address,
      institute_name: data?.institute_name || users?.institute_name,
      education_level: data?.education_level || users?.education_level,
      skills: data.skills || users?.skills,
      image: users?.image,
      resume_link: data.resume || users?.resume_link,
    };

    axiosPublic
      .post("/job_applications", userInfo)
      .then(() => {
        reset();
        toast.success("Applied Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <h3 className="mt-4 text-3xl font-semibold">Apply to {jobTitle}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="my-10">
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

          {/* Age */}
          <label>
            <div className="label">
              <span className="font-bold font-inter"> Your Age</span>
            </div>
            <input
              type="age"
              {...register("age")}
              placeholder="Your Age"
              defaultValue={users?.age}
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
          {/* Education Level*/}
          <label>
            <div className="label">
              <span className="font-bold font-inter">
                {" "}
                Your Education Level :
              </span>
            </div>
            <input
              type="text"
              {...register("education_level")}
              placeholder="Eduction Level"
              defaultValue={users?.education_level}
            />
          </label>

          {/* Institute */}
          <label>
            <div className="label">
              <span className="font-bold font-inter"> Your Institute Name</span>
            </div>
            <input
              type="text"
              {...register("institute_name")}
              placeholder="Please Institute Name"
              defaultValue={users?.institute_name}
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          {/* gender field */}

          <label>
            <div className="label">
              <span className="font-bold font-inter"> Your Gender :</span>
            </div>
            <select
              defaultValue="default"
              className="py-2 w-full mt-2 border-2 rounded-md px-1"
              {...register("gender", {
                required: true,
              })}
            >
              <option disabled value="default">
                Your Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          {/* gender field End */}

          {/* Select skills*/}
          <label>
            <div className="label">
              <span className="font-bold font-inter"> Your Skills :</span>
            </div>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Select
                  className="py-2"
                  {...field}
                  options={skillsArray}
                  isMulti
                />
              )}
            />
          </label>
        </div>

        {/* Resume field */}
        <label>
          <div className="label">
            <span className="font-bold font-inter">Your Resume</span>
          </div>
          <input
            type="text"
            {...register("resume")}
            placeholder="Please share your resume drive link"
            defaultValue={users?.resume_link}
          />
        </label>

        <button
          type="submit"
          className="bg-[#433ebe] mt-4 py-2 px-8 text-white rounded-md"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default ApplyJobs;
