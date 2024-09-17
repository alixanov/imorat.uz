import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './user-profile.css'; // Импортируйте ваш CSS файл
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5007/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        // Если токен недействителен, разлогиниваем пользователя
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Перенаправление на главную страницу
  };

  return (
    <div className="user__container">
      {loading ? (
        <div className="loading">Загрузка данных пользователя...</div>
      ) : userData ? (
        <>
          <div className="user__navbar">
              <p>Привет, {userData.login}!</p>
              <button onClick={handleLogout}>Выйти</button>
            </div>
          <div className="ads-section">
            <h2 className="section-title">Ваши объявления</h2>
            <div className="ads-grid">
              {userData.ads && userData.ads.length > 0 ? (
                userData.ads.map((ad) => (
                  <div className="card" key={ad._id}>
                    {ad.images && ad.images.length > 0 && (
                      <img src={`http://localhost:5007${ad.images[0]}`} alt={ad.category} />
                    )}
                    <div className="card-content">
                      <h3 className="card-title">{ad.category}</h3>
                      <p className="card-description">{ad.details}</p>
                      <p className="card-price">Narxi: {ad.price}$</p>
                      <button
                        className="card-button"
                        onClick={() => navigate(`/details/${ad._id}`)}
                      >
                    Batafsil
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>У вас нет объявлений.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="error">Не удалось загрузить данные пользователя.</div>
      )}
    </div>
  );
};

export default UserProfile;
