import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useNotifications = () => {
  const axiosSecure = useAxiosSecure(); 
  const {user} = useAuth()
  const fetchNotifications = async () => {
    const { data } = await axiosSecure.get(`/notifications/${user?.email}`);
    console.log(data)
    return data;
  };

  return useQuery({
    queryKey: ["notifications", user?.email],
    queryFn: fetchNotifications,
    refetchInterval: 10000, 
    enabled: !!user?.email, 
  });
};

export default useNotifications;