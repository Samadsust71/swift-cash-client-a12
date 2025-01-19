import PropTypes from "prop-types";
import { format } from "date-fns";

const BestWorkerCard = ({ worker }) => {
  const { photo, coins, name,timestamp } = worker || {};
  return (
   <div className="card-wrapper p-6 rounded-lg h-40">
     <div className="card-content flex items-center justify-center gap-2 ">
      <div className="">
        <img src={photo} alt={name} className="h-20 w-20 object-cover rounded-full" />
      </div>
      <div className="space-y-4">
        <div className="text-xl font-semibold text-white">
          <span>{name?.slice(0,15)}</span>
        </div>
        <div className="text-white/70 font-bold">
          <span>Total Earning :</span>
          <span className=" font-bold"> {coins}</span>
        </div>
        <div className="text-white/70 font-bold">
          <span>Joined :</span>
          <span className=" font-bold"> {format(new Date(timestamp), "dd-MM-yyyy")}</span>
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
