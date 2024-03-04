import { TiTick } from "react-icons/ti";

const Support = () => {
  return (
    <div className="py-10 max-w-[92%] lg:max-w-[1200px] mx-auto">
      {/* <img
        style={{ backgroundImage: "cover" }}
        className="h-[500px] w-full"
        src="https://managementweekly.org/wp-content/uploads/2022/03/perfectionism_featured.jpg"
        alt=""
      /> */}
      <div>
        <h3 className="text-2xl font-inter font-bold my-2">
          Welcome to Unity Spark Support{" "}
        </h3>
        <p className="text-slate-700  lg:text-justify">
          At unity spark, we are dedicated to providing excellent support to our
          clients. Whether you need help with technical issues, account
          management, or have general inquiries, our support team is here to
          assist you.
        </p>

        <div className="my-5">
          <h2 className="text-2xl font-bold font-inter py-2">
            How Can We Help?
          </h2>

          <h3 className="text-[20px] font-semibold font-inter py-2">
            Technical Support
          </h3>
          <p className="flex gap-2">
            <TiTick className="text-[20px] text-slate-500 " />
            Live Chat: Connect with a support agent instantly through our live
            chat feature.
          </p>
          <p className="flex gap-2">
            <TiTick className="text-[20px] text-slate-500 " />
            Email Support: Send us an email at{" "}
            <span className="text-blue-600">teamCodeWizards@gmail.com</span>
            expect a response within 24 hours.
          </p>
          <p className="flex gap-2">
            <TiTick className="text-[20px] text-slate-500" />
            Phone Support: Call our toll-free number at [1-800-123-4567] during
            business hours for immediate assistance.
          </p>

          {/* Account Assistance */}
          <h3 className="text-[20px] font-semibold font-inter py-2">
            Account Assistance
          </h3>
          <p className="flex gap-2">
            <TiTick className="text-[20px] text-slate-500" />
            Billing Questions: Contact us if you have questions about invoices,
            payments plans.
          </p>
          <p className="flex gap-2">
            <TiTick className="text-[20px] text-slate-500" />
            Account Management: Reach out if you need help updating your account
            information or managing user access.
          </p>
          {/* Feedback and Suggestions */}
          <h3 className="text-[20px] font-semibold font-inter py-2">
            Feedback and Suggestions
          </h3>
          <p className="flex gap-2">
            <TiTick className="text-[20px] text-slate-500" />
            Share Your Thoughts: We value your feedback and are always looking
            for ways to improve. Let us know how we can better serve you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;
