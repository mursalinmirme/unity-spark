import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { FaPhone, FaLocationArrow } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import toast from "react-hot-toast";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const contactInfo = {
      to_name: "Team Code Wizards",
      from_name: data.name,
      from_email: data.email,
      number: data.number,
      message: data.message,
    };

    emailjs
      .send(
        "service_op447xu",
        "template_ykz3aa6",
        contactInfo,
        "c8NW96YZKgbGfzo3W"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Email was successfully sent!");
          reset();
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    console.log(contactInfo);
  };

  return (
    <div id="contactUs">
      <div id="contact">
        <div className="left_container">
          <div className="mb-6">
            <h2>Contact Info</h2>
            <h6>Cultivate Connections: Reach Out to Us.</h6>
          </div>
          <div className="space-y-3">
            <div className="contact_info">
              <FaLocationArrow />
              <p>Level-5, 23, Gulshan, Dhaka-1211 </p>
            </div>
            <div className="contact_info">
              <FaPhone />
              <p>+880 ##### 36519</p>
            </div>
            <div className="contact_info">
              <IoMdMail />
              <p>unityspark@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="right_container">
          <h2>Get InTouch!</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
            <div className="flex gap-3">
              <div className="form-control w-full">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Full name"
                  className=""
                />
                {errors.name && (
                  <p className="text-red-500">name is required.</p>
                )}
              </div>
              <div className="form-control w-full">
                <input
                  {...register("number", { required: true })}
                  type="number"
                  placeholder="Phone number"
                  className=""
                />
                {errors.number && (
                  <p className="text-red-500">number is required.</p>
                )}
              </div>
            </div>
            <div className="-mt-1.5">
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email Address"
                className=""
              />
              {errors.email && (
                <p className="text-red-500">email is required.</p>
              )}
            </div>
            <div className="form-control">
              <textarea
                {...register("message", { required: true })}
                rows={3}
                placeholder="Your Comments here..."
                className="textarea textarea-bordered text-base"
              ></textarea>
              {errors.message && (
                <p className="text-red-500"> please provide a message</p>
              )}
            </div>
            <div>
              <button className="nbtn">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
