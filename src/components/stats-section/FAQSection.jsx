import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import faqAnimationData from "../../assets/lottie/faq-lottie.json"

const faqs = [
  {
    question: "How to make money on Swift Cash?",
    answer: "You can earn money by completing offers, surveys, and referring others to Freecash.",
  },
  {
    question: "How is Swift Cash able to pay users?",
    answer: "Freecash partners with advertisers and companies who pay for user engagement and actions.",
  },
  {
    question: "How much money can you really earn on Swift Cash?",
    answer: "Earnings depend on the offers completed, but users have reported making anywhere from a few dollars to hundreds per month.",
  },
  {
    question: "How long does it take to cash out your money?",
    answer: "Cashouts are almost instant and can be requested as soon as you reach the minimum withdrawal amount.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" text-white py-12 px-6">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col-reverse lg:flex-row gap-10 items-center">
      <div className="w-full lg:w-[50%] mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-bg-main rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg">{faq.question}</span>
              {openIndex === index ? (
                <FaMinus className="text-brand-primary" />
              ) : (
                <FaPlus className="text-brand-primary" />
              )}
            </button>

            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-4 text-white/80 border-t border-brand-primary/20"
              >
                {faq.answer}
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div>
        <Lottie animationData={faqAnimationData}/>
      </div>
      </div>
    </div>
  );
};

export default FAQSection;
