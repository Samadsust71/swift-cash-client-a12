import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import WorkerStates from "../../../components/worker/WorkerStates";
import { Helmet } from "react-helmet-async";

const WorkerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
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
  const { data: allApprovedSUbmissions = [] } = useQuery({
    queryKey: ["all-approved-submissions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/workers/submissons/${user?.email}`
      );
      return data;
    },
  });
  if (isLoading) return <Loading />;
  if (isError) console.log("Error in Worker Home", isError);
  return (
    <div>
      <Helmet>
        <title>Worker Home | Swift Cash</title>
      </Helmet>
      <WorkerStates workerStat={workerStat} />
      <div className="p-6  rounded-lg shadow-lg mt-10 w-full mx-auto bg-bg-main">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">
          All Approved Submissions 
        </h2>
        <div className="divider"></div>
        <div className="overflow-x-auto">
          {allApprovedSUbmissions && allApprovedSUbmissions.length ? (
            <table className="table text-white">
              {/* head */}
              <thead className="bg-surface  text-brand-primary text-center">
                <tr>
                  <th>Task Title</th>
                  <th>Buyer Name</th>
                  <th>Payble Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-center bg-surface">
                {allApprovedSUbmissions.map((submissionInfo) => (
                  <tr key={submissionInfo?._id}>
                    <td>{submissionInfo?.task_title?.slice(0, 30)}...</td>
                    <td>{submissionInfo?.buyer_name || "N/A"}</td>
                    <td>${submissionInfo?.payable_amount}</td>
                    <td >
                      <span className="text-sm bg-brand-primary/5 px-2 py-1 rounded-full text-brand-primary">{submissionInfo?.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center text-white items-center my-5">
              <p className="text-center">
                No Submissions Approved for your Request{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
