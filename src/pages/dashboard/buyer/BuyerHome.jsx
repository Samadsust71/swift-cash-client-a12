import { useQuery } from "@tanstack/react-query";
import BuyerStates from "../../../components/buyer/BuyerStates";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";



const BuyerHome = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()
  const {
    data: buyerStat = {},
    isLoading,
    isError,
    
  } = useQuery({
    queryKey: ["buyer-stat",user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/buyer-stats/${user?.email}`);
      return data;
    },
  });
  if(isLoading) return <Loading/>
  if(isError) console.log("error happend in buyer home", isError)
  return (
    <div className="mt-12">
      <BuyerStates buyerStat ={buyerStat} />
    </div>
  );
};

export default BuyerHome;
