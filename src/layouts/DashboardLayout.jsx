import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/shared/DahboardNavbar";
import LeftSidebar from "../components/shared/LeftSidebar";
import DashboardFooter from "../components/shared/DashboardFooter";
const DashboardLayout = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <div className="min-h-screen mt-24">
        {/* Left Side: Sidebar Component */}

        <div className="fixed min-h-screen  bg-bg-main z-30 left-0 top-24">
          <LeftSidebar />
        </div>
        <div className="flex-1  lg:ml-80">
          <div className="p-5 min-h-[calc(100vh-104px)]">
            <Outlet />
          </div>
          <DashboardFooter />
        </div>
        
      </div>
    </div>
  );
};

export default DashboardLayout;
