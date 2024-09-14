import React from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AdverstingSwiperData from "../../static/AdverstingSwiperData";
import "./minimal-slider.css";

const NewMinimalSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      // pagination={{ clickable: false }}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1,
        },
      }}
      className="new-minimal-swiper"
    >
      {AdverstingSwiperData.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="new-image-container">
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="new-slider-image"
            />
          </div>
        </SwiperSlide>
      ))}
      <div className="custom-prev">‹</div>
      <div className="custom-next">›</div>
    </Swiper>
  );
};

export default NewMinimalSlider;
