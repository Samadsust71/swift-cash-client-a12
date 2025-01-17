import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";


const AdminManageTasks = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allTasks = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["all-tasks"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-tasks`);
      return data;
    },
  });
  if (isLoading) return <Loading />;
  if (isError) console.log("error happend in admin manage tasks page");
  const handleTaskDelete = (id)=>{
   
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete the task!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/all-tasks/${id}`);
          if (data?.deletedCount) {
            Swal.fire({
              title: "Task Deleted",
              text: "The task has been deleted.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          toast.error(error?.message || "Some thing went Wrong");
        }
      }
    });
  }
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
                    <button onClick={()=>handleTaskDelete(task?._id)} className="text-sm bg-red-100 px-2 py-1 rounded-full text-red-500">
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
