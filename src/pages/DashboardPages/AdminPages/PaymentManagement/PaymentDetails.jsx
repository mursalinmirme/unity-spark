import { useForm } from "react-hook-form";
import image from "../../../../assets/images/payment-details.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUserInfo from "../../../../hooks/useUserInfo";

const PaymentDetails = ({ paymentInfo }) => {
  const [countryCode, setContryCode] = useState("bd");
  const [isChecked, setIsChecked] = useState(false);
  const axiosPublic = useAxiosPublic();
  const salary = paymentInfo?.salary;
  const [clientSecret, setClientSecret] = useState("");

  // const { user } = useContext(AuthContext);

  const [users] = useUserInfo();

  const {
    register,
    reset,
    handleSubmit,

    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   const userInfo = {
  //     email: data?.email,
  //     phone: countryCode,
  //     name: data?.name,
  //   };

  //   reset();
  // };

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    {
      paymentInfo?.salary &&
        axiosPublic
          .post("/create-payment-intent", { salary: salary })
          .then((res) => {
            setClientSecret(res?.data);
          });
    }
  }, [axiosPublic, paymentInfo?.salary, salary]);

  const handleSubmit2 = async (data) => {
    // const userInfo = {
    //   email: data?.email,
    //   phone: countryCode,
    //   name: data?.name,
    // };

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: data?.email,
            phone: countryCode,
            name: data?.name,
          },
        },
        confirmParams: {
          return_url: "http://localhost:5173", // Specify your return URL here
        },
      }
    );
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment Intent", paymentIntent);
    }
  };

  return (
    <div
      className="h-[800px] md:h-[1000px] w-full rounded-2xl bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}>
      {/* <form onSubmit={handleSubmit2} className="pt-10 ">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn"
          type="submit"
          disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </form> */}

      <div className="">
        <div className="text-center py-10 font-bold">
          <h1 className="text-3xl mb-2">Payment Details</h1>
          <p> Complete your payment by providing your details</p>
        </div>
        <div className="rounded-xl max-w-[650px] mx-auto flex-1 shadow-xl bg-white bg-opacity-40  border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm relative z-2 p-4 md:p-8 text-black">
          <h1 className="font-bold text-lg">Total Amount : $5000</h1>

          <form onSubmit={handleSubmit(handleSubmit2)}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />

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
                    defaultValue={users?.email}
                    className="input bg-opacity-70 focus:outline-none"
                    placeholder="Your Email"
                    readOnly
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="error text-red-600">
                      Please fill up this field
                    </span>
                  )}
                </div>

                <div>
                  <h1 className="font-inter text-[18px] font-semibold mb-2">
                    Phone
                  </h1>
                  <PhoneInput
                    country={countryCode}
                    autoFormat
                    defaultValue={users?.phone}
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
                    buttonStyle={{ borderRadius: "8px 0 0 8px" }}
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
                    className="input bg-opacity-70 focus:outline-none"
                    placeholder="Your Name"
                    defaultValue={users?.name}
                    readOnly
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="error text-red-600">
                      Please fill up this field
                    </span>
                  )}
                </div>
              </div>
            )}
            <button
              className="btn"
              type="submit"
              disabled={!stripe || !clientSecret}>
              Pay
            </button>
          </form>

          <div>
            <div className="form-control my-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onClick={() => setIsChecked(!isChecked)}
                  className="checkbox border-2 [--chkbg:theme(colors.primary)]"
                />
                <span className="font-semibold text-sm">
                  Save your payment info for next time
                </span>
              </label>
            </div>
            {/* <form onSubmit={handleSubmit(handleSubmit2)}>
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
                      defaultValue={users?.email}
                      className="input bg-opacity-70 focus:outline-none"
                      placeholder="Your Email"
                      readOnly
                      {...register("email")}
                    />
                    {errors.email && (
                      <span className="error text-red-600">
                        Please fill up this field
                      </span>
                    )}
                  </div>

                  <div>
                    <h1 className="font-inter text-[18px] font-semibold mb-2">
                      Phone
                    </h1>
                    <PhoneInput
                      country={countryCode}
                      autoFormat
                      defaultValue={users?.phone}
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
                      buttonStyle={{ borderRadius: "8px 0 0 8px" }}
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
                      className="input bg-opacity-70 focus:outline-none"
                      placeholder="Your Name"
                      defaultValue={users?.name}
                      readOnly
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="error text-red-600">
                        Please fill up this field
                      </span>
                    )}
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="bg-[#433ebe] mt-5 w-full text-white font-semibold rounded-md py-2">
                Pay
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
