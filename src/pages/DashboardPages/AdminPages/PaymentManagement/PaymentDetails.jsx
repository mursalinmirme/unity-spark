import { useForm } from "react-hook-form";
import image from "../../../../assets/images/payment-details.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUserInfo from "../../../../hooks/useUserInfo";
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";

const PaymentDetails = ({ paymentInfo }) => {
  const [countryCode, setContryCode] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const axiosPublic = useAxiosPublic();
  const salary = paymentInfo?.salary;
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  // const { user } = useContext(AuthContext);
  const [users] = useUserInfo();

  const {
    register,
    reset,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (salary > 0) {
      axiosPublic
        .post("/create-payment-intent", { salary: salary })
        .then((res) => {
          setClientSecret(res?.data?.clientSecret);
        });
    }
  }, [axiosPublic, salary]);

  const handleSubmit2 = async (data) => {
    if (!stripe || !elements) {
      console.error("Stripe or Elements not initialized");
      return;
    }

    const card = elements.getElement(CardElement);

    console.log(card);

    if (!card) {
      console.error("Card element not found");
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        console.error("Error creating payment method:", error);
        return;
      }
      console.log("PaymentMethod", paymentMethod);
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: users?.email || "anonymous",
              name: users?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        console.error("Confirm error:", confirmError.status);
      } else {
        console.log("Payment Intent", paymentIntent.status);
        if (paymentIntent.status === "succeeded") {
          setTransactionId(paymentIntent.id);
          const payInfo = {
            admin_email: data?.email,
            admin_phone: countryCode || users?.phone,
            admin_name: data?.name,
            payment_email: paymentInfo?.email,
            payment_id: paymentInfo?.id,
            payment_ammount: paymentInfo?.salary,
            payment_status: "paid",
            transactionId: paymentIntent.id,
          };
          console.log(payInfo);
          axiosPublic.post("/payment", payInfo).then((res) => {
            console.log(res.data);
            toast.success("Successfully paid.");
            navigate("/dashboard/payment-management");
          });
        }
      }
    } catch (error) {
      console.error("Payment submission error:", error);
    }
  };

  return (
    <div
      className="h-[800px] md:h-[1000px] w-full rounded-2xl bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="">
        <div className="text-center py-10 font-bold">
          <h1 className="text-3xl mb-2">Payment Details</h1>
          <p> Complete your payment by providing your details</p>
        </div>
        <div className="rounded-xl max-w-[650px] mx-auto flex-1 shadow-xl bg-white bg-opacity-40  border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm relative z-2 p-4 md:p-8 text-black">
          <h1 className="font-bold text-lg mb-5">
            Total Amount : ${paymentInfo?.salary}
          </h1>

          <form onSubmit={handleSubmit(handleSubmit2)}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    fontWeight: "bold",
                    "::placeholder": {
                      color: "#3D3B40",
                      fontWeight: "bold",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <div className="form-control my-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onClick={() => setIsChecked(!isChecked)}
                  className="checkbox border-2 [--chkbg:theme(colors.primary)]"
                />
                <p className="font-semibold text-sm mt-1.5">
                  Save your payment info for next time
                </p>
              </label>
            </div>
            {isChecked && (
              <div className="space-y-3 mb-5">
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
                    country={"bd"}
                    value={countryCode}
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
                    required
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
              className="bg-[#433ebe] mt-5 w-full text-white font-semibold rounded-md py-2"
              type="submit"
              disabled={!stripe || !clientSecret}
            >
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
