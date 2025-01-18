import { useQuery } from "@tanstack/react-query";
import BuyerStates from "../../../components/buyer/BuyerStates";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

const BuyerHome = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const { user } = useAuth();
  const {
    data: buyerStat = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["buyer-stat", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/buyer-stats/${user?.email}`);
      return data;
    },
  });

  const { data: allSUbmissions = [], refetch } = useQuery({
    queryKey: ["all-submissions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/buyers/submissons/${user?.email}`
      );
      return data;
    },
  });
  if (isLoading) return <Loading />;
  if (isError) console.log("error happend in buyer home", isError);

  const handleApprove = (submissionInfo) => {
    const { _id, worker_email, payable_amount } = submissionInfo;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept the request!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.patch(`/buyer/approve/${_id}`, {
            worker_email,
            payable_amount,
          });
          if (data) {
            Swal.fire({
              title: "Approved",
              text: "You accept  the request.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          toast.error(error?.message || "Some thing went Wrong");
        }
      }
    });
  };
  const handleReject = async (submissionInfo) => {
    const { _id, task_id } = submissionInfo;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject the offer!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.patch(`/buyer/reject/${_id}`, {
            task_id,
          });
          if (data) {
            Swal.fire({
              title: "Reject",
              text: "You Reject the request.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          toast.error(error?.message || "Some thing went Wrong");
        }
      }
    });
  };
  const openModal = (submissionInfo) => {
    setSelectedSubmission(submissionInfo); // Set selected submission details
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  return (
    <div className="mt-12">
      <BuyerStates buyerStat={buyerStat} />
      <div className="p-6  rounded-lg shadow-lg my-10 w-full mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">
          All Submissions for your Added Tasks
        </h2>
        <div className="divider"></div>
        <div className="overflow-x-auto">
          {allSUbmissions && allSUbmissions.length ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Worker Name</th>
                  <th>Task Title</th>
                  <th>Payble Amount</th>
                  <th>Submission Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allSUbmissions.map((submissionInfo) => (
                  <tr key={submissionInfo?._id}>
                    <th>{submissionInfo?.worker_name}</th>
                    <td>{submissionInfo?.task_title?.slice(0, 30)}...</td>
                    <td>${submissionInfo?.payable_amount}</td>
                    <td>
                      <button
                        onClick={() => openModal(submissionInfo)}
                        className="text-sm bg-green-100 px-2 py-1 rounded-full text-green-500"
                      >
                        View Details
                      </button>
                    </td>

                    <td>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleApprove(submissionInfo)}
                          className="text-sm bg-green-100 px-2 py-1 rounded-full text-green-500"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(submissionInfo)}
                          className="text-sm bg-red-100 px-2 py-1 rounded-full text-red-500"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center my-5">
              <p className="text-center">
                No Submissions request for your Added Tasks
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Modal (using Headless UI Dialog component) */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      >
        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full">
          <Dialog.Title className="text-xl font-semibold">
            Submission Details
          </Dialog.Title>
          <div className="mt-4">
            {selectedSubmission && (
              <div>
                <p>
                  <strong>Worker Name:</strong> {selectedSubmission?.worker_name}
                </p>
                <p>
                  <strong>Task Title:</strong> {selectedSubmission?.task_title}
                </p>
                <p>
                  <strong>Payable Amount:</strong> $
                  {selectedSubmission?.payable_amount}
                </p>
                <p>
                  <strong>Submission Detais:</strong>{" "}
                  {selectedSubmission?.submission_details}
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default BuyerHome;
