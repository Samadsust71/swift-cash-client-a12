import axios from "axios";
import Loading from "../Loading";
import { useQuery } from "@tanstack/react-query";
import BestWorkerCard from "./BestWorkerCard";


const BestWorker = () => {

    const {
        data:bestWorkers = [],
        isLoading,
        isError,
      } = useQuery({
        queryKey: ["best-workers"],
        queryFn: async () => {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/best-workers`
          );
          return data;
        },
      });
      if (isLoading) return <Loading/>;
      if(isError) {
        console.log(isError)
      }
      
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {
        bestWorkers.map((worker) => <BestWorkerCard worker={worker} key={worker?._id}/>)
      }
    </div>
  )
}

export default BestWorker
