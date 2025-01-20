import PropTypes from "prop-types"
import Loading from "../components/Loading"
import useRole from "../hooks/useRole"
import { Navigate } from "react-router-dom"



const WorkerRoute = ({children}) => {
    const [userInfo, isLoading] = useRole()
  
    if (isLoading) return <Loading />
    if (userInfo?.role === 'Worker') return children
    return <Navigate to='/dashboard' replace={true} />
  }
  
  WorkerRoute.propTypes = {
    children: PropTypes.element,
  }

export default WorkerRoute
