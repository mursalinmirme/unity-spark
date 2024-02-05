import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import toast from "react-hot-toast";
const LeaveRequestForm = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: leave_user } = useQuery({
    queryKey: ["leave_user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // console.log(leave_user);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const leaveRequest = {
      name: leave_user?.name,
      numberOfDays: data?.numberOfDays,
      email: leave_user?.email,
      hrEmail: data?.hrEmail,
      subject: data?.subject,
      leaveReason: data?.description,
      user: leave_user?._id,
    };

    // leave management Post System Emplement
    axiosPublic
      .post("/leaves", leaveRequest)
      .then(
        (res) => console.log(res),
        toast.success(" Post System successfully working ")
      )
      .catch((err) => console.log(err.message));

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
              {...register("name")}
              placeholder="Please Your Name"
              readOnly
              defaultValue={leave_user?.name}
            />
          </label>
          {/* Name field End */}

          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> Number of Days:</span>
            </div>
            <input
              type="text"
              {...register("numberOfDays", { required: true })}
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
              {...register("email")}
              placeholder="Please Your Email"
              defaultValue={leave_user?.email}
              readOnly
            />
          </label>
          {/* Name field End */}

          <label>
            <div className="py-1">
              <span className="font-bold font-inter"> HR Email:</span>
            </div>
            <input
              type="email"
              {...register("hrEmail", { required: true })}
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

export default LeaveRequestForm;
