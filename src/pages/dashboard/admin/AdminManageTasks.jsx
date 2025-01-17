import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";


const AdminManageTasks = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allTasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-tasks"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-tasks`);
      return data;
    },
  });
  if (isLoading) return <Loading />;
  if (isError) console.log("error happend in admin manage tasks page");
  return (
    <div className="p-6  rounded-lg shadow-lg my-10 w-full mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6">All Tasks</h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        {allTasks && allTasks.length ? (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Title</th>
                <th>Required Worker</th>
                <th>Amount</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allTasks.map((task) => (
                <tr key={task?._id}>
                  <td>{task?.task_title?.slice(0, 30)}...</td>
                  <td>{task?.required_workers}</td>
                  <td>{task?.payable_amount}</td>
                  <td>{task?.buyer?.name || "N/A"}</td>
                  <td>{task?.buyer?.email}</td>
                  <td>
                    <button className="text-sm bg-red-100 px-2 py-1 rounded-full text-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center my-5">
            <p className="text-center">No Withdrawals Request</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageTasks;
