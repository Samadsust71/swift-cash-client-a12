import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation,Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const testimonials = [
  {
    name: "Emily Parker",
    position: "CEO at Elegance Boutique",
    image: "https://workreap.amentotech.com/wp-content/uploads/2024/04/placeholder02.png",
    feedback:
      "I couldn't be happier with the incredible service I received! The team went above and beyond to cater to my needs, displaying a level of professionalism and expertise that truly impressed me.",
    rating: 4,
  },
  {
    name: "John Doe",
    position: "Manager at Success Corp",
    image: "https://workreap.amentotech.com/wp-content/uploads/2024/04/placeholder02.png",
    feedback: "I couldn't be happier with the incredible service I received! The team went above and beyond to cater to my needs, displaying a level of professionalism and expertise that truly impressed me.",
    rating: 5,
  },
  {
    name: "Sophia Lee",
    position: "Founder at Bright Ideas",
    image: "https://workreap.amentotech.com/wp-content/uploads/2024/04/placeholder02.png",
    feedback: "I couldn't be happier with the incredible service I received! The team went above and beyond to cater to my needs, displaying a level of professionalism and expertise that truly impressed me.",
    rating: 5,
  },
  {
    name: "Sophia Lee",
    position: "Founder at Bright Ideas",
    image: "https://workreap.amentotech.com/wp-content/uploads/2024/04/placeholder02.png",
    feedback: "I couldn't be happier with the incredible service I received! The team went above and beyond to cater to my needs, displaying a level of professionalism and expertise that truly impressed me.",
    rating: 5,
  },
  // Add more testimonials if needed
];

const Testimonial = () => {
  return (
    <div className="py-8 text-white">
      <h2 className="text-2xl font-bold text-center mb-6">We Love Our Client Feedback</h2>
      <Swiper
      
       style={{
        "--swiper-pagination-color": "#01D676",
        "---swiper-navigation-color": "#01D676",
        "--swiper-pagination-bullet-inactive-color": "#999999",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "16px",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
      }}
        modules={[Navigation, Pagination,Autoplay]}
        spaceBetween={30}
        slidesPerView={1.5}
        centeredSlides
        autoplay={{ delay: 3000 }} // Slide change delay in ms
        loop
        pagination={{ clickable: true }}
        className="w-full"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
            key={index}
            className="transition-transform duration-500 ease-in-out"
          >
            <div className="flex flex-col md:flex-row items-center bg-bg-main shadow-lg rounded-lg p-6">
              {/* Image Section */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full lg:w-[50%] h-[400px] object-cover "
              />
              {/* Text Section */}
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <p className="text-white/70 mb-4">{testimonial.feedback}</p>
                <p className="text-lg font-bold">{testimonial.name}</p>
                <p className="text-sm text-white/70">{testimonial.position}</p>
                <div className="flex justify-center md:justify-start mt-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-brand-primary text-lg">
                      ★
                    </span>
                  ))}
                  {Array.from({ length: 5 - testimonial.rating }).map(
                    (_, i) => (
                      <span key={i} className="text-gray-300 text-lg">
                        ★
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
