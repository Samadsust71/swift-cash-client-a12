import { Link } from "react-router-dom";

const LeftSidebar = () => {
  const sidebarLinks = (
    <>
      <li>
        <Link to="/dashboard/home">Home</Link>
      </li>
      <li>
        <a>TaskList</a>
      </li>
      <li>
        <a >My Submissions</a>
      </li>
      <li>
        <a >withdrawals</a>
      </li>
      
    </>
  );

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
