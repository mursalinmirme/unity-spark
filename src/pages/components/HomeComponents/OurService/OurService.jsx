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
    <div className="py-12 services">
      <h2>Empowering Your Journey</h2>
      <h6>Our solutions are useful for driving innovation, fostering collaboration, and achieving <br /> success in your business endeavors.</h6>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:px-24 mb-16 mt-8 p-4">
        {services?.map((service) => (
          <ServiceCard key={service.id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default OurService;
