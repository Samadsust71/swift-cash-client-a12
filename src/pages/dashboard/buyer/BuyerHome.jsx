import { useQuery } from "@tanstack/react-query";
import BuyerStates from "../../../components/buyer/BuyerStates";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { FaDollarSign, FaUserEdit } from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";
import { FcViewDetails } from "react-icons/fc";

const BuyerHome = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      title: "Are you sure you want to approve?",
      icon: "warning",
      background:'#1D1E30',
      showCancelButton: true,
      confirmButtonColor: "#1E333C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText:"No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.patch(`/buyer/approve/${_id}`, {
            worker_email,
            payable_amount,
          });
          if (data) {
            Swal.fire({
              background:'#1D1E30',
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
      title: "Are you sure you want to reject?",
      icon: "warning",
      background:'#1D1E30',
      showCancelButton: true,
      confirmButtonColor: "#1E333C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText:"No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.patch(`/buyer/reject/${_id}`, {
            task_id,
          });
          if (data) {
            Swal.fire({
              background:'#1D1E30',
              text: "You Reject the request.",
              icon: "success",
              confirmButtonColor: "#1E333C",
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
    setSelectedSubmission(submissionInfo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="">
      <BuyerStates buyerStat={buyerStat} />
      <div className="p-6  rounded-lg shadow-lg my-10 w-full mx-auto bg-bg-main">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">
          All Submissions for Your Added Tasks
        </h2>
        <div className="divider"></div>
        <div className="overflow-x-auto ">
          {allSUbmissions && allSUbmissions.length ? (
            <table className="table text-white">
              {/* head */}
              <thead className="bg-surface  text-brand-primary text-center">
                <tr>
                  <th>Worker Name</th>
                  <th>Task Title</th>
                  <th>Payble Amount</th>
                  <th>Submission Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center bg-surface">
                {allSUbmissions.map((submissionInfo) => (
                  <tr key={submissionInfo?._id}>
                    <th>{submissionInfo?.worker_name}</th>
                    <td>{submissionInfo?.task_title?.slice(0, 20)}</td>
                    <td>${submissionInfo?.payable_amount}</td>
                    <td>
                      <button
                        onClick={() => openModal(submissionInfo)}
                        className="text-sm px-2 py-1 rounded-full text-brand-primary"
                      >
                        View Details
                      </button>
                    </td>

                    <td>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleApprove(submissionInfo)}
                          className="text-sm bg-brand-primary/5 px-2 py-1 rounded-full text-brand-primary"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(submissionInfo)}
                          className="text-sm bg-red-200 px-2 py-1 rounded-full text-red-600"
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
              <p className="text-center text-white">
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
        <Dialog.Panel className="bg-surface rounded-lg p-6 max-w-xl w-full text-white">
          <Dialog.Title className="text-xl font-semibold text-center">
            Submission Details
          </Dialog.Title>
          <div className="mt-4">
            {selectedSubmission && (
              <div>
                <div className="flex items-center gap-1">
                <FaUserEdit className="text-xl text-brand-primary" />
                  <span>
                     Worker Name :
                  </span>{" "}
                  <span>{selectedSubmission?.worker_name}</span>
                </div>
                <div className="flex items-center gap-1">
                <MdOutlineTitle  className="text-xl text-brand-primary" />
                  <span>
                  Task Title :
                  </span>{" "}
                  <span>{selectedSubmission?.task_title}</span>
                </div>
                <div className="flex items-center gap-1">
                <FaDollarSign className="text-brand-primary" />
                  <span>
                  Payable Amount :
                  </span>{" "}
                  <span>{selectedSubmission?.payable_amount}</span>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                <FcViewDetails className="text-brand-primary" />
                  <span>
                  Submission Detais :
                  </span>{" "}
                  <p>{selectedSubmission?.submission_details}</p>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={closeModal}
              className="bg-gradient-to-t to-brand-primary/40 from-surface/90 px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300"
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
