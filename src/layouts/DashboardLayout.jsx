import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/shared/DahboardNavbar";
import LeftSidebar from "../components/shared/LeftSidebar";
// import Footer from "../components/footer/Footer";
import DashboardFooter from "../components/shared/DashboardFooter";
const DashboardLayout = () => {
  return (
    <div className="relative  ">
      <DashboardNavbar/>
      <div className="min-h-screen md:flex mt-[66px]">
        {/* Left Side: Sidebar Component */}
       <div className="fixed left-0 top-[66px]">
       <LeftSidebar/>
       </div>
        <div className="flex-1  lg:ml-80">
          <div className="p-5 min-h-screen">
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
          <DashboardFooter/>
        </div>
      </div>
      {/* Right Side: Dashboard Dynamic Content */}
      
    </div>
  );
};

export default DashboardLayout;
