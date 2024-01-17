import { useEffect } from "react";
import { useState } from "react";
import ServiceCard from "./ServiceCard";

const OurService = () => {
  const [services, serServices] = useState([]);

  useEffect(() => {
    fetch("/service.json")
      .then((res) => res.json())
      .then((data) => serServices(data));
  }, []);

  return (
    <div className="py-10">
      <h2 className="text-3xl text-center text-[#248479] font-bold mt-10">Empowering Your Journey</h2>
      <p className="text-center px-64 mt-3 font-inter font-medium">Our solutions are useful for driving innovation, fostering collaboration, and achieving success in your business endeavors.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:px-24 mb-16 mt-8 p-4">
        {services?.map((service) => (
          <ServiceCard key={service.id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default OurService;
