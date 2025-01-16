import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"


const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()
    const { data: userInfo , isLoading } = useQuery({
      queryKey: ['role', user?.email],
      enabled: !loading && !!user?.email,
      queryFn: async () => {
        const { data } = await axiosSecure(`/users/role/${user?.email}`)
        return data
      },
    })
    return [userInfo, isLoading]
}

export default useRole
