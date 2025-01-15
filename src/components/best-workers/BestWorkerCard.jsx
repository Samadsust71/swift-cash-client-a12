

import PropTypes from 'prop-types';

const BestWorkerCard = ({ worker }) => {
  const {photo, coins} = worker || {}
  return (
    <div className="relative group w-64 h-64 overflow-hidden rounded-lg shadow-lg">
      {/* Border Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 rounded-lg animate-border"></div>

      <div className="relative w-full h-full bg-black overflow-hidden rounded-lg">
        {/* Image */}
        <img
          src={photo}
          alt="Best Worker"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {/* Coin Data */}
        <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-lg text-white flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1183/1183672.png"
            alt="Coin Icon"
            className="w-6 h-6"
          />
          <span className="font-bold text-lg">{coins}</span>
        </div>
      </div>
    </div>
  );
}
BestWorkerCard.propTypes = {
  worker: PropTypes.shape({
    photo: PropTypes.string,
    coins: PropTypes.number,
  }).isRequired,
};

export default BestWorkerCard;


