
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TrustSection = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col lg:flex-row  text-white">
      {/* Left Section */}
      <div className="flex-1 p-8 flex flex-col justify-center bg-bg-main rounded-l-lg ">
        <h2 className="text-4xl font-bold mb-4">
          Global Trust of <span className="text-5xl">1 Million</span> Businesses and Counting
        </h2>
        <p className="mb-6">
          Connect with skilled professionals, streamline collaboration, and unlock success. Join now and redefine your work experience!
        </p>
        <ul className="mb-6 space-y-2">
          <li className="flex items-center">
            <span className="mr-2 text-green-400">✔</span> Connect with pros collaborate better succeed faster
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-400">✔</span> Redefine work Join now for a better experience
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-400">✔</span> Streamline collaboration unlock success
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-400">✔</span> Join us redefine your work experience
          </li>
        </ul>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full"
          onClick={()=>navigate('/register')}
        >
          <motion.button
            className="bg-[#17413E] shadow-brand-primary/10 shadow-inner  px-4 py-2 rounded-lg text-sm font-medium"
            whileTap={{ scale: 0.9 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex-1 relative">
        <img className="w-full h-full object-cover rounded-r-lg"
          src="https://i.ibb.co.com/BGd8wWB/freepik-export-20250119044945-YVz6.jpg"alt="people using Swift Cash" />
      </div>
    </div>
  );
};

export default TrustSection;
