import { useQuery } from "@tanstack/react-query";
import AdminStates from "../../../components/admin-componets/AdminStates";
import Loading from "../../../components/Loading";
import useAdmin from "../../../hooks/useAdmin";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const AdminHome = () => {
  const [adminInfo, isLoading] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const {
    data: withdrawRequests = [],
    isLoading: loading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["withdraw-Requests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/withdrawals-request`);
      return data;
    },
  });
  if (isLoading || loading) return <Loading />;
  if (isError) console.log("error in admin home", isError);

  const handleUpdate= (request)=>{

    Swal.fire({
      title: "Are you sure you want to proceed?",
      icon: "warning",
      background:'#1D1E30',
      showCancelButton: true,
      confirmButtonColor: "#1E333C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText:"No"
    }).then(async(result) => {
      if (result.isConfirmed) {
         
        try {
          const {data} = await axiosSecure.patch(`/withdrawals-request/${request?._id}`,request)
          if(data?.modifiedCount){
            Swal.fire({
              background:'#1D1E30',
              text: "Payment Successful!!!",
              icon: "success",
              confirmButtonColor: "#1E333C",
            });
            refetch()
          }
          
        } catch (error) {
          toast.error(error?.message || "Some thing went Wrong")
        }

       
      }
    });

     
  }
  return (
    <div>
      <AdminStates adminInfo={adminInfo} />

      <div className="p-6  rounded-lg shadow-lg my-10 w-full mx-auto bg-bg-main">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white"> All Withdrawals Request</h2>
        <div className="divider"></div>
        <div className="overflow-x-auto">
          {withdrawRequests && withdrawRequests.length ? (
            <table className="table text-white">
              {/* head */}
              <thead className="bg-surface  text-brand-primary text-center">
                <tr>
                  <th>Worker Name</th>
                  <th>Payment Method</th>
                  <th>Amount</th>
                  <th>Reduced Coin</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center bg-surface">
                {withdrawRequests.map((request) => (
                  <tr key={request?._id}>
                    <th>{request?.worker_name}</th>
                    <td>{request?.payment_system}</td>
                    <td>${request?.withdrawal_amount}</td>
                    <td>{request?.withdrawal_coin}</td>

                    <td>
                      <span className="text-sm bg-red-200 px-2 py-1 rounded-full text-red-600">
                        {request?.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={()=>handleUpdate(request)} className="text-sm bg-brand-primary/5 px-2 py-1 rounded-full text-brand-primary hover:scale-105">
                        Payment Success
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center text-white my-5">
              <p className="text-center">No Withdrawals Request</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
