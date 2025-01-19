
import { FaCoins, FaDollarSign, FaUserAlt, FaUsers } from "react-icons/fa"

import PropTypes from 'prop-types';

const AdminStates = ({adminInfo}) => {
    
    const {
        totalAvailableCoins,
        totalBuyers,
        totalPayments,
        totalWorkers
    } = adminInfo || {}
  return (
    <div className="grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      {/*Total Worker */}
      <div className="">
        <div className="relative flex flex-col bg-clip-border rounded-xl  text-white  shadow-md bg-surface">
          <div
            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute mt-2 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
          >
            <FaUsers className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
            Total Worker
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {totalWorkers}
            </h4>
          </div>
        </div>
      </div>
      {/* total buyer */}
      <div className="">
        <div className="relative flex flex-col bg-clip-border rounded-xl  text-white  shadow-md bg-surface">
          <div
            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute mt-2 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
          >
            <FaUserAlt className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
            Total Buyer
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {totalBuyers}
            </h4>
          </div>
        </div>
      </div>
      {/* Total Coins */}
      <div className="">
        <div className="relative flex flex-col bg-clip-border rounded-xl  text-white  shadow-md bg-surface">
          <div
            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute mt-2 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
          >
            <FaCoins className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Total Coin
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {totalAvailableCoins}
            </h4>
          </div>
        </div>
      </div>
      {/* total payments */}
      <div className="">
        <div className="relative flex flex-col bg-clip-border rounded-xl  text-white  shadow-md bg-surface">
          <div
            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute mt-2 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
          >
            <FaDollarSign className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Total Payment
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              ${totalPayments}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
AdminStates.propTypes = {
  adminInfo: PropTypes.shape({
    totalAvailableCoins: PropTypes.number,
    totalBuyers: PropTypes.number,
    totalPayments: PropTypes.number,
    totalWorkers: PropTypes.number,
  })
};

export default AdminStates;

