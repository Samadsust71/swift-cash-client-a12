// FeedbackSlider.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonialData = [
  {
    name: "John Doe",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback: "Swift Cash made transferring money a breeze! Highly recommend it!",
  },
  {
    name: "Jane Smith",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback: "Secure and fast transactions—exactly what I needed!",
  },
  {
    name: "Sam Wilson",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback: "The user interface is so simple and intuitive. Love it!",
  },
];

const Testimonial = () => {
  return (
    <section className="py-10 bg-bg-main text-text-light">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Users Say
        </h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="max-w-4xl mx-auto"
        >
          {testimonialData.map((user, index) => (
            <SwiperSlide key={index}>
              <div className="bg-surface p-6 rounded-lg shadow-lg text-center">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                <p className="text-text-muted">{user.feedback}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
