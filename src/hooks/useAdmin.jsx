import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"
import useAuth from "./useAuth"
import useRole from "./useRole"



const useAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()
    const [userInfo] = useRole()
    const { data: adminInfo , isLoading,refetch } = useQuery({
      queryKey: ['admin', user?.email],
      enabled: !loading && !!user?.email && userInfo?.role === "Admin" ,
      queryFn: async () => {
        const { data } = await axiosSecure(`/admin-stats`)
        return data
      },
    })
    return [adminInfo, isLoading,refetch]
}

export default useAdmin
