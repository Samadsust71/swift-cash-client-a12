import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading";
import useRole from "../../hooks/useRole";



const MyHome = () => {
    const [userInfo, isLoading] = useRole()
    if(isLoading){
        return <Loading/>
    }
    if(userInfo?.role === 'Worker'){
        return <Navigate to={'/dashboard/workerHome'}></Navigate>
    }
    if(userInfo?.role==='Buyer'){
        return <Navigate to={'/dashboard/buyerHome'}></Navigate>
    }
    return (
        <div>
            <Navigate to={'/dashboard/adminHome'}></Navigate>
        </div>
    );
};

export default MyHome;