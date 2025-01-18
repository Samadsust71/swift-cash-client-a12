import { NavLink } from "react-router-dom";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import { FaHistory, FaHome, FaTasks, FaUsers } from "react-icons/fa";
import { MdAddTask, MdPayment, MdTask } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";

// Helper function to generate sidebar links
const generateLinks = (links) => {
  return links.map(({ to, label,icon }) => (
    <li key={to}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          ` transition-colors duration-300 flex items-center gap-2 w-fit ${
            isActive
              ? "text-brand-primary font-semibold bg-surface px-2 py-1 rounded-lg"
              : "text-white font-normal hover:text-brand-primary"
          }`
        }
      >
        <span className="">{icon}</span> <span>{label}</span>
      </NavLink>
    </li>
  ));
};

const LeftSidebar = () => {
  const { user } = useAuth();
  const [userInfo] = useRole();

  // Define links based on roles
  const adminLinks = [
    { to: "adminHome", label: "Home", icon: <FaHome /> },
    { to: "manage-users", label: "Manage Users", icon: <FaUsers /> },
    { to: "manage-tasks", label: "Manage Task", icon: <FaTasks /> },
  ];
  
  const buyerLinks = [
    { to: "buyerHome", label: "Home", icon: <FaHome /> },
    { to: "add-tasks", label: "Add New Tasks", icon: <MdAddTask /> },
    { to: "my-tasks", label: "My Tasks", icon: <MdTask /> },
    { to: "purchase-coins", label: "Purchase Coins", icon: <MdPayment /> },
    { to: "payment-history", label: "Payment History", icon: <FaHistory /> },
  ];
  
  const workerLinks = [
    { to: "workerHome", label: "Home", icon: <FaHome /> },
    { to: "workerTaskList", label: "Task List", icon: <AiOutlineOrderedList /> },
    { to: "workerSubmissions", label: "My Submissions", icon: <MdTask /> },
    { to: "workerWithdrawals", label: "Withdrawals", icon: <MdPayment /> },
  ];

  // Determine which links to render
  const sidebarLinks =
    user && userInfo?.role === "Admin"
      ? generateLinks(adminLinks)
      : user && userInfo?.role === "Buyer"
      ? generateLinks(buyerLinks)
      : user && userInfo?.role === "Worker"
      ? generateLinks(workerLinks)
      : "";

  return (
    <div className="drawer lg:drawer-open bg-bg-main">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="transition-all duration-300 ease-in-out text-white min-h-full w-80 px-8 py-10 space-y-4 shadow-md border-r border-brand-primary/10">
          {/* Sidebar content here */}
          {sidebarLinks}
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
