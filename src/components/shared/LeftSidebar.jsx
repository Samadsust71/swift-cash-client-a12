import { NavLink } from "react-router-dom";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import { FaHistory, FaHome, FaTasks, FaUsers } from "react-icons/fa";
import { MdAddTask, MdPayment, MdTask } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";


const LeftSidebar = () => {
  const { user } = useAuth();
  const [userInfo] = useRole();
  const sideBbarLinks= <>
  
  {/* admin link */}
  {user && userInfo?.role == "Admin" && <>
  
    <li>
      <NavLink
      to={'/dashboard/adminHome'}
        className={({ isActive }) =>
          ` transition-colors duration-300 flex items-center gap-2 w-fit ${
            isActive
              ? "text-brand-primary font-semibold bg-surface px-2 py-1 rounded-lg"
              : "text-white font-normal hover:text-brand-primary"
          }`
        }
      >
        <span className=""><FaHome /></span> <span>Home</span>
      </NavLink>
    </li>
  <li>
      <NavLink
      to={'/dashboard/manage-users'}
        className={({ isActive }) =>
          ` transition-colors duration-300 flex items-center gap-2 w-fit ${
            isActive
              ? "text-brand-primary font-semibold bg-surface px-2 py-1 rounded-lg"
              : "text-white font-normal hover:text-brand-primary"
          }`
        }
      >
        <span className=""><FaUsers /></span> <span>Manage Users</span>
      </NavLink>
    </li>
  <li>
      <NavLink
      to={'/dashboard/manage-tasks'}
        className={({ isActive }) =>
          ` transition-colors duration-300 flex items-center gap-2 w-fit ${
            isActive
              ? "text-brand-primary font-semibold bg-surface px-2 py-1 rounded-lg"
              : "text-white font-normal hover:text-brand-primary"
          }`
        }
      >
        <span className=""><FaTasks /></span> <span>Manage Task</span>
      </NavLink>
    </li>
  
  
  
  </>}
  
  {/* buyer links */}
  {user && userInfo?.role == "Buyer" && <>
  
  
    <li>
      <NavLink
      to={'/dashboard/buyerHome'}
        className={({ isActive }) =>
          ` transition-colors duration-300 flex items-center gap-2 w-fit ${
            isActive
              ? "text-brand-primary font-semibold bg-surface px-2 py-1 rounded-lg"
              : "text-white font-normal hover:text-brand-primary"
          }`
        }
      >
        <span className=""><FaHome /></span> <span>Home</span>
      </NavLink>
    </li>
  <li>
      <NavLink
      to={'/dashboard/add-tasks'}
        className={({ isActive }) =>
          ` transition-colors duration-300 flex items-center gap-2 w-fit ${
            isActive
              ? "text-brand-primary font-semibold bg-surface px-2 py-1 rounded-lg"
              : "text-white font-normal hover:text-brand-primary"
          }`
        }
      >
        <span className=""><MdAddTask /></span> <span>Add New Tasks</span>
      </NavLink>
    </li>
  <li>
      <NavLink
      to={'/dashboard/my-tasks'}
        className={({ isActive }) =>
          ` transition-colors duration-300 flex items-center gap-2 w-fit ${
            isActive
              ? "text-brand-primary font-semibold bg-surface px-2 py-1 rounded-lg"
              : "text-white font-normal hover:text-brand-primary"
          }`
        }
      >
        <span className=""><MdTask /></span> <span>My Tasks</span>
      </NavLink>
    </li>
  <li>
      <NavLink
      to={'/dashboard/purchase-coins'}
        className={({ isActive }) =>
          ` transition-colors duration-300 flex items-center gap-2 w-fit ${
            isActive
              ? "text-brand-primary font-semibold bg-surface px-2 py-1 rounded-lg"
              : "text-white font-normal hover:text-brand-primary"
          }`
        }
      >
        <span className=""><MdPayment /></span> <span>Purchase Coins</span>
      </NavLink>
    </li>
  <li>
      <NavLink
      to={'/dashboard/payment-history'}
        className={({ isActive }) =>
          ` transition-colors duration-300 flex items-center gap-2 w-fit ${
            isActive
              ? "text-brand-primary font-semibold bg-surface px-2 py-1 rounded-lg"
              : "text-white font-normal hover:text-brand-primary"
          }`
        }
      >
        <span className=""><FaHistory /></span> <span>Payment History</span>
      </NavLink>
    </li>
  
  
  
  
  
  </>}
  
  
  {/* worker links */}
  {user && userInfo?.role == "Worker" && <>
  
    <li>
      <NavLink
      to={'/dashboard/workerHome'}
        className={({ isActive }) =>
          ` transition-colors duration-300 flex items-center gap-2 w-fit ${
            isActive
              ? "text-brand-primary font-semibold bg-surface px-2 py-1 rounded-lg"
              : "text-white font-normal hover:text-brand-primary"
          }`
        }
      >
        <span className=""><FaHome /></span> <span>Home</span>
      </NavLink>
    </li>
  <li>
      <NavLink
      to={'/dashboard/workerTaskList'}
        className={({ isActive }) =>
          ` transition-colors duration-300 flex items-center gap-2 w-fit ${
            isActive
              ? "text-brand-primary font-semibold bg-surface px-2 py-1 rounded-lg"
              : "text-white font-normal hover:text-brand-primary"
          }`
        }
      >
        <span className=""><AiOutlineOrderedList /></span> <span>Task List</span>
      </NavLink>
    </li>
  <li>
      <NavLink
      to={'/dashboard/workerSubmissions'}
        className={({ isActive }) =>
          ` transition-colors duration-300 flex items-center gap-2 w-fit ${
            isActive
              ? "text-brand-primary font-semibold bg-surface px-2 py-1 rounded-lg"
              : "text-white font-normal hover:text-brand-primary"
          }`
        }
      >
        <span className=""><MdTask /></span> <span>My Submissions</span>
      </NavLink>
    </li>
  <li>
      <NavLink
      to={'/dashboard/workerWithdrawals'}
        className={({ isActive }) =>
          ` transition-colors duration-300 flex items-center gap-2 w-fit ${
            isActive
              ? "text-brand-primary font-semibold bg-surface px-2 py-1 rounded-lg"
              : "text-white font-normal hover:text-brand-primary"
          }`
        }
      >
        <span className=""><MdPayment /></span> <span>Withdrawals</span>
      </NavLink>
    </li>
  </>}
  
  </> 
 

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side  pt-20 lg:pt-10 ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="transition-all duration-300 ease-in-out text-white min-h-full w-80 px-8 py-10 space-y-8 shadow-md  bg-bg-main z-[1] ">
          {/* Sidebar content here */}
          {sideBbarLinks}
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
