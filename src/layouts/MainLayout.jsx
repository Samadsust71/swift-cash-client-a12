import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import Footer from "../components/footer/Footer"


const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <div className="min-h-[calc(100vh-244px)] mt-[66px]">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default MainLayout
