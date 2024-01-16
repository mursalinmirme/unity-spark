const ServiceCard = ({ service }) => {
  const { img, name, description } = service;
  return (
    <div>
      <div className="card card-compact  bg-base-100 shadow-xl border">
        <figure>
          <img className="h-40 w-full" src={img} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-[#248479]">{name}!</h2>
          <p className="text-justify">{description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-sm bg-[#248479] hover:bg-blue-400 text-white">
              {" "}
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
