
import { motion } from "framer-motion";
import { FaAmazonPay, FaCcApplePay, FaCcVisa} from "react-icons/fa";
import { FaLitecoinSign } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { LuBitcoin } from "react-icons/lu";

const methods = [
  { name: "Litecoin", icon: <FaLitecoinSign /> }, 
  { name: "Visa", icon: <FaCcVisa /> },
  { name: "Bitcoin", icon: <LuBitcoin /> },
  { name: "Google Pay", icon: <FcGoogle /> },
  { name: "Apple Pay", icon: <FaCcApplePay /> },
  { name: "Amazon Pay", icon: <FaAmazonPay /> },
];

const glowEffect = `
  before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r 
  before:from-brand-primary before:via-pink-500 before:to-blue-500 
  before:blur-md before:opacity-50 before:z-[-1]
`;

const CashoutSection = () => {
  return (
    <div className=" py-10 ">
      <h2 className="text-white text-center text-2xl font-bold mb-8">Cashout via</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 justify-items-center">
        {methods.map((method, index) => (
          <motion.div
            key={index}
            className={`relative w-full h-24 bg-bg-main rounded-xl flex items-center justify-center text-white text-lg font-medium shadow-lg hover:scale-110 transition-transform ${glowEffect}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.4, duration: 0.5 }}
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.90 }}
          >
            <span className="mb-4">{method.icon}</span>
            <span className="absolute bottom-4">{method.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CashoutSection;
