import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from '../components/Loading'
import useAuth from '../hooks/useAuth'


const PrivateRoute = ({children}) => {
   
    const {user,loading} = useAuth()
    const location = useLocation()
    
    if (loading) {
        return <Loading/>
    }

    if (user) {
        return children
    }

  return <Navigate state={location?.pathname} to={'/login'} /> 
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}


export default PrivateRoute