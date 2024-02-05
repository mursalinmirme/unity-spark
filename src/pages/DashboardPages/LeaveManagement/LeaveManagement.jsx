import { useForm } from "react-hook-form";

const LeaveManagement = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary">
        {" "}
        Create a Leave Application
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className=" mt-3 space-y-4">
        {/**One Two Part */}
        <div className="grid md:grid-cols-2 gap-3">
          {/* name field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Your Name :</span>
            </div>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Please Your Name"
            />
          </label>
          {/* Name field End */}

          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Number of Days:</span>
            </div>
            <input
              type="text"
              {...register("time", { required: true })}
              placeholder="Please Your Days"
              required
            />
          </label>
        </div>

        {/**Second Two Part */}
        <div className="grid md:grid-cols-2 gap-3">
          {/* name field */}
          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Your Email :</span>
            </div>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Please Your Email"
              required
            />
          </label>
          {/* Name field End */}

          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> HR Email:</span>
            </div>
            <input
              type="email"
              {...register("hr_email", { required: true })}
              placeholder="Please Your Hr Email"
              required
            />
          </label>
        </div>

        {/* Subject  field */}
        <label>
          <div className="py-1">
            <span className="font-bold font-inter">Subject</span>
          </div>
          <input
            type="text"
            {...register("subject", { required: true })}
            placeholder="Please Subject Name"
          />
        </label>

        {/* Subject  field */}
        <label>
          <div className="py-1">
            <span className="font-bold font-inter"> Reason of Leave</span>
          </div>

          <textarea
            className="w-full h-28 border pl-2 pt-2"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Write details about your leave issue..."
          />
        </label>
        <br />
        <button className="w-48 py-2  bg-primary border-none text-white rounded-xl text-center cursor-pointer">
          Send
        </button>
      </form>
    </div>
  );
};

export default LeaveManagement;
