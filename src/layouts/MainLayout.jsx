import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"


const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <div className="min-h-[calc(100vh-128px)]">
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
