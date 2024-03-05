import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentDetails from "./PaymentDetails";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_stripePromise);

const Payment = () => {
  const location = useLocation();
  console.log(location.state);

  const paymentInfo = location.state;
  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentDetails paymentInfo={paymentInfo}></PaymentDetails>
      </Elements>
    </div>
  );
};

export default Payment;
