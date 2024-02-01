import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Loading from "../../Loading/Loading";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";
import axios from "axios";

const JobsEdit = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: jobTypes } = useQuery({
    queryKey: ["jobTypes"],
    queryFn: async () => {
      const res = await axios.get("/jobTypes.json");
      return res.data;
    },
  });

  const { data: workTypes } = useQuery({
    queryKey: ["workTypes"],
    queryFn: async () => {
      const res = await axios.get("/workTypes.json");
      return res.data;
    },
  });

  const { data: job, isFetching } = useQuery({
    queryKey: ["jobs-edit"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/job-ads/${id}`);
      return res?.data;
    },
  });

  const skillsArray = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React.js" },
    { value: "Mui", label: "Material-UI" },
    { value: "Next", label: "Next.js" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "MySQL", label: "MySQL" },
    { value: "Mongoose", label: "Mongoose" },
  ];

  const additionalRequirementsArray = [
    { value: "experience_1_year", label: "1 Year of Experience" },
    { value: "experience_2_years", label: "2 Years of Experience" },
    { value: "experience_3_years", label: "3 Years of Experience" },
    { value: "certification_java", label: "Java Certification" },
    { value: "certification_python", label: "Python Certification" },
  ];

  const educationalRequirementArray = [
    {
      value: "diplomaCSE",
      label: "Diploma in Computer Science and Engineering",
    },
    { value: "bachelor", label: "Bachelor's Degree" },
    { value: "master", label: "Master's Degree" },
    { value: "phd", label: "Ph.D." },
  ];

  const jobBenefitsArray = [
    { value: "performanceBonuses", label: "Performance Bonuses" },
    { value: "festivalBonuses", label: "Festival Bonuses" },
    { value: "publicHolidays", label: "Public Holidays" },
    { value: "paidVacations", label: "Paid Vacations" },
    { value: "paidSickLeaves", label: "Paid Sick Leaves" },
    { value: "healthInsurance", label: "Health Insurance" },
    { value: "retirementPlan", label: "Retirement Plan" },
    { value: "flexibleWorkHours", label: "Flexible Work Hours" },
    {
      value: "professionalDevelopment",
      label: "Professional Development Opportunities",
    },
  ];

  const {
    control,
    register,
    reset,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let skillsArray = [];
    data?.skills?.map((skill) => {
      skillsArray.push(skill.label);
    });

    let additionalSkillsArray = [];
    data?.additional_requirements?.map((additionalSkill) => {
      additionalSkillsArray.push(additionalSkill.label);
    });

    let educationalRequirementArray = [];
    data?.educational_requirements?.map((educationalRequirement) => {
      educationalRequirementArray.push(educationalRequirement.label);
    });

    let jobBenefitsArray = [];
    data?.job_benefits?.map((jobBenefit) => {
      jobBenefitsArray.push(jobBenefit.label);
    });

    const newJob = {
      job_title: data.jobTitle,
      salary: data.salary,
      job_category1: data.workType,
      job_category2: data.jobType,
      position: data.position,
      job_description: data.jobDescription,
      required_Skills: skillsArray,
      additional_Require: additionalSkillsArray,
      education_Require: educationalRequirementArray,
      benefits: jobBenefitsArray,
    };

    console.log(newJob);

    axiosPublic
      .put(`/job-ads/${id}`, newJob)
      .then(() => {
        reset();
        toast.success("Job updated");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (isFetching) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="font-inter">
      <h3 className="text-3xl font-semibold">Edit job ads</h3>

      <div>
        <form className="mt-10 space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {/* Job Title */}
          <div className="form-control">
            <label className="">
              <span className="font-inter text-[18px] font-bold">
                Job Title
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              {...register("jobTitle")}
              defaultValue={job?.job_title}
            />
            {errors.jobTitle && (
              <span className="error text-red-500">
                Please fill up this field
              </span>
            )}
          </div>

          {/* Position and Salary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Position */}
            <div className="form-control">
              <label className="">
                <span className="font-inter text-[18px] font-bold">
                  Position
                </span>
              </label>
              <input
                type="text"
                defaultValue={job?.position}
                className="input input-bordered"
                {...register("position", { required: true })}
              />
              {errors.position && (
                <span className="error text-red-500">
                  Please fill up this field
                </span>
              )}
            </div>

            {/* Salary */}
            <div className="form-control">
              <label className="">
                <span className="font-inter text-[18px] font-bold">Salary</span>
              </label>
              <input
                type="text"
                defaultValue={job?.salary}
                className="input input-bordered"
                {...register("salary", { required: true })}
              />
              {errors.salary && (
                <span className="error text-red-500">
                  Please fill up this field
                </span>
              )}
            </div>
          </div>

          {/* Job Type and Work-Type */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Job Type */}
            <div className="form-control">
              <label className="pb-1">
                <span className="font-inter text-[18px] font-bold">
                  Job Type
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                defaultValue={job?.job_category1}
                {...register("jobType", {
                  required: true,
                })}
              >
                <option value="default">{job?.job_category1}</option>
                {jobTypes &&
                  jobTypes?.map((jobType) => (
                    <option key={jobType.id} value={jobType.name}>
                      {jobType.name}
                    </option>
                  ))}
              </select>

              {errors.jobType && (
                <span className="error text-red-500">Select one</span>
              )}
            </div>

            {/* Work Type */}

            <div className="form-control">
              <label className="pb-1">
                <span className="font-inter text-[18px] font-bold">
                  Work Type
                </span>
              </label>
              <select
                defaultValue={job?.job_category2}
                required
                className="select select-bordered w-full"
                {...register("workType")}
              >
                <option value="default">{job?.job_category2}</option>

                {workTypes &&
                  workTypes?.map((workType) => (
                    <option key={workType.id} value={workType.name}>
                      {workType.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Job Description */}

          <div className="form-control">
            <label className="">
              <span className="font-inter text-xl text-[18px] font-bold">
                Job Description
              </span>
            </label>
            <input
              type="text"
              defaultValue={job?.job_description}
              className="input input-bordered"
              {...register("jobDescription", { required: true })}
            />
            {errors?.jobDescription && (
              <span className="error text-red-500">
                Please fill up this field
              </span>
            )}
          </div>

          {/* Required Skills */}

          <div className="space-y-1">
            <label>
              <span className="font-inter text-[18px] font-bold">
                Required Skills
              </span>
            </label>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Select
                  defaultValue={job?.required_Skills.map((i) => i)}
                  {...field}
                  options={skillsArray}
                  isMulti
                />
              )}
            />
          </div>
          {errors.skills && (
            <span className="error text-red-500">{errors.skills.message}</span>
          )}

          {/* Additional Requirement */}

          <div className="space-y-1">
            <label>
              <span className="font-inter text-[18px] font-bold">
                Additional Requirements (Optional)
              </span>
            </label>
            <Controller
              name="additional_requirements"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={additionalRequirementsArray}
                  isMulti
                  defaultValue={job?.additional_Require}
                />
              )}
            />
          </div>

          {/* Educational Requirements */}
          <div className="space-y-1">
            <label>
              <span className="font-inter text-[18px] font-bold">
                Educational Requirements (Optional)
              </span>
            </label>
            <Controller
              name="educational_requirements"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={educationalRequirementArray}
                  isMulti
                  defaultValue={job?.education_Require}
                />
              )}
            />
          </div>

          {/* Benefits */}
          <div className="space-y-1">
            <label className="">
              <span className="font-inter text-[18px] font-bold">
                Benefits of this job (optional)
              </span>
            </label>
            <Controller
              name="job_benefits"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={jobBenefitsArray}
                  isMulti
                  defaultValue={job?.benefits}
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="bg-[#433ebe] mt-3 px-8 text-white rounded-md py-1"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobsEdit;
