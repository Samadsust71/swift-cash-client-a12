import  { useEffect, useState } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "./shared/Heading";

const testimonials = [
  {
    name: "Emily Parker",
    position: "Worker",
    image: "https://i.ibb.co.com/WcSVZb9/placeholder02.png",
    feedback:
      "Working on this platform has been an amazing experience. The tasks are well-organized, and the payment system is seamless, ensuring I get rewarded for my efforts on time. I appreciate the transparency and support provided by the team whenever I face an issue.",
    rating: 4,
  },
  {
    name: "Ana De Armas",
    position: "Buyer",
    image: "https://i.ibb.co.com/HFhPYPC/ana-de-armas.jpg",
    feedback:
      "This website has provided me with countless opportunities to showcase my skills and earn steadily. The user-friendly interface makes it easy to find tasks, and I love how disputes are handled fairly and professionally. Highly recommended for freelancers looking for a reliable platform.",
    rating: 5,
  },
  {
    name: "Samad Reza",
    position: "Worker",
    image: "https://i.ibb.co.com/FsSWTFp/my-image.jpg",
    feedback:
      "I have been using this platform for months, and it has consistently exceeded my expectations. The quality of work delivered by the workers is exceptional, and the interface makes it simple to manage my tasks efficiently. It’s a trustworthy space to get your projects done quickly and professionally.",
    rating: 5,
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <Heading heading={'What Our Clients Say'} subHeading={'Hear from buyers and satisfied workers about their experiences with us. Our dedication to excellence speaks through their stories.'} />
      <div className="flex flex-col lg:flex-row items-center justify-center bg-bg-main p-6 rounded-lg shadow-lg">
      <div className="flex-1 flex justify-center items-center relative">
        <div className="w-[100%] h-[500px] rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={testimonials[currentIndex].image}
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              className="object-cover w-full h-full"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5,ease:"easeInOut" }}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 px-8">
        <FaQuoteLeft className="text-brand-primary text-4xl mb-4" />
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[currentIndex].name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 , ease:"easeInOut"}}
          >
            <p className="text-white mb-4">
              {testimonials[currentIndex].feedback}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-brand-primary">
                {"★".repeat(testimonials[currentIndex].rating)}
              </span>
            </div>
            <h4 className="text-brand-primary font-bold mt-2">
              {testimonials[currentIndex].name}
            </h4>
            <p className="text-text-muted text-sm">{testimonials[currentIndex].position}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex mt-4 md:mt-0 md:flex-col md:justify-center">
        <button
          onClick={handlePrev}
          className="bg-brand-primary text-white p-2 rounded-full "
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="bg-brand-primary text-white p-2 rounded-full  ml-2 md:ml-0 md:mt-2"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
    </div>
  );
};

export default Testimonial;
