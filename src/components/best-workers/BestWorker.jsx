import axios from "axios";
import Loading from "../Loading";
import { useQuery } from "@tanstack/react-query";
import BestWorkerCard from "./BestWorkerCard";
import Heading from "../shared/Heading";



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
        console.log("error happend in best worker section",isError)
      }
      
  return (
   <div className="">
    <Heading heading={'Top Performers on Swift Cash'} subHeading={'Meet the best workers who consistently deliver exceptional results, setting benchmarks of excellence and reliability in their tasks.'} />
     <div className="grid  gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      {
        bestWorkers.map((worker) => <BestWorkerCard worker={worker} key={worker?._id}/>)
      }
    </div>
   </div>
  )
}

export default BestWorker
