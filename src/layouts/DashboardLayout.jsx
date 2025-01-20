import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/shared/DahboardNavbar";
import LeftSidebar from "../components/shared/LeftSidebar";
import DashboardFooter from "../components/shared/DashboardFooter";
const DashboardLayout = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <div className="min-h-screen mt-[66px]">
        {/* Left Side: Sidebar Component */}

        <div className="fixed  left-0 top-[66px]">
          <LeftSidebar />
        </div>
        <div className="flex-1  lg:ml-80">
          <div className="p-5 min-h-screen">
            <Outlet />
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;
