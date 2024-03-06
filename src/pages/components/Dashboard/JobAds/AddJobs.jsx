import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import "../../../DashboardPages/EmployeePages/MyProfile/profile.css";

import { toast } from "sonner";
import axios from "axios";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useState } from "react";

const AddJobs = () => {
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

  const skillsArray = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React.js" },
    { value: "Mui", label: "Material-UI" },
    { value: "Next", label: "Next.js" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "MySQL", label: "MySQL" },
    { value: "Mongoose", label: "Mongoose" },
    { value: "Express", label: "Express" },
    { value: "Bootstrap", label: "Bootstrap" },
    { value: "Tailwind", label: "Tailwind" },
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

    axiosPublic
      .post("/job-ads", newJob)
      .then(() => {
        toast.success("New Job Ad Added");
        reset();
        setIsSubmittion(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsSubmittion(false);
      });
  };

  return (
    <div className="font-inter">
      <h3 className="text-2xl font-semibold">Add a new job ads</h3>
      <div>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="border-2 p-3 md:p-5 rounded-lg space-y-3 mb-2.5">
            {/* Job Title */}
            <div>
              <label className="">
                <span className="user_profile_input_title">Job Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter job title"
                className="user_profile_input"
                {...register("jobTitle", { required: true })}
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
                  <span className="user_profile_input_title">Position</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter job position"
                  className="user_profile_input"
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
                  <span className="user_profile_input_title">Salary</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter job salary"
                  className="user_profile_input"
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
                  <span className="user_profile_input_title">Job Type</span>
                </label>
                <select
                  defaultValue="default"
                  className="user_profile_input rounded-md pl-2 w-full"
                  {...register("jobType", {
                    required: true,
                  })}
                >
                  <option disabled value="default">
                    Select Job Type
                  </option>
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
                  <span className="user_profile_input_title">Work Type</span>
                </label>
                <select
                  defaultValue="default"
                  required
                  className="user_profile_input rounded-md pl-2 w-full"
                  {...register("workType")}
                >
                  <option disabled value="default">
                    Select Work Type
                  </option>

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
                <span className="user_profile_input_title">
                  Job Description
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter job description"
                className="user_profile_input"
                {...register("jobDescription", { required: true })}
              />
              {errors?.jobDescription && (
                <span className="error text-red-500">
                  Please fill up this field
                </span>
              )}
            </div>
            {/* Required Skills */}
            <div className="space-y-3 text-sm font-medium">
              <label>
                <span className="user_profile_input_title">
                  Required Skills
                </span>
              </label>
              <Controller
                name="skills"
                rules={{ required: "Please select required skills" }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={skillsArray}
                    isMulti
                    placeholder="Enter required skills"
                  />
                )}
              />
            </div>
            {errors.skills && (
              <span className="error text-red-500">
                {errors.skills.message}
              </span>
            )}
            {/* Additional Requirement */}
            <div className="space-y-3 text-sm font-medium">
              <label>
                <span className="user_profile_input_title">
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
                    placeholder="Enter additional requirements"
                  />
                )}
              />
            </div>
            {/* Educational Requirements */}
            <div className="space-y-3 text-sm font-medium">
              <label>
                <span className="user_profile_input_title">
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
                    placeholder="Enter educational requirements"
                    className=""
                  />
                )}
              />
            </div>
            {/* Benefits */}
            <div className="space-y-3 text-sm font-medium">
              <label className="">
                <span className="user_profile_input_title">
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
                    placeholder="Enter benefits"
                  />
                )}
              />
            </div>
          </div>
          <div className="pt-4">
            <button type="submit" className="w-36 nbtn-fixed-bg">
              {isSubmitting ? (
                <span className="loading loading-spinner loading-md p-0"></span>
              ) : (
                "Add Job"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobs;
