import {  NavLink } from "react-router-dom";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";

// Helper function to generate sidebar links
const generateLinks = (links) => {
  return links.map(({ to, label }) => (
    <li key={to}>
      <NavLink to={to}>{label}</NavLink>
    </li>
  ));
};

const LeftSidebar = () => {
  const { user } = useAuth();
  const [userInfo] = useRole();

  // Define links based on roles
  const adminLinks = [
    { to: "adminHome", label: "Home" },
    { to: "manage-users", label: "Manage Users" },
    { to: "manage-tasks", label: "Manage Task" },
  ];

  const buyerLinks = [
    { to: "buyerHome", label: "Home" },
    { to: "add-tasks", label: "Add New Tasks" },
    { to: "my-tasks", label: "My Tasks" },
    { to: "purchase-coins", label: "Purchase Coins" },
    { to: "payment-history", label: "Payment History" },
  ];

  const workerLinks = [
    { to: "workerHome", label: "Home" },
    { to: "workerTaskList", label: "Task List" },
    { to: "workerSubmissions", label: "My Submissions" },
    { to: "workerWithdrawals", label: "Withdrawals" },
    
  ];

  // Determine which links to render
  const sidebarLinks =
    user && userInfo?.role === "Admin"
      ? generateLinks(adminLinks)
      : user && userInfo?.role === "Buyer"
      ? generateLinks(buyerLinks)
      :user && userInfo?.role === "Worker"? generateLinks(workerLinks):"";

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-bg-main text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {sidebarLinks}
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
