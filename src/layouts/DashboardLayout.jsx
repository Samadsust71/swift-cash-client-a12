import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/shared/DahboardNavbar";
import LeftSidebar from "../components/shared/LeftSidebar";
import Footer from "../components/footer/Footer";
const DashboardLayout = () => {
  return (
    <div className="relative  ">
      <DashboardNavbar/>
      <div className="min-h-screen md:flex mt-[66px]">
        {/* Left Side: Sidebar Component */}
       <div className="fixed left-0 top-16">
       <LeftSidebar/>
       </div>
        <div className="flex-1  lg:ml-80">
          <div className="p-5">
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
        </div>
      </div>
      {/* Right Side: Dashboard Dynamic Content */}
      <Footer/>
    </div>
  );
};

export default DashboardLayout;
