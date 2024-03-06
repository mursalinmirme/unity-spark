const FAQs = () => {
  return (
    <div className="md:my-10 max-w-[92%] lg:max-w-[1200px] mx-auto">
      {/* <img
        className=" rounded-lg w-full"
        src="https://i.ibb.co/9TKr4kF/FAQ-image.png"
        alt=""
      /> */}
      <div className="py-10">
        <h3 className="text-3xl font-bold font-inter">
          {" "}
          <span className="text-primary">Frequently</span>{" "}
          <span className="border-b-4 border-second">Asked </span> Question
        </h3>
        {/*  Just Question Part*/}
        <div className="space-y-4 mt-10">
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What is Regular License?
            </div>
            <div className="collapse-content">
              <p>
                In simple terms, Regular License means your end product is
                distributed for free
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              What is Extended License?
            </div>
            <div className="collapse-content">
              <p>
                In simple terms, Extended License means your end product may be
                sold or otherwise limited to paying customers.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              What will you get?
            </div>
            <div className="collapse-content">
              <p>
                All HTML files, All Angular files, All Materialize CSS files,
                CSS Files, SCSS Files, JS Files, Documentation, Reliable
                Technical Support System, Lifetime Template Updates, Template
                Documentation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
