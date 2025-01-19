
import { FaRocket, FaFire } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";
import Heading from "../shared/Heading";

const StatsSection = () => {
  return (
    <div className="container mx-auto">
      <Heading heading={'Empowering Users, One Task at a Time'} subHeading={'Discover how Swift Cash empowers users to achieve their financial goals. From quick cashouts to millions earned, these stats highlight the success of our growing community.'} />
      <div className="bg-bg-main text-white py-10 px-4 md:px-10 rounded-lg flex flex-col lg:flex-row justify-center items-center lg:space-x-10 space-y-6 lg:space-y-0 ">
      {/* First Stat */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center space-x-2">
          <FaRocket className="text-brand-primary text-2xl" />
          <span className="text-2xl font-bold">17m 12s</span>
        </div>
        <p className="text-white/80  mt-2">
          Average time until user makes first cashout
        </p>
      </div>

      {/* Divider */}
      <div className="divider lg:divider-horizontal"></div>

      {/* Second Stat */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center space-x-2">
          <FaFire className="text-brand-primary text-2xl" />
          <span className="text-2xl font-bold">$57.73</span>
        </div>
        <p className="text-white/80  mt-2">
          Average money earned by users yesterday
        </p>
      </div>

      {/* Divider */}
      <div className="divider lg:divider-horizontal "></div>

      {/* Third Stat */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center space-x-2">
          <FaDollarSign className="text-brand-primary text-2xl" />
          <span className="text-2xl font-bold">$50,000,000+</span>
        </div>
        <p className="text-white/80 mt-2">
          Total USD earned on Swift Cash
        </p>
      </div>
    </div>
    </div>
  );
};

export default StatsSection;
