import PropTypes from "prop-types";

const BestWorkerCard = ({ worker }) => {
  const { name, photo } = worker || {};
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={photo} alt={name} className="h-40 w-40 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
      </div>
    </div>
  );
};
BestWorkerCard.propTypes = {
  worker: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
};

export default BestWorkerCard;
