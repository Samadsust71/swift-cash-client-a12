import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const useNotifications = (userEmail) => {
  const axiosSecure = useAxiosSecure(); 
  // const {user} = useAuth()
  const fetchNotifications = async () => {
    const { data } = await axiosSecure.get(`/notifications/${userEmail}`);
    return data;
  };

  return useQuery({
    queryKey: ["notifications", userEmail],
    queryFn: fetchNotifications,
    enabled: !! userEmail, 
  });
};

export default useNotifications;