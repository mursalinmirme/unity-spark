import { TiTick } from "react-icons/ti";
const RecruitmentService = () => {
  return (
    <div className="my-10 max-w-[92%] lg:max-w-[1200px] mx-auto">
      {/* <img
        className="rounded-lg"
        src="https://globaljob.com.np/uploads/service/4494recruitment-services-2.jpg"
        alt=""
      /> */}
      <h3 className="text-2xl font-inter font-bold mb-1">
        Welcome to Our Recruitment Services
      </h3>
      <p className="text-slate-500  text-justify">
        At Unity Spark, we understand that finding the right talent is crucial
        for the success of your business. Our Recruitment Services are designed
        to the hiring process, saving you time and resources while ensuring you
        attract top-notch candidates who are the perfect fit for your
        organizations needs.
      </p>

      <div>
        <h3 className="text-2xl font-inter font-bold my-2"> Our Approach.</h3>
        <p className="text-slate-500 text-justify">
          We take a personalized approach to recruitment, tailoring our services
          to meet the unique requirements of each client. Whether you are a
          startup seeking your first employee or a multinational corporation
          expanding your team, we have the expertise and resources to support
          your hiring goals.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-inter font-bold my-2">
          {" "}
          What Sets Us Apart.
        </h3>

        <div className="text-slate-500 text-justify space-y-2">
          <p className="flex gap-2">
            <TiTick className="text-2xl" />
            Customized Solutions: We understand that every business is
            different. That is why we work closely with you to develop
            customized recruitment strategies that align with your company
            culture, values, and objectives.
          </p>
          <p className="flex gap-2">
            <TiTick className="text-2xl" />
            Comprehensive Candidate Screening: We go beyond resumes and
            qualifications, conducting thorough assessments to ensure that
            candidates not only have the right skills but also fit seamlessly
            into your organization.
          </p>
          <p className="flex gap-2">
            <TiTick className="text-2xl" />
            Time and Cost Efficiency: With our efficient processes and extensive
            network, we help you reduce time-to-hire and minimize recruitment
            costs without compromising on quality.
          </p>
          <p className="flex gap-2">
            <TiTick className="text-2xl" />
            Continuous Support: Our commitment to your success does not end with
            the placement. We provide ongoing support to both clients and
            candidates to ensure a smooth transition and long-term satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentService;
