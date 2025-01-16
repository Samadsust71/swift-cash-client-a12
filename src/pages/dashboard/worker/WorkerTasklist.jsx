import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import Loading from "../../../components/Loading";
import WorkerTasklistCard from "../../../components/worker/WorkerTasklistCard";


const WorkerTasklist = () => {
  const axiosSecure = useAxiosSecure()
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["task-list"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-task`);
      return data;
    },
  });
  
  if(isError) console.log(isError)
  
  return (
    <div className="py-10 flex flex-col justify-between  rounded-lg">
      <h1 className="text-center text-2xl lg:text-4xl font-bold mb-6 text-white">All Available Tasks</h1>
      
      <div className="text-white mt-10 w-11/12 mx-auto">
        
        {isLoading ? (
          <Loading />
        ) : (
          tasks && tasks.length >0 ?
          (
            <div
             className="grid grid-cols-2 lg:grid-cols-3"
            >
              {tasks.map((task) => (
                <WorkerTasklistCard key={task._id} task={task} />
              ))}
            </div>
          ) : <p className="text-center">No Tasks available.</p>
        )}
      </div>
    </div>
  )
}

export default WorkerTasklist
