import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentDetails from "./PaymentDetails";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Ok189GX4GJwDhejx9sns7kEWjAncP9PJsPuFW16df3MOvDWisWEuhvNg22gdp0dWr3wSgYHUNZkiYrjLQeGcyJ800ZzF4w1i9"
);

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
