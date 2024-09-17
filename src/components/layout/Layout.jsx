import React, { useState, useEffect } from "react";
import {Navbar} from "../../page";
import { Outlet } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import "./layout.css"

const Layout = () => {
     const [isMobile, setIsMobile] = useState(false);

     // Функция для отслеживания ширины экрана
     useEffect(() => {
          const handleResize = () => {
               setIsMobile(window.innerWidth <= 480);  // Устанавливаем ограничение для мобильных устройств
          };

          // Инициализация и добавление слушателя на изменение размера окна
          handleResize();
          window.addEventListener('resize', handleResize);

          return () => {
               window.removeEventListener('resize', handleResize);  // Очищаем слушателя при размонтировании компонента
          };
     }, []);

     return (
          <>
               <Navbar />
               {/* Здесь будут отображаться страницы */}
               <div style={{ paddingBottom: isMobile ? '71px' : '0' }}>  {/* Добавляем отступ только для мобильных устройств */}
                    <Outlet />
               </div>

               {/* Закрепленный футер отображается только на мобильных устройствах */}
               {isMobile && (
                    <div className="app__navbar">
                         <div className="app__navbar-link">
                              <Link to="/">
                                   <HomeIcon sx={{ color: "#14142B" }} />
                                   Asosiy
                              </Link>
                         </div>
                         <div className="app__navbar-link">
                              <Link to="/catalog">
                                   <FormatAlignRightIcon sx={{ color: "#14142B" }} />
                                   Catalog
                              </Link>
                         </div>
                         <div className="app__navbar-link">
                              <Link to="/adding">
                                   <AddCircleOutlineIcon sx={{ color: "#14142B" }} />
                                   Elon
                              </Link>
                         </div>
                         <div className="app__navbar-link">
                              <Link to="/user-profile">
                                   <PersonIcon sx={{ color: "#14142B" }} />
                                   Kabinet
                              </Link>
                         </div>
                    </div>
               )}
          </>
     );
};

export default Layout;
//bitdi -138