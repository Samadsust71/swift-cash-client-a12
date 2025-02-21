import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import WorkerTasklistCard from "../../../components/worker/WorkerTasklistCard";

const WorkerTasklist = () => {
  const axiosSecure = useAxiosSecure();
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

  if (isError) console.log(isError);

  return (
    <div className="">
      <div className="mb-6 flex flex-col justify-center items-center">
        <h1 className="text-center text-2xl  font-bold  text-white">
          All Available Tasks
        </h1>
        <p className="text-text-muted mt-2">Here are the latest tasks that you can complete and earn money</p>
      </div>

      <div className="w-11/12 mx-auto">
        {isLoading ? (
          <Loading />
        ) : tasks && tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <WorkerTasklistCard key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <p className="text-center">No Tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default WorkerTasklist;
