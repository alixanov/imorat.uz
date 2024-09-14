import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "./info-ad.css";

const InfoAd = () => {
     const { id } = useParams();
     const [ad, setAd] = useState(null);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          axios
               .get(`http://localhost:5007/get-ad/${id}`)
               .then(response => {
                    setAd(response.data);
                    setIsLoading(false);
               })
               .catch(error => {
                    console.error('Ошибка при получении объявления:', error);
                    setIsLoading(false);
               });
     }, [id]);

     if (isLoading) {
          return <p>Загрузка...</p>;
     }

     if (!ad) {
          return <p>Объявление не найдено</p>;
     }
     const phoneNumber = `+998${ad.mobilecontact}`;

     return (
          <div className='info__ad-container'>
               <div className="info__ad-card">
                    <div className="info__ad-swiper">
                         {ad.images.length > 0 && (
                              <Swiper
                                   modules={[Pagination, Navigation]}
                                   pagination={{ clickable: true }}
                                   navigation
                                   spaceBetween={30}
                                   slidesPerView={1}
                                   loop={true}

                                   className="info__ad-swiper"
                              >
                                   {ad.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                             <img className='info__ad-image' src={`http://localhost:5007${image}`} alt={`Slide ${index + 1}`} />
                                        </SwiperSlide>
                                   ))}
                              </Swiper>
                         )}
                 </div>
                    <div className="info__ad-txt">
                         <h3>{ad.category}</h3>
                         <p>Joylashuv: {ad.location}</p>
                         <p>Malumotlari: {ad.details}</p>
                         <span>Narxi: ${ad.price}</span>
                         <p>Bog'lanish: {ad.contacts}</p>
                         <a href={`tel:${phoneNumber}`}>Bog'lanish</a>
                    </div>
               </div>
          </div>
     );
};

export default InfoAd;
