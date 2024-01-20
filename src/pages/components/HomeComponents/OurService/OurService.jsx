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
      <h6>Empower innovation, foster success with our collaborative solutions.</h6>
      <div className="service_container" style={{alignItems: 'stretch'}}>
        {services?.map((service) => (
          <ServiceCard key={service.id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default OurService;
