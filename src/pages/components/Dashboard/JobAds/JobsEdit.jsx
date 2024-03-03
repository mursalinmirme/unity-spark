import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from 'sonner';
import { useParams } from "react-router-dom";
import Select from "react-select";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Loading from "../../Loading/Loading";

const JobsEdit = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [isSubmitting, setIsSubmittion] = useState(false);
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

  const {
    data: job,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["jobs-edit"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/job-ads/${id}`);
      return res?.data;
    },
  });

  console.log("hello check224", job);
  // get all default addtional requrirement
  const defaultAdditionalReq = [];
  job?.additional_Require?.map((val) => {
    defaultAdditionalReq.push({ value: val, label: val });
  });

  // get all default requirement skills
  const defaultReqSkills = [];
  job?.required_Skills?.map((val) => {
    defaultReqSkills.push({ value: val, label: val });
  });

  // get all default required ducational qualification
  const defaultReqEdu = [];
  job?.education_Require?.map((val) => {
    defaultReqEdu.push({ value: val, label: val });
  });

  // get all default required ducational qualification
  const defaultBefifites = [];
  job?.benefits?.map((val) => {
    defaultBefifites.push({ value: val, label: val });
  });
  console.log("nanananan", defaultBefifites);
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
    setIsSubmittion(true);
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
        setIsSubmittion(false);
        refetch();
        toast.success("Job updated successfully");
      })
      .catch((error) => {
        setIsSubmittion(false);
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
      <h3 className="text-2xl font-semibold">Edit job ads</h3>

      <div>
        <form className="mt-5 space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {/* Job Title */}
          <div className="">
            <label className="">
              <span className="font-inter text-base font-medium">
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
            <div className="">
              <label className="">
                <span className="font-inter text-base font-medium">
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
            <div className="">
              <label className="">
                <span className="font-inter text-base font-medium">Salary</span>
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

          <div className="grid grid-cols-1 pt-1 lg:grid-cols-2 gap-4">
            {/* Job Type */}
            <div className="form-control">
              <label className="pb-1">
                <span className="font-inter text-base font-medium">
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
                <span className="font-inter text-base font-medium">
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

          <div className="pt-1">
            <label className="">
              <span className="font-inter text-base font-medium">
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
              <span className="font-inter text-base font-medium">
                Required Skills
              </span>
            </label>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Select
                  defaultValue={defaultReqSkills}
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
              <span className="font-inter text-base font-medium">
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
                  defaultValue={defaultAdditionalReq}
                />
              )}
            />
          </div>

          {/* Educational Requirements */}
          <div className="space-y-1">
            <label>
              <span className="font-inter text-base font-medium">
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
                  defaultValue={defaultReqEdu}
                />
              )}
            />
          </div>

          {/* Benefits */}
          <div className="space-y-1">
            <label className="">
              <span className="font-inter text-base font-medium">
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
                  defaultValue={defaultBefifites}
                />
              )}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-[#433ebe] w-36 flex justify-center items-center text-white rounded-md h-12"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-md p-0"></span>
              ) : (
                "Update Job"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobsEdit;
