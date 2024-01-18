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
      company_name: data.company,
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
    <div className="max-w-7xl mx-auto px-4">
      <div
        id="contact"
        className="py-10 lg:py-20 md:grid grid-cols-4 max-w-7xl mx-auto"
      >
        <div className="col-span-2 space-y-3 mb-16 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-semibold mb-5">
            Contact <span className=" text-[#248479]">Info</span>
          </h1>
          <div className="flex items-center gap-2 md:text-lg">
            <FaLocationArrow className="text-2xl text-[#248479]" />
            <p>Level-5, 23, Gulshan, Dhaka-1211 </p>
          </div>
          <div className="flex items-center gap-2 md:text-lg">
            <FaPhone className="text-xl text-[#248479]" />
            <p>+880 ##### 36519</p>
          </div>
          <div className="flex md:text-lg items-center gap-2">
            <IoMdMail className="text-2xl text-[#248479]" />
            <p>unityspark@gmail.com</p>
          </div>
        </div>

        <div className="col-span-2">
          <h1 className="text-3xl md:text-4xl font-semibold mb-3">
            Get In <span className=" text-[#248479]">Touch!</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:flex space-y-5 md:space-y-0 gap-5">
              <div className="form-control w-full">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Full name"
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <p className="text-[#248479]">name is required.</p>
                )}
              </div>
              <div className="form-control w-full">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full"
                />
                {errors.email && (
                  <p className="text-[#248479]">email is required.</p>
                )}
              </div>
            </div>
            <div className="md:flex space-y-5 md:space-y-0 gap-5 mt-5">
              <div className="form-control w-full">
                <input
                  {...register("company", { required: true })}
                  type="text"
                  placeholder="Company name"
                  className="input input-bordered w-full"
                />
                {errors.company && (
                  <p className="text-[#248479]">company name is required.</p>
                )}
              </div>
              <div className="form-control w-full">
                <input
                  {...register("number", { required: true })}
                  type="number"
                  placeholder="Phone number"
                  className="input input-bordered w-full"
                />
                {errors.number && (
                  <p className="text-[#248479]">phone number is required.</p>
                )}
              </div>
            </div>
            <div className="form-control my-5">
              <textarea
                {...register("message", { required: true })}
                rows={5}
                placeholder="Your Comments here"
                className="textarea textarea-bordered"
              ></textarea>
              {errors.message && (
                <p className="text-[#248479]"> please provide a message</p>
              )}
            </div>
            <div className="text-center">
              <input
                className="btn btn-outline border-[#248479] text-[#248479] md:px-10"
                type="submit"
                value="Send Message"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
