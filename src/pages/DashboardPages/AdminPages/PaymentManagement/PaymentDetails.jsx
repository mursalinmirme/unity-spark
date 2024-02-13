import { useForm } from "react-hook-form";
import image from "../../../../assets/images/payment-details.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";

const PaymentDetails = () => {
  const [countryCode, setContryCode] = useState("bd");
  const [isChecked, setIsChecked] = useState(false);
  console.log(isChecked);
  const {
    control,
    register,
    reset,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data?.email,
      phone: countryCode,
      name: data?.name,
    };
    console.log(userInfo);
    reset();
  };

  return (
    <div
      className="h-[800px] md:h-[1230px] w-full rounded-2xl bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Payment Detials</h1>
          <p className="font-semibold">
            {" "}
            Complete your payment by providing your details
          </p>
        </div>
        <div className="rounded-xl max-w-[800px] mx-auto mt-32 flex-1 shadow-xl bg-white bg-opacity-40  border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm relative z-2 p-8 text-black">
          <h1 className="font-bold text-lg">Total Amount : $5000</h1>
          <div>
            <div className="form-control my-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onClick={() => setIsChecked(!isChecked)}
                  className="checkbox"
                />
                <span className="font-semibold">
                  Save your payment info for next time
                </span>
              </label>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {isChecked && (
                <div className="space-y-3">
                  <div className="form-control">
                    <label className="">
                      <span className="font-inter text-[18px] font-semibold">
                        Email
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input bg-opacity-70"
                      placeholder="Your Email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="error text-red-500">
                        Please fill up this field
                      </span>
                    )}
                  </div>

                  <div>
                    <h1 className="font-inter text-[18px] font-semibold mb-1">
                      Phone
                    </h1>
                    <PhoneInput
                      country={countryCode}
                      autoFormat
                      placeholder="+880 177 503 ----"
                      onChange={(value) => setContryCode(value)}
                      inputStyle={{
                        width: "100%",
                        borderRadius: "8px",
                        opacity: "0.7",
                        color: "black",
                        font: "bold",
                      }}
                      inputClass="py-6"
                      dropdownStyle={{ width: "200px", marginTop: "-0.1px" }}
                    />
                  </div>
                  <div className="form-control">
                    <label className="">
                      <span className="font-inter text-[18px] font-semibold">
                        Name
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input bg-opacity-70"
                      placeholder="Your Name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="error text-red-500">
                        Please fill up this field
                      </span>
                    )}
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="bg-[#433ebe] mt-5 w-full text-white font-semibold rounded-md py-2"
              >
                Pay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
