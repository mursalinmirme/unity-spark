import testimonialBg from "../../../../assets/images/testimonials//testimonials_bg.jpg"

const Newsletter = () => {
    const newsBG = {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${testimonialBg})`
    }

    return (
        <div className="newsletter">
            <div className="newsletter_container" style={newsBG}>
                <div className="second_container">
                    <h2>Our Newsletter</h2>
                    <p>Subscribe our newsletter to get update from us</p>
                    <form>
                        <input type="email" placeholder="Enter Your Email...."  />
                        <button className="bg-primary" style={{background: '#433EBE'}}>Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;