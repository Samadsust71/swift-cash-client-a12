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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proccess the payment!"
    }).then(async(result) => {
      if (result.isConfirmed) {
         
        try {
          const {data} = await axiosSecure.patch(`/withdrawals-request/${request?._id}`,request)
          if(data?.modifiedCount){
            Swal.fire({
              title: "Payment Succesfull",
              text: "Your file has been deleted.",
              icon: "success"
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

      <div className="p-6  rounded-lg shadow-lg my-10 w-full mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">Withdrawals Request</h2>
        <div className="divider"></div>
        <div className="overflow-x-auto">
          {withdrawRequests && withdrawRequests.length ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Worker Name</th>
                  <th>Payment Method</th>
                  <th>Amount</th>
                  <th>Reduced Coin</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {withdrawRequests.map((request) => (
                  <tr key={request?._id}>
                    <th>{request?.worker_name}</th>
                    <td>{request?.payment_system}</td>
                    <td>${request?.withdrawal_amount}</td>
                    <td>{request?.withdrawal_coin}</td>

                    <td>
                      <button className="text-sm bg-red-100 px-2 py-1 rounded-full text-red-500">
                        {request?.status}
                      </button>
                    </td>
                    <td>
                      <button onClick={()=>handleUpdate(request)} className="text-sm bg-green-100 px-2 py-1 rounded-full text-green-500">
                        Payment Success
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
    </div>
  );
};

export default AdminHome;
