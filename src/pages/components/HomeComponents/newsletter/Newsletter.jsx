import testimonialBg from "../../../../assets/images/testimonials//testimonials_bg.jpg"
const Newsletter = () => {
    return (
        <div className="w-full lg:w-10/12 mx-auto h-auto md:h-[300px] lg:h-[450px] relative">
            <img className="w-full h-full object-fit lg:rounded-xl" src={testimonialBg} alt="" />
            <div className="absolute top-0 left-0 w-full h-full lg:p-20">
                <div className="bg-[#000000b3] w-full h-full flex justify-center items-center flex-col rounded-2xl">
                    <h2 className="text-2xl lg:text-4xl text-white text-center font-semibold">Our Newsletter</h2>
                    <p className="text-center text-white mt-2.5 lg:mt-2 text-sm lg:text-base">Subscribe our newsletter to get update from us</p>
                        <form className="md:w-1/2 mx-auto border rounded-xl flex mt-8 lg:mt-7">
                          <input className="flex-1 px-5 py-2.5 lg:py-3.5 rounded-s-xl bg-[#D9D9D933] border-none outline-none text-white" type="email" placeholder="Enter Your Email...."  />
                          <button className="rounded-none rounded-r-xl lg:px-10">Subscribe</button>
                        </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;