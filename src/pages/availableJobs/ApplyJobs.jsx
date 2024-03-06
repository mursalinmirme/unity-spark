import { useLocation, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Select from "react-select";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "sonner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle } from "react-icons/fa";
import ApplyJobsSkeleton from "./ApplyJobsSkeleton";
const ApplyJobs = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  console.log("mr id is", id);

  const { data: applyJobDetails, isFetching: jobDetailsIsFetching } = useQuery({
    queryKey: ["getIndividualJobDetails"],
    enabled: !!id,
    queryFn: async () => {
      const result = await axiosPublic.get(`/job-ads/${id}`);
      return result.data;
    },
  });

  const { data: users, isFetching: userInfoIsFetching } = useQuery({
    queryKey: ["getUsersAllInformation"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/${user?.email}`);
      return result.data;
    },
  });

  console.log("Helllo check mr hello", users?.skills);

  const skillsArray = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React.js" },
    { value: "HTML", label: "HTML" },
    { value: "Next", label: "Next.js" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "MySQL", label: "MySQL" },
    { value: "Mongoose", label: "Mongoose" },
  ];

  const {
    data: doesApplied,
    isFetching: doesAppliedIsFetching,
    refetch: applicationRefetch,
  } = useQuery({
    queryKey: ["doesTheUserAlreadyApplied"],
    queryFn: async () => {
      const result = await axiosPublic.get(
        `/does-user-applied?applied_jobs_id=${id}&email=${user?.email}`
      );
      return result.data.applied;
    },
  });

  const { register, handleSubmit, control, reset } = useForm();

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const userInfo = {
      name: data?.name || users?.name,
      email: user?.email,
      applied_job_id: id,
      title: applyJobDetails?.job_title,
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
      user: users?._id,
    };

    axiosPublic
      .post("/job_applications", userInfo)
      .then(() => {
        reset();
        applicationRefetch();
        setIsSubmitting(false);
        toast.success("Applied Successfully");
      })
      .catch((error) => {
        setIsSubmitting(false);
        toast.error(error.message);
      });
  };

  if (userInfoIsFetching || jobDetailsIsFetching) {
    return <ApplyJobsSkeleton></ApplyJobsSkeleton>;
  }

  return (
    <div className="max-w-[92%] lg:max-w-[1200px] mx-auto">
      <h3 className="mt-4 text-3xl font-semibold">
        Apply to {applyJobDetails?.job_title}
      </h3>
      <h5 className="mt-2 text-base font-semibold">
        Position: {applyJobDetails?.position}
      </h5>
      {doesApplied ? (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <div className="border p-16  shadow-sm rounded-xl">
            <div className="flex justify-center flex-col items-center space-y-3">
              <FaCheckCircle className="text-green-500 text-3xl"></FaCheckCircle>
              <p>You have successfully applied for the job</p>
            </div>
            <p className="text-center mt-1">Please, wait for response</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <div className="border-2 p-3 md:p-5 rounded-lg">
            <div className="flex gap-5 items-center">
              {/* name field */}
              <label className="flex-1">
                <div className="label text-sm">
                  <span className="user_profile_input_title"> Your Name :</span>
                </div>
                <input
                  type="text"
                  className="user_profile_input"
                  {...register("name")}
                  placeholder="Please Your Name"
                  defaultValue={users?.name}
                />
              </label>
              {/* Name field End */}

              {/* Age */}
              <label className="flex-1">
                <div className="label text-sm">
                  <span className="user_profile_input_title"> Your Age</span>
                </div>
                <input
                  type="age"
                  className="user_profile_input"
                  {...register("age")}
                  placeholder="Your Age"
                  defaultValue={users?.age}
                />
              </label>
            </div>
            <div className="flex gap-5 items-center">
              {/* Email field */}
              <label className="flex-1">
                <div className="label text-sm">
                  <span className="user_profile_input_title">
                    {" "}
                    Your Email :
                  </span>
                </div>
                <input
                  type="email"
                  className="user_profile_input"
                  {...register("email")}
                  placeholder="Your Email"
                  readOnly
                  defaultValue={users?.email}
                />
              </label>
              {/* email field End */}

              {/* phone Number*/}
              <label className="flex-1">
                <div className="label text-sm">
                  <span className="user_profile_input_title">Phone :</span>
                </div>
                <input
                  type="number"
                  className="user_profile_input"
                  {...register("phone")}
                  placeholder="Your Phone Number"
                  defaultValue={users?.phone}
                />
              </label>
            </div>
            <div className="flex gap-5 items-center">
              {/* Current Address field */}
              <label className="flex-1">
                <div className="label text-sm">
                  <span className="user_profile_input_title">
                    Your Current Address:
                  </span>
                </div>
                <input
                  type="address"
                  className="user_profile_input"
                  {...register("current")}
                  placeholder="Your Current Address"
                  defaultValue={users?.current_address}
                />
              </label>
              {/* Current Address field End */}

              {/* Permanent Address */}
              <label className="flex-1">
                <div className="label text-sm">
                  <span className="user_profile_input_title">
                    Permanent Address
                  </span>
                </div>
                <input
                  type="address"
                  className="user_profile_input"
                  {...register("permanent")}
                  placeholder=" Your Permanent Address"
                  defaultValue={users?.permanent_address}
                />
              </label>
            </div>
            <div className="flex gap-5 items-center">
              {/* Education Level*/}
              <label className="flex-1">
                <div className="label text-sm">
                  <span className="user_profile_input_title">
                    Your Education Level :
                  </span>
                </div>
                <input
                  type="text"
                  className="user_profile_input"
                  {...register("education_level")}
                  placeholder="Eduction Level"
                  defaultValue={users?.education_level}
                />
              </label>

              {/* Institute */}
              <label className="flex-1">
                <div className="label text-sm">
                  <span className="user_profile_input_title">
                    {" "}
                    Your Institute Name
                  </span>
                </div>
                <input
                  type="text"
                  className="user_profile_input"
                  {...register("institute_name")}
                  placeholder="Please Institute Name"
                  defaultValue={users?.institute_name}
                />
              </label>
            </div>
            <div className="flex gap-5 items-center">
              {/* gender field */}

              <label className="flex-1">
                <div className="label text-sm">
                  <span className="user_profile_input_title">
                    {" "}
                    Your Gender :
                  </span>
                </div>
                <select
                  defaultValue="default"
                  className="w-full mt-2 border-2 rounded-md px-1 user_profile_input "
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
              <label className="flex-1">
                <div className="label text-sm">
                  <span className="user_profile_input_title mb-2">
                    {" "}
                    Your Skills :
                  </span>
                </div>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="text-base"
                      {...field}
                      options={skillsArray}
                      defaultValue={users?.skills}
                      isMulti
                    />
                  )}
                />
              </label>
            </div>
            {/* Resume field */}
            <label>
              <div className="label text-sm">
                <span className="user_profile_input_title">Your Resume</span>
              </div>
              <input
                type="text"
                className="user_profile_input"
                {...register("resume")}
                placeholder="Please share your resume drive link"
                defaultValue={users?.resume_link}
              />
            </label>
          </div>

          <button type="submit" className="nbtn-fixed-bg w-32 mt-3">
            {isSubmitting ? (
              <span className="loading loading-spinner loading-md p-0"></span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ApplyJobs;
