import PropTypes from "prop-types";
import coin from "../../assets/coin.gif";

const BestWorkerCard = ({ worker }) => {
  const { photo, coins,name } = worker || {};
  return (
    <div className="relative group w-[100%] h-80 overflow-hidden rounded-lg shadow-lg card-wrapper ">
      <div className="card-content relative w-full h-full bg-bg-main overflow-hidden rounded-lg p-6 space-y-4">
        {/* Image */}
        <div className=" ">
          <img
            src={photo}
            className="w-full h-40 object-cover rounded-lg "
            alt=""
          />
        </div>

        {/* Coin Data */}
        <div className=" bottom-4 left-4 bg-brand-primary/20 px-4 py-2 rounded-lg text-white flex items-center space-x-2">
          <img src={coin} alt="Coin Icon" className="w-6 h-6" />
          <span className="font-bold text-lg">{coins}</span>
          {/* <span>{name}</span> */}
        </div>
        <div className=" bottom-4 right-4 bg-brand-primary/20 px-4 py-2 rounded-lg text-white flex items-center space-x-2">
          <span>{name}</span>
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
