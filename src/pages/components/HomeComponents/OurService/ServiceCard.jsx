/* eslint-disable react/prop-types */
const ServiceCard = ({ service }) => {
  const { img, name, description } = service;

  return (
    <div>
      <div className="service_card">
        <div className="image_container">
          <img src={img} alt="service" />
        </div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
