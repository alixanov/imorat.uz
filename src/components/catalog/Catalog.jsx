import React from 'react';
import { Link } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import VillaIcon from '@mui/icons-material/Villa';
import './catalog.css';

const Catalog = () => {
  return (
    <div className='catalog__container'>
      <div className="catalog__card">
        <div className="catalog__list">
          <HomeWorkIcon sx={{ color: "white", fontSize: 33 }} />
          <Link to="/ads/kvartira__sotish">Kvartira sotiladi</Link>
        </div>

        <div className="catalog__list">
          <ApartmentIcon sx={{ color: "white", fontSize: 33 }} />
          <Link to="/ads/ofis__sotish">Ofis sotiladi</Link>
        </div>

        <div className="catalog__list">
          <VillaIcon sx={{ color: "white", fontSize: 33 }} />
          <Link to="/ads/hovli__sotish">Hovli sotiladi</Link>
        </div>
        <div className="catalog__list">
          <HomeWorkIcon sx={{ color: "white", fontSize: 33 }} />
          <Link to="/ads/kvartira__ijaraga__berish">Kvartira ijaraga berish</Link>
        </div>

        <div className="catalog__list">
          <ApartmentIcon sx={{ color: "white", fontSize: 33 }} />
          <Link to="/ads/ofis__ijaraga__berish">Ofis ijaraga berish</Link>
        </div>

        <div className="catalog__list">
          <VillaIcon sx={{ color: "white", fontSize: 33 }} />
          <Link to="/ads/hovli__ijaraga__berish">Hovli ijaraga berish</Link>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
