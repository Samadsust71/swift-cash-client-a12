import  { useEffect, useState } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Emily Parker",
    position: "CEO at Elegance Boutique",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    feedback:
      "I couldn't be happier with the incredible service I received! The team went above and beyond to cater to my needs, displaying a level of professionalism and expertise that truly impressed me.",
    rating: 4,
  },
  {
    name: "John Doe",
    position: "Manager at Success Corp",
    image: "https://workreap.amentotech.com/wp-content/uploads/2024/04/placeholder02.png",
    feedback:
      "I couldn't be happier with the incredible service I received! The team went above and beyond to cater to my needs, displaying a level of professionalism and expertise that truly impressed me.",
    rating: 5,
  },
  {
    name: "Sophia Lee",
    position: "Founder at Bright Ideas",
    image: "https://workreap.amentotech.com/wp-content/uploads/2024/04/placeholder02.png",
    feedback:
      "I couldn't be happier with the incredible service I received! The team went above and beyond to cater to my needs, displaying a level of professionalism and expertise that truly impressed me.",
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
    <div className="flex flex-col md:flex-row items-center justify-center bg-bg-main p-8 rounded-lg shadow-lg">
      <div className="flex-1 flex justify-center items-center relative">
        <div className="w-[100%] h-80 rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={testimonials[currentIndex].image}
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              className="object-cover w-full h-full"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
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
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/70 mb-4">
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
            <p className="text-gray-500">{testimonials[currentIndex].position}</p>
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
  );
};

export default Testimonial;
