import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import WorkerStates from "../../../components/worker/WorkerStates";


const WorkerHome = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()
  const {
    data: workerStat = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["worker-stat", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/worker-stats/${user?.email}`);
      return data;
    },
  });
  if(isLoading) return <Loading/>
  if(isError) console.log("Error in Worker Home", isError)
    
  return (
    <div>
     <WorkerStates workerStat={workerStat} />
    </div>
  )
}

export default WorkerHome
