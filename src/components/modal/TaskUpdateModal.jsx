/* eslint-disable react/prop-types */

import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
  } from "@headlessui/react";
  import { FolderPenIcon, NotebookPenIcon } from "lucide-react";
  import { Fragment, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
 
  const TaskUpdateModal = ({ isOpen, closeModal, task, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const {_id, task_title, task_detail, submission_info } = task || {};
    const [loading, setLoading] = useState(false)
   
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const form = e.target
      const task_title = form.task_title.value
      const submission_info = form.submission_info.value
      const task_detail = form.task_detail.value
      const updatedTask = {task_title,submission_info,task_detail}
      setLoading(true)
      try {
        const {data} = await axiosSecure.patch(`tasks/${_id}`,updatedTask)
        if (data?.modifiedCount) {
            refetch()
            toast.success(`${task_title} updated successfully!!!`)
            
        }
      } catch (error) {
        toast.error(error?.message || `${task_title} updatation failed`)
        
      }finally{
        setLoading(false)
        closeModal()
      }
    };
  
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 mt-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
  
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium text-center leading-6 text-gray-900"
                  >
                    Update Task
                  </DialogTitle>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Task Title */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center">
                          <FolderPenIcon className="mr-2" /> Task Title
                        </span>
                      </label>
                      <input
                        type="text"
                        name="task_title"
                        defaultValue={task_title}
                        placeholder="Enter Task Title"
                        className="input input-bordered"
                        required
                      />
                    </div>
  
                    {/* Submission Info */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center">
                          <NotebookPenIcon className="mr-2" /> Submission Info
                        </span>
                      </label>
                      <input
                        type="text"
                        name="submission_info"
                        defaultValue={submission_info}
                        placeholder="Enter What to Submit"
                        className="input input-bordered"
                        required
                      />
                    </div>
  
                    {/* Task Details */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center">
                          <NotebookPenIcon className="mr-2" /> Task Details
                        </span>
                      </label>
                      <textarea
                        name="task_detail"
                        defaultValue={task_detail}
                        placeholder="Enter Task Details"
                        className="textarea textarea-bordered h-24"
                        required
                      ></textarea>
                    </div>
  
                    {/* Submit Button */}
                    <div className="form-control mt-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn bg-primary-bg hover:bg-primary-bg/70 text-white"
                      >
                        {loading? "Updating..." : "Update"}
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };
  
  export default TaskUpdateModal;
  