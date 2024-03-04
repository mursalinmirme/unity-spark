import { TiTick } from "react-icons/ti";

const Accessibility = () => {
  return (
    <div className="max-w-[92%] lg:max-w-[1200px] mx-auto">
      <div className="py-5">
        <h3 className="text-3xl font-bold font-inter py-3">
          {" "}
          Accessibility Statement
        </h3>
        <p>
          Welcome to unity spark ! We are committed to ensuring digital
          accessibility for people of all abilities. We are continually
          improving the user experience for everyone and applying the relevant
          accessibility standards.
        </p>

        <h3 className="text-[22px] font-bold font-inter mt-3 mb-2">
          Our Commitment
        </h3>
        <p>
          At unity spark, we strive to provide a website that is accessible to
          all users, regardless of technology or ability. We believe that every
          person has the right to access information and services online, and we
          are dedicated to making that a reality for everyone who visits our
          website.
        </p>
        <h3 className="text-[22px] font-bold font-inter mt-3 mb-2">
          Accessibility Features
        </h3>
        <p className="flex gap-2">
          <TiTick className="text-[20px] text-slate-500 " />
          Keyboard Navigation: Our website is designed to be fully navigable
          using only a keyboard, ensuring that users who cannot use a mouse can
          still access all content and functionality.
        </p>
        <p className="flex gap-2">
          <TiTick className="text-[20px] text-slate-500 " />
          Screen Reader Compatibility: We have optimized our website to work
          seamlessly with screen reader software, allowing users with visual
          impairments to access and interact with the content.
        </p>
        <p className="flex gap-2">
          <TiTick className="text-[20px] text-slate-500 " />
          Alternative Text for Images: All images on our website are accompanied
          by descriptive alternative text, providing meaningful descriptions for
          users who rely on screen readers or have images disabled.
        </p>
        <p className="flex gap-2">
          <TiTick className="text-[20px] text-slate-500 " />
          Color Contrast: We carefully choose color combinations to ensure
          sufficient contrast between text and background elements, improving
          readability for users with low vision or color blindness.
        </p>
        <p className="flex gap-2">
          <TiTick className="text-[20px] text-slate-500 " />
          Resizable Text: Users can adjust the size of text on our website to
          better suit their preferences, ensuring that content remains legible
          for individuals with visual impairments.
        </p>
        <p className="flex gap-2">
          <TiTick className="text-[20px] text-slate-500 " />
          Accessible Forms: Our web forms are designed with accessibility in
          mind, featuring clear labels, instructions, and error messages to
          assist users in completing tasks accurately.
        </p>

        <h3 className="text-[22px] font-bold font-inter mt-3 mb-2">
          Feedback and Assistance
        </h3>
        <p>
          We are committed to continuously improving the accessibility of our
          website. If you encounter any accessibility barriers or have
          suggestions for improvement, please contact us.
        </p>
        <h3 className="text-[22px] font-bold font-inter mt-3 mb-2">
          Contact Us
        </h3>
        <p>
          If you have any questions or concerns regarding this Disclaimer,
          please contact us at{" "}
          <span className="text-blue-500"> teamCodeWizard@gmail.com.</span>
        </p>
      </div>
    </div>
  );
};

export default Accessibility;
