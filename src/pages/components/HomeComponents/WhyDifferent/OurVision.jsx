import { TiTick } from "react-icons/ti";

const OurVision = () => {
  return (
    <div className="my-10">
      <h3 className="text-2xl font-inter font-bold mb-1 mt-8">
        Welcome to Our Vision
      </h3>
      <p className="text-slate-500  text-justify">
        To lead the way in unity spark through our groundbreaking project, unity
        spark. With unity spark, we aim to redefine the landscape of unity spark
        industry . We envision a future where propelling our industry forward
        and inspiring positive change on a global scale. Our unwavering
        commitment to excellence, innovation, and sustainability drives every
        aspect of our work unity spark, as we strive to set new standards and
        create lasting value . Together, we are shaping the future of unity
        spark and leaving a legacy of innovation and progress for generations.
      </p>

      <div>
        <p className="text-slate-500 text-justify">
          <span className="text-[20px] font-semibold text-slate-800">
            Unity Spark :
          </span>{" "}
          At Unity Spark, we revolutionize collaboration with our unique
          Chatting System, connecting team members through smart matching
          algorithms. Augmented user profiles provide a comprehensive view of
          individual achievements, fostering meaningful connections within our
          diverse community.
        </p>
      </div>

      <div>
        <p className="text-slate-500 text-justify">
          <span className="text-[20px] font-semibold text-slate-800">
            Smart notifications :
          </span>{" "}
          Smart notifications prioritize important messages, while an anonymous
          feedback channel encourages open comm unication and improvement. Join
          us in creating an innovative, efficient, and inclusive workplace
          culture at Unity Spark, where every feature is designed for a superior
          collaboration experience.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-inter font-bold my-2">
          {" "}
          What is Our Vision.
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

export default OurVision;
