import { Navigate } from "react-router-dom"
import Loading from "../components/Loading"
import useRole from "../hooks/useRole"
import PropTypes from "prop-types"


const BuyerRoute = ({children}) => {
    const [userInfo, isLoading] = useRole()
  
    if (isLoading) return <Loading />
    if (userInfo?.role === 'Buyer') return children
    return <Navigate to='/dashboard'  />
  }
  
  BuyerRoute.propTypes = {
    children: PropTypes.element,
  }

export default BuyerRoute
