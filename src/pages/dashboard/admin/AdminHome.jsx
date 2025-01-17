
import Loading from "../../../components/Loading";
import useAdmin from "../../../hooks/useAdmin";


const AdminHome = () => {
  
  const [adminInfo,isLoading] = useAdmin()
  
  if(isLoading) return <Loading/>
  console.log(adminInfo.totalWorkers)
  return (
    <div>
      Admin Home
    </div>
  )
}

export default AdminHome
