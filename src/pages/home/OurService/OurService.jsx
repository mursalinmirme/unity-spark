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
    <div>
      <h1 className="text-3xl text-center text-[#248479] font-bold mt-10">
        {" "}
        Our Service{" "}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:px-24 mb-16 mt-8 p-4 ">
        {services?.map((service) => (
          <ServiceCard key={service.id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default OurService;
