import { FaDollarSign, FaTasks } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import PropTypes from "prop-types";

const BuyerStates = ({ buyerStat }) => {
  const { pendingTaskCount, totalPayments, totalTaskCount } = buyerStat || {};
  return (
    <div className="grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Task */}
      <div className=" ">
        <div className="relative flex flex-col bg-clip-border rounded-xl  text-white  shadow-md bg-surface">
          <div
            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute mt-2 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
          >
            <FaTasks className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-semibold text-blue-gray-600">
              Total Task
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {totalTaskCount}
            </h4>
          </div>
        </div>
      </div>
      {/* Pending task */}
      <div className="">
        <div className="relative flex flex-col bg-clip-border rounded-xl  text-white  shadow-md bg-surface">
          <div
            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute mt-2 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
          >
            <MdOutlinePendingActions className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-semibold text-blue-gray-600">
              Pending Task
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {pendingTaskCount}
            </h4>
          </div>
        </div>
      </div>
      {/* Total Payment */}
      <div className=" bg-bg-main rounded-md">
        <div className="relative flex flex-col bg-clip-border rounded-xl  text-white  shadow-md bg-surface">
          <div
            className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute mt-2 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
          >
            <FaDollarSign className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-semibold text-blue-gray-600">
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
BuyerStates.propTypes = {
  buyerStat: PropTypes.shape({
    pendingTaskCount: PropTypes.number,
    totalPayments: PropTypes.number,
    totalTaskCount: PropTypes.number,
  }),
};

export default BuyerStates;
