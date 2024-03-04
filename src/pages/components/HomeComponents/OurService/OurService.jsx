import ServiceCard from "./ServiceCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const OurService = () => {
  const axiosPublic = useAxiosPublic()
  
  const {data : services = []} = useQuery({
      queryKey : ["services"],
      queryFn : async () => {
        const res = await axiosPublic.get("/services_data")
        return res?.data
      }

  })

  return (
    <div className="py-12 services">
      <h2>Empowering Your Journey</h2>
      <h6>Empower innovation, foster success with our collaborative solutions.</h6>
      <div className="service_container" style={{alignItems: 'stretch'}}>
        {services?.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default OurService;
