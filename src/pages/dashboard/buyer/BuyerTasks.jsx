import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import { format } from "date-fns";
import TaskUpdateModal from "../../../components/modal/TaskUpdateModal";
import { useState } from "react";






const BuyerTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); 
 
  
  
  const {
    data: myTasks = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["my-tasks", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tasks/${user?.email}`);
      return data;
    },
  });

 
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      icon: "warning",
      background:'#1D1E30',
      showCancelButton: true,
      confirmButtonColor: "#1E333C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText:"No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/tasks/${id}`);
        if (data.deletedCount) {
          Swal.fire({
            background:'#1D1E30',
            title: "Deleted",
            text: "You delete the task.",
            icon: "success",
          });
          queryClient.invalidateQueries(["my-tasks"]);
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  if (isError) {console.log("Error in buyer tasks page")}

   
  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  
    
  return (
    <div className="p-6  rounded-lg shadow-lg my-10 w-full mx-auto bg-bg-main">
      <h2 className="text-3xl font-semibold text-center mb-6 text-white">Added Tasks</h2>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        {myTasks && myTasks.length ? (
          <table className="table text-white">
            {/* head */}
            <thead className="bg-surface text-brand-primary text-center">
              <tr>
                
                <th>Task</th>
                <th>Required Workers</th>
                <th>Deadline</th>
                <th ></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-center bg-surface">
              {myTasks.map((task) => (
                <tr key={task?._id}>
                  
                  <td>{task?.task_title.slice(0, 30)}</td>
                  <td>{task?.required_workers}</td>
                  <td>{format(new Date(task?.deadline), "dd-MM-yyyy")}</td>
                  
                  <td>
                  <button
                      className="text-sm bg-brand-primary/5 px-2 py-1 rounded-full text-brand-primary"
                      onClick={() => openModal(task)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="text-sm bg-red-200 px-2 py-1 rounded-full text-red-600"
                      onClick={() => handleDelete(task?._id)}
                    >
                      Delete
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
        
         {/* Render the TaskUpdateModal component */}
      <TaskUpdateModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        task={selectedTask}
        refetch={refetch}
      />
    </div>
  );
};

export default BuyerTasks;
