import PropTypes from "prop-types";


const BestWorkerCard = ({ worker }) => {
  const { photo, coins, name } = worker || {};
  return (
   <div className="card-wrapper h-40 ">
     <div className="card-content flex items-center justify-center gap-2 bg-gradient-to-t to-brand-primary/20 from-surface">
      <div>
        <img src={photo} alt={name} className="h-20 w-20 object-cover rounded-full" />
      </div>
      <div className="space-y-4">
        <div className="text-2xl text-brand-primary">
          <span>{name}</span>
        </div>
        <div className="text-white">
          <span>Coins Earned :</span>
          <span className="text-brand-primary"> {coins}</span>
        </div>
      </div>
    </div>
   </div>
  );
};
BestWorkerCard.propTypes = {
  worker: PropTypes.shape({
    photo: PropTypes.string,
    coins: PropTypes.number,
  }).isRequired,
};

export default BestWorkerCard;
