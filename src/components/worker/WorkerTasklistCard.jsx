import { motion } from "framer-motion";
import { format } from "date-fns";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const WorkerTasklistCard = ({ task }) => {
  const {
    _id,
    task_title,
    task_image_url,
    required_workers,
    payable_amount,
    deadline,
    buyer,
  } = task || {};

  console.log(task);
  return (
    <Link to={`taskDetails/${_id}`} className="cursor-pointer">
      <motion.div
        whileHover={{ scale: 1.03 }}
        className=" flex flex-col  w-full bg-gradient-to-t to-brand-primary/20 from-surface text-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Image Section */}
        <div>
          <img
            src={task_image_url}
            alt={task_title}
            className="w-full h-40 object-cover"
          />
        </div>
        {/* Content Section */}

        <div className="flex items-center justify-between flex-wrap px-4 mt-2">
          <div className="flex items-center bg-brand-primary/10 text-brand-primary px-2 py-1 text-xs  rounded-full w-fit">
            <span>Vacancy:</span>
            <span className=" ">{required_workers}</span>
          </div>
          <div className="flex items-center bg-brand-primary/10 text-brand-primary px-3 py-1 text-xs  rounded-full w-fit">
            <span>Coins:</span>
            <span className=" ">{payable_amount}</span>
          </div>
        </div>

        <div className="flex-grow p-4 space-y-2">
          <h3 className="text-lg font-semibold">{task_title?.slice(0,70)}  </h3>
          <div className="flex items-center gap-2 w-fit text-sm text-gray-400">
            <span>Buyer:</span>
            <span className=" ">{buyer?.name || "N/A"}</span>
          </div>
          <div className=" flex items-center gap-2 text-sm text-gray-400">
            <span>Deadline:</span>
            <span>{format(new Date(deadline), "dd-MM-yyyy")}</span>
          </div>
        </div>

        {/* Footer */}

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileHover={{ opacity: 1, y: 5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="pb-4 pl-4"
        >
          <motion.button
            className="bg-[#17413E] shadow-brand-primary/10 shadow-inner  px-4 py-2 rounded-lg text-sm font-medium"
            whileTap={{ scale: 0.9 }}
          >
            View Details
          </motion.button>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default WorkerTasklistCard;
