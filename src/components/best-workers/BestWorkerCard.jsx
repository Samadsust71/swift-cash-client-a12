import PropTypes from "prop-types";
import coin from "../../assets/coin.gif";

const BestWorkerCard = ({ worker }) => {
  const { photo, coins,name } = worker || {};
  return (
    <div className="relative group w-64 h-64 overflow-hidden rounded-lg shadow-lg card-wrapper ">
      <div className="card-content relative w-full h-full bg-black overflow-hidden rounded-lg p-6">
        {/* Image */}
        <div className=" text-center flex justify-center items-center">
          <img
            src={photo}
            className="w-40 h-40 object-cover rounded-full"
            alt=""
          />
        </div>

        {/* Coin Data */}
        <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-lg text-white flex items-center space-x-2">
          <img src={coin} alt="Coin Icon" className="w-6 h-6" />
          <span className="font-bold text-lg">{coins}</span>
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
