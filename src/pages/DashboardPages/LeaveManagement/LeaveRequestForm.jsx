import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { toast } from "sonner";
import "../EmployeePages/MyProfile/profile.css";
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
      <h2 className="text-2xl font-semibold font-inter">
        Create a Leave Application
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div className="border-2 p-3 md:p-5 rounded-lg space-y-2.5 mb-2.5">
          {/**One Two Part */}
          <div className="grid md:grid-cols-2 gap-3">
            {/* name field */}
            <div>
              <div className="py-1">
                <span className="user_profile_input_title"> Your Name :</span>
              </div>
              <input
                type="text"
                {...register("name")}
                placeholder="Please Your Name"
                className="user_profile_input"
                defaultValue={leave_user?.name}
              />
            </div>
            {/* Name field End */}

            <div>
              <div className="py-1">
                <span className="user_profile_input_title">
                  {" "}
                  Number of Days:
                </span>
              </div>
              <input
                type="number"
                {...register("numberOfDays", { required: true })}
                placeholder="Enter your leave duration"
                className="user_profile_input"
                required
              />
            </div>
          </div>

          {/**Second Two Part */}
          <div className="grid md:grid-cols-2 gap-3">
            {/* name field */}
            <div>
              <div className="py-1">
                <span className="user_profile_input_title"> Your Email :</span>
              </div>
              <input
                type="email"
                {...register("email")}
                placeholder="Please Your Email"
                defaultValue={leave_user?.email}
                className="user_profile_input"
              />
            </div>
            {/* Name field End */}

            <div>
              <div className="py-1">
                <span className="user_profile_input_title"> HR Email:</span>
              </div>
              <input
                type="email"
                {...register("hrEmail", { required: true })}
                placeholder="Enter Your Hr Email"
                required
                className="user_profile_input"
              />
            </div>
          </div>

          {/* Subject  field */}
          <div>
            <div className="py-1">
              <span className="user_profile_input_title">Subject</span>
            </div>
            <input
              type="text"
              {...register("subject", { required: true })}
              placeholder="Enter Subject Name"
              className="user_profile_input"
            />
          </div>

          {/* Subject  field */}
          <div>
            <div className="py-1 pb-2">
              <span className="user_profile_input_title"> Reason of Leave</span>
            </div>

            <textarea
              className="w-full h-32 rounded-lg pl-2 pt-2 outline-none user_profile_input"
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Write details about your leave issue..."
            />
          </div>
        </div>
        <button className="w-24 nbtn-fixed-bg">Send</button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
