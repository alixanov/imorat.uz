import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ad.css';

const Ad = () => {
  const { category } = useParams();  // Получаем категорию из URL
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Получаем объявления с сервера с фильтрацией по категории
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5007/get-all-ad", {
          params: { category }  // Передаем категорию как параметр
        });
        setItems(response.data); // Загружаем все объявления
        setIsLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="ad__wrapper">
      <div className="ad__title">
        <p>{category ? `Elonlar: ${category.replace(/_/g, ' ')}` : 'Ommabop elonlar'}</p>
      </div>
      <div className='ad__container'>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p>{error}</p>
        ) : items.length === 0 ? (
          <p>Эълонлар топилмади.</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className='ad__card'>
              {item.images.length > 0 && (
                <img
                  className='ad__image'
                  src={`http://localhost:5007${item.images[0]}`}
                  alt={item.details}
                />
              )}
              <div className='ad__info'>
                <p className='ad__price'>${item.price}</p>
                <p className='ad__category'>{item.category}</p>
                <p className='ad__location'>{item.location}</p>
                {/* <p className='ad__location'>{item.contacts}</p> */}
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
