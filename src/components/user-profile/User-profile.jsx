import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './user-profile.css'; // Импортируйте ваш CSS файл

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
  const token = localStorage.getItem('token');

  // Получаем данные пользователя
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5007/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      } finally {
        setLoading(false); // Завершаем загрузку данных
      }
    };

    fetchUserData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Удаляем токен из локального хранилища
    window.location.href = '/'; // Перенаправляем на главную страницу
  };

  return (
    <div className="user__container">
      {loading ? (
        <div className="loading">Загрузка данных пользователя...</div>
      ) : userData ? (
        <>
          <div className="user__navbar">
            <div className="user__img"></div>
            <div className="user__info">
              <p>Привет, {userData.login}!</p>
              <button onClick={handleLogout}>Выйти</button>
            </div>
          </div>
          <div className="ads-section">
            <h2 className="section-title">Сохраненные объявления</h2>
            <div className="ads-grid">
              {userData.savedAds && userData.savedAds.length > 0 ? (
                userData.savedAds.map((ad) => (
                  <div className="card" key={ad.id}>
                    <img src={`http://localhost:5007${ad.imageUrl}`} alt={ad.title} />
                    <div className="card-content">
                      <h3 className="card-title">{ad.title}</h3>
                      <p className="card-description">{ad.description}</p>
                      <button className="card-button" onClick={() => window.location.href = `/details/${ad.id}`}>
                        Подробнее
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>У вас нет сохраненных объявлений.</p>
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
