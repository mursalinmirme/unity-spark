import { BsUpload } from "react-icons/bs";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=5633fa8b7fb7bf3c2d44694187c33411`;

const EmployeeProfileEdit = () => {
  const { register, handleSubmit, control } = useForm();
  // New Array
  const skillsArray = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React.js" },
    { value: "HTML", label: "HTML" },
    { value: "Next", label: "Next.js" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "MySQL", label: "MySQL" },
    { value: "Mongoose", label: "Mongoose" },
  ];
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      {/**One Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* name field */}
        <label>
          <div className="label">
            <span className="font-bold font-inter"> Your Name :</span>
          </div>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Please Your Name"
            required
          />
        </label>
        {/* Name field End */}

        {/*image field */}
        <label className="relative">
          <div className="label mb-10 md:mb-0 lg:mb-0">
            <span className="font-bold font-inter"> Your Photo : </span>
            <label
              className="font-semibold w-full absolute bottom-0    text-white cursor-pointer font-inter text-base px-8 py-[8px] bg-primary rounded-xl transition-all duration-500 text-[15px]"
              htmlFor="user_photo"
            >
              <div className="flex justify-center items-center gap-2">
                {" "}
                <BsUpload /> <span> Upload Photo</span>{" "}
              </div>
            </label>
          </div>
          <input
            className="hidden"
            id="user_photo"
            type="file"
            {...register("photo")}
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
            {...register("email", { required: true })}
            placeholder="Your Email"
            required
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
          />
        </label>
      </div>

      {/**Second Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* Current Address field */}
        <label>
          <div className="label">
            <span className="font-bold font-inter"> Your Current Address:</span>
          </div>
          <input
            type="address"
            {...register("current", { required: true })}
            placeholder=" Your Current Address "
            required
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
          />
        </label>
      </div>

      {/**Three Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* Age field */}
        <label>
          <div className="label">
            <span className="font-bold font-inter"> Your Age</span>
          </div>
          <input
            type="age"
            {...register("age", { required: true })}
            placeholder="Your Age"
            required
          />
        </label>
        {/* Age field End */}

        {/* Your Gender Select */}
        <label>
          <div className="label">
            <span className="font-bold font-inter"> Your Gender :</span>
          </div>
          <input
            type="text"
            {...register("gender", { required: true })}
            placeholder="Male"
            required
          />
        </label>
      </div>

      {/**Four Two Part */}
      <div className="grid md:grid-cols-2 gap-2">
        {/* Job Preference field */}
        <label>
          <div className="label">
            <span className="font-bold font-inter"> Your Job Preference :</span>
          </div>
          <input
            type="text"
            {...register("preference", { required: true })}
            placeholder="Remote"
            required
          />
        </label>
        {/* Preference field End */}

        {/* Time Preference field */}
        <label>
          <div className="label">
            <span className="font-bold font-inter"> Your Time Preference</span>
          </div>
          <input
            type="text"
            {...register("time_preference", { required: true })}
            placeholder="Intern"
            required
          />
        </label>
      </div>

      {/**Five Two Part */}

      {/* Skills field */}
      <label>
        <div className="label">
          <span className="font-bold font-inter"> Your Skills :</span>
        </div>
        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <Select {...field} options={skillsArray} isMulti />
          )}
        />
      </label>

      {/* Resume field */}
      <label>
        <div className="label">
          <span className="font-bold font-inter">Your Resume</span>
        </div>
        <input
          type="text"
          {...register("resume", { required: true })}
          placeholder="Please share your resume drive link"
          required
        />
      </label>

      <div className="w-48 mt-10 bg-primary border-none text-white rounded-xl">
        <input className="cursor-pointer" type="submit" value="Update" />
      </div>
    </form>
  );
};

export default EmployeeProfileEdit;
