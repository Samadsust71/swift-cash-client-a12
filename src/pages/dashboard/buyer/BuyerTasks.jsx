import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import { format } from "date-fns";





const BuyerTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
 
  
  
  const {
    data: myTasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-tasks", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tasks/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className="flex justify-center items-center my-5">
        <p className="text-center">
          Unable to load your tasks. Please check your internet connection or
          try reloading the page.
        </p>
      </div>
    );
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/tasks/${id}`);
        if (data.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
          queryClient.invalidateQueries(["my-tasks"]);
        }
      }
    });
  };
 
  return (
    <div className="p-6  rounded-lg shadow-lg my-10 w-11/12 mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6">Added Tasks</h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        {myTasks && myTasks.length ? (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Serial</th>
                <th>Task</th>
                <th>Required Workers</th>
                <th>Deadline</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {myTasks.map((task, idx) => (
                <tr key={task?._id}>
                  <th>{idx + 1}</th>
                  <td>{task?.task_title.slice(0, 30)}</td>
                  <td>{task?.required_workers}</td>
                  <td>{format(new Date(task?.deadline), "dd-MM-yyyy")}</td>
                  
                  <td>
                  <button
                      className="text-sm bg-green-100 px-2 py-1 rounded-full text-green-500"
                      
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="text-sm bg-red-100 px-2 py-1 rounded-full text-red-500"
                      onClick={() => handleDelete(task?._id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center my-5">
            <p className="text-center">No Task added</p>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default BuyerTasks;
