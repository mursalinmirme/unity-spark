import { useLocation, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Select from "react-select";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from 'sonner';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle } from "react-icons/fa";
import ApplyJobsSkeleton from "./ApplyJobsSkeleton";
const ApplyJobs = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {id} = useParams();
  console.log("mr id is", id);

  const {data:applyJobDetails, isFetching: jobDetailsIsFetching} = useQuery({
    queryKey: ['getIndividualJobDetails'], 
    enabled: !!id,
    queryFn: async () => {
      const result = await axiosPublic.get(`/job-ads/${id}`);
      return result.data;
    },
  })

  const {data:users, isFetching:userInfoIsFetching} = useQuery({
    queryKey: ['getUsersAllInformation'],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/${user?.email}`);
      return result.data;
    }
  })

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

  
  const {data:doesApplied, isFetching:doesAppliedIsFetching, refetch:applicationRefetch} = useQuery({
    queryKey: ['doesTheUserAlreadyApplied'],
    queryFn: async () => {
      const result = await axiosPublic.get(`/does-user-applied?applied_jobs_id=${id}&email=${user?.email}`);
      return result.data.applied;
    }
  })

  const { register, handleSubmit, control, reset } = useForm();

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const userInfo = {
      name: data?.name || users?.name,
      email: user?.email,
      applied_job_id: id,
      title : applyJobDetails?.job_title,
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
      user: users?._id
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

if(userInfoIsFetching || jobDetailsIsFetching){
 return <ApplyJobsSkeleton></ApplyJobsSkeleton>;
}

  return (
    <div>
      <h3 className="mt-4 text-3xl font-semibold">Apply to {applyJobDetails?.job_title}</h3>
      <h5 className="mt-2 text-base font-semibold">Position: {applyJobDetails?.position}</h5>
      {
        doesApplied ? <div className="w-full h-[60vh] flex justify-center items-center">
          <div className="border p-16  shadow-sm rounded-xl">
            <div className="flex justify-center flex-col items-center space-y-3">
            <FaCheckCircle className="text-green-500 text-3xl"></FaCheckCircle>
            <p>You have successfully applied for the job</p>
            </div>
            <p className="text-center mt-1">Please, wait for response</p>
          </div>
        </div>: 
              <form onSubmit={handleSubmit(onSubmit)} className="my-5">
              <div className="flex gap-5 items-center">
                {/* name field */}
                <label className="flex-1">
                  <div className="label text-sm">
                    <span className="font-bold font-inter"> Your Name :</span>
                  </div>
                  <input
                    type="text"
                    className="text-base py-2.5"
                    {...register("name")}
                    placeholder="Please Your Name"
                    defaultValue={users?.name}
                  />
                </label>
                {/* Name field End */}
      
                {/* Age */}
                <label className="flex-1">
                  <div className="label text-sm">
                    <span className="font-bold font-inter"> Your Age</span>
                  </div>
                  <input
                    type="age"
                    className="text-base py-2.5"
                    {...register("age")}
                    placeholder="Your Age"
                    defaultValue={users?.age}
                  />
                </label>
              </div>
              <div className="flex gap-5 items-center mt-2">
                {/* Email field */}
                <label className="flex-1">
                  <div className="label text-sm">
                    <span className="font-bold font-inter"> Your Email :</span>
                  </div>
                  <input
                    type="email"
                    className="text-base py-2.5"
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
                    <span className="font-bold font-inter">Phone :</span>
                  </div>
                  <input
                    type="number"
                    className="text-base py-2.5"
                    {...register("phone")}
                    placeholder="Your Phone Number"
                    defaultValue={users?.phone}
                  />
                </label>
              </div>
      
              <div className="flex gap-5 items-center mt-2">
                {/* Current Address field */}
                <label className="flex-1">
                  <div className="label text-sm">
                    <span className="font-bold font-inter">
                      Your Current Address:
                    </span>
                  </div>
                  <input
                    type="address"
                    className="text-base py-2.5"
                    {...register("current")}
                    placeholder="Your Current Address"
                    defaultValue={users?.current_address}
                  />
                </label>
                {/* Current Address field End */}
      
                {/* Permanent Address */}
                <label className="flex-1">
                  <div className="label text-sm">
                    <span className="font-bold font-inter">Permanent Address</span>
                  </div>
                  <input
                    type="address"
                    className="text-base py-2.5"
                    {...register("permanent")}
                    placeholder=" Your Permanent Address"
                    defaultValue={users?.permanent_address}
                  />
                </label>
              </div>
      
              <div className="flex gap-5 items-center mt-2">
                {/* Education Level*/}
                <label className="flex-1">
                  <div className="label text-sm">
                    <span className="font-bold font-inter">
                      Your Education Level :
                    </span>
                  </div>
                  <input
                    type="text"
                    className="text-base py-2.5"
                    {...register("education_level")}
                    placeholder="Eduction Level"
                    defaultValue={users?.education_level}
                  />
                </label>
      
                {/* Institute */}
                <label className="flex-1">
                  <div className="label text-sm">
                    <span className="font-bold font-inter"> Your Institute Name</span>
                  </div>
                  <input
                    type="text"
                    className="text-base py-2.5"
                    {...register("institute_name")}
                    placeholder="Please Institute Name"
                    defaultValue={users?.institute_name}
                  />
                </label>
              </div>
      
              <div className="flex gap-5 items-center mt-2">
                {/* gender field */}
      
                <label className="flex-1">
                  <div className="label text-sm">
                    <span className="font-bold font-inter"> Your Gender :</span>
                  </div>
                  <select
                    defaultValue="default"
                    className="w-full mt-2 border-2 rounded-md px-1 text-base py-2.5 "
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
                    <span className="font-bold font-inter"> Your Skills :</span>
                  </div>
                  <Controller
                    name="skills"
                    control={control}
                    render={({ field }) => (
                      <Select
                        className="text-base bg-red-300"
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
                  <span className="font-bold font-inter">Your Resume</span>
                </div>
                <input
                  type="text"
                  className="text-base py-2.5"
                  {...register("resume")}
                  placeholder="Please share your resume drive link"
                  defaultValue={users?.resume_link}
                />
              </label>
      
              <button
                type="submit"
                className="bg-[#433ebe] mt-6 font-medium h-11 flex justify-center items-center w-32 text-white rounded-md"
              >
                {isSubmitting ? <span className="loading loading-spinner loading-md p-0"></span> : 'Submit'}
              </button>
            </form>
      }

    </div>
  );
};

export default ApplyJobs;
