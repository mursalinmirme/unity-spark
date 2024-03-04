import { useContext, useState } from "react";
import { toast } from 'sonner';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Provider/AuthProvider";
import testimonialBg from "../../../../assets/images/testimonials/testimonial.jpg";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUserId from "../../../../hooks/useUserId";

const Newsletter = () => {
  const newsBG = {
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${testimonialBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  };

  const { user } = useContext(AuthContext);
  const [userId] = useUserId();
  const axiosPublic = useAxiosPublic();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // handle subscribe newsletter system
  const handleNewsLetter = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;
    const email = e.target.email.value;
    const newSubscriber = {
      email: email,
      userInfo: userId?._id,
    };
    const emailInfo = {
      email: email,
      name: user?.displayName,
    };
    // post a new subscriber
    axiosPublic
      .post("/subscriber", newSubscriber)
      .then((res) => {
        console.log(res.data);
        if (res.data === "exist") {
          toast.error("You have already subscribed.");
          setIsSubmitting(false)
          return;
        }

        axiosPublic
          .post("/subscriber-email-sent", emailInfo)
          .then(() => {
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Subscribed Successfully",
              text: "Stay Connected Receive Updates with Our Newsletter.",
              showConfirmButton: false,
              timer: 3000,
            });
            form.reset();
            setIsSubmitting(false)
          })
          .catch((err) => {
            toast.error(err.message);
            setIsSubmitting(false)
          });
      })
      .catch((err) => {
        console.log(err.message);
        setIsSubmitting(false)
      });
  };

  return (
    <div className="newsletter" style={newsBG}>
      <div className="newsletter_container">
        <div className="second_container">
          <h2>Our Newsletter</h2>
          <p>Subscribe our newsletter to get update from us</p>
          {user?.email ? (
            <form onSubmit={handleNewsLetter}>
              <input
                name="email"
                type="email"
                placeholder="Enter Your Email...."
                required
              />
              <button className="bg-primary text-white flex justify-center items-center h-10 md:h-auto">
                {
                    isSubmitting ? <span className="loading loading-spinner loading-md"></span> : 'Subscribe'
                }
              </button>
            </form>
          ) : (
            <form>
              <input
                name="email"
                type="email"
                placeholder="Enter Your Email...."
              />
              <Link className="bg-primary text-white flex justify-center items-center h-10 w-full md:w-auto md:h-auto md:rounded-e-xl" to={"/signin"}>
                <button className="">
                  Subscribe
                </button>
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
