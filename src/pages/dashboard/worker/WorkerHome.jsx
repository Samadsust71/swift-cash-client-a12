import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import WorkerStates from "../../../components/worker/WorkerStates";

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
      <WorkerStates workerStat={workerStat} />
      <div className="p-6  rounded-lg shadow-lg my-10 w-full mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">
          All Approved Submissions 
        </h2>
        <div className="divider"></div>
        <div className="overflow-x-auto">
          {allApprovedSUbmissions && allApprovedSUbmissions.length ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Buyer Name</th>
                  <th>Payble Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allApprovedSUbmissions.map((submissionInfo) => (
                  <tr key={submissionInfo?._id}>
                    <td>{submissionInfo?.task_title?.slice(0, 30)}...</td>
                    <td>{submissionInfo?.buyer_name || "N/A"}</td>
                    <td>${submissionInfo?.payable_amount}</td>
                    <td>{submissionInfo?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center my-5">
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
