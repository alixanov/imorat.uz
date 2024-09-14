import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./ad.css";

const Ad = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5007/get-all-ad')
      .then(response => {
        setItems(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="ad__wrapper">
      <div className="ad__title">
        <p>Ommabop elonlar</p>
      </div>
      <div className='ad__container'>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className='ad__card'>
              {/* Faqat birinchi tasvirni ko'rsatish */}
              {item.images.length > 0 && (
                <img className='ad__image' src={`http://localhost:5007${item.images[0]}`} alt={item.details} />
              )}
              <div className='ad__info'>
                <p className='ad__price'>${item.price}</p>
                <p className='ad__category'>{item.category}</p>
                <p className='ad__location'>{item.location}</p>
                {/* Reklama id sini marshrutga uzatish */}
                <Link className='ad__details-link' to={`/details/${item._id}`}>
                  Batafsil
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ad;
