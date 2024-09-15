import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import VillaIcon from '@mui/icons-material/Villa';
import axios from 'axios';
import './catalog.css';

const Catalog = () => {

  const navigate = useNavigate();
  const [filteredItems, setFilteredItems] = useState([]); // Категория бўйича эълонлар
  const [isLoading, setIsLoading] = useState(false); // Маълумотларни юклаш ҳолати

  // Категорияни танлашда фильтр функцияси
  const handleCategoryClick = async (category) => {
    setIsLoading(true); // Юкланиш ҳолати
    try {
      const response = await axios.get(`http://localhost:5007/get-ads-by-category/${category}`);
      setFilteredItems(response.data); // Танланган категорияга тегишли эълонларни сақлаймиз
      setIsLoading(false);
    } catch (error) {
      console.error('Маълумотларни олишда хатолик:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className='catalog__container'>
      <div className="catalog__card">
        <div className="catalog__list" onClick={() => handleCategoryClick('kvartira__sotish')}>
          <HomeWorkIcon sx={{ color: "white", fontSize: 33 }} />
          <Link>Kvartira sotiladi</Link>
        </div>

        <div className="catalog__list" onClick={() => handleCategoryClick('ofis__sotish')}>
          <ApartmentIcon sx={{ color: "white", fontSize: 33 }} />
          <Link>Ofis sotiladi</Link>
        </div>

        <div className="catalog__list" onClick={() => handleCategoryClick('hovli__sotish')}>
          <VillaIcon sx={{ color: "white", fontSize: 33 }} />
          <Link>Hovli sotiladi</Link>
        </div>

        
        {/* 2 */}
        <div className="catalog__list" onClick={() => handleCategoryClick('kvartira__ijaraga__berish')}>
          <HomeWorkIcon sx={{ color: "white", fontSize: 33 }} />
          <Link>Kvartira ijaraga berish</Link>
        </div>

        <div className="catalog__list" onClick={() => handleCategoryClick('ofis__ijaraga__berish')}>
          <ApartmentIcon sx={{ color: "white", fontSize: 33 }} />
          <Link>Ofis ijaraga berish</Link>
        </div>

        <div className="catalog__list" onClick={() => handleCategoryClick('hovli__ijaraga__berish')}>
          <VillaIcon sx={{ color: "white", fontSize: 33 }} />
          <Link>Hovli ijaraga berish</Link>
        </div>
        



        {/* Юкланиш ҳолати ёки эълонлар рўйхати */}
        <div className='catalog__ads'>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            filteredItems.map((item) => (
              <div key={item._id} className='ad__card'>
                <img src={`http://localhost:5007${item.images[0]}`} alt={item.details} />
                <p>{item.category}</p>
                <p>{item.location}</p>
                <p>${item.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
