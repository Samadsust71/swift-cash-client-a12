import { Navigate } from "react-router-dom"
import Loading from "../components/Loading"
import useRole from "../hooks/useRole"
import PropTypes from "prop-types"


const AdminRoute = ({ children }) => {
    const [userInfo, isLoading] = useRole()
  
    if (isLoading) return <Loading />
    if (userInfo?.role === 'Admin') return children
    return <Navigate to='/dashboard'  />
  }
  
  AdminRoute.propTypes = {
    children: PropTypes.element,
  }
  
  export default AdminRoute