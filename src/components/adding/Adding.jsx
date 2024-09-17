import React, { useState, useRef } from 'react';
import './adding.css';
import { useForm } from 'react-hook-form';
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Adding = () => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files].slice(0, 8)); // Максимум 8 изображений
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const notifySuccess = (message, homeId) => {
    Swal.fire({
      icon: 'success',
      title: 'Успех!',
      text: message,
      timer: 3000,
      showConfirmButton: false,
    }).then(() => {
      navigate(`/details/${homeId}`);
    });
  };

  const notifyError = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Ошибка!',
      text: message,
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const categoryMapping = {
    kvartira__sotish: "Kvartira sotiladi",
    kvartira__ijaraga__berish: "Kvartira ijaraga beriladi",
    ofis__sotish: "Ofis sotiladi",
    ofis__ijaraga__berish: "Ofis ijaraga beriladi",
    hovli__sotish: "Hovli sotiladi",
    hovli__ijaraga__berish: "Hovli ijaraga berish",
  };

  const onSubmit = async (formData) => {
    const data = new FormData();

    const categoryText = categoryMapping[formData.category];

    data.append('category', categoryText);
    data.append('location', formData.location);
    data.append('details', formData.details);
    data.append("mobilecontact", formData.mobilecontact);
    data.append('contacts', formData.contacts);
    data.append('price', formData.price);

    images.forEach((image) => {
      data.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:5007/add-home', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Добавляем токен авторизации
        },
      });
      notifySuccess('Объявление успешно добавлено!', response.data.home._id);
    } catch (error) {
      notifyError('Ошибка при отправке данных.');
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <div className='adding__container'>
      <div className="adding__title">
        <p>Elon joylash</p>
      </div>
      <div className="adding__card">
        <form className='adding__form-card' onSubmit={handleSubmit(onSubmit)}>
          {/* Категория */}
          <label>Kategoriya</label>
          <select {...register('category', { required: true })}>
            <option value="kvartira__sotish">Kvartira sotiladi</option>
            <option value="kvartira__ijaraga__berish">Kvartira ijaraga beriladi</option>
            <option value="ofis__sotish">Ofis sotiladi</option>
            <option value="ofis__ijaraga__berish">Ofis ijaraga beriladi</option>
            <option value="hovli__sotish">Hovli sotiladi</option>
            <option value="hovli__ijaraga__berish">Hovli ijaraga berish</option>
          </select>
          {errors.category && <span className="error">Категория обязательна!</span>}

          {/* Местоположение */}
          <label>Manzil</label>
          <select {...register('location', { required: true })}>
            <option value="namangan">Namangan</option>
            <option value="andijon">Andijon</option>
            <option value="fargona">Fargona</option>
            <option value="toshkent">Toshkent</option>
            <option value="samarqand">Samarqand</option>
            <option value="buxoro">Buxoro</option>
            <option value="jizzax">Jizzax</option>
            <option value="urgench">Urgench</option>
            <option value="qashqadaryo">Qashqadaryo</option>
            <option value="surhandaryo">Surhandaryo</option>
          </select>
          {errors.location && <span className="error">Местоположение обязательно!</span>}

          {/* Подробности */}
          <label>Batafsil malumot</label>
          <input
            type="text"
            placeholder="Misol uchun:3 xonalik 4 etaj euro remont minimalism asosida tayyorlangan"
            {...register('details', { required: true })}
          />
          {errors.details && <span className="error">Подробности обязательны!</span>}

          {/* Контактные данные */}
          <label>Ism va familya</label>
          <input
            type="text"
            placeholder="Misol uchun:Shukurullo Alixonov"
            {...register('contacts', { required: true })}
          />
          {errors.contacts && <span className="error">Контактные данные обязательны!</span>}

          {/* Мобильный телефон */}
          <label>Telefon raqamingiz</label>
          <input
            type="number"
            placeholder="Misol uchun: 998940751313"
            {...register('mobilecontact', { required: true })}
          />
          {errors.mobilecontact && <span className="error">Мобильный номер обязателен!</span>}

          {/* Цена */}
          <label>Narxi</label>
          <input
            type="text"
            placeholder="Misol uchun: 500$"
            {...register('price', { required: true })}
          />
          {errors.price && <span className="error">Цена обязательна!</span>}

          {/* Загрузка изображений */}
          <label>Suratlarni yuklash</label>
          <div className="image-upload-wrapper">
            <button type="button" onClick={triggerFileInput}>
Suratlarni yuklash            </button>
            <input
              type="file"
              multiple
              accept="image/jpeg, image/png, image/jpg, image/jfif"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>
          {images.length > 0 && (
            <div className="image-preview">
              {images.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
              ))}
            </div>
          )}

          <button type="submit">Elonni joylash</button>
        </form>
      </div>
    </div>
  );
};

export default Adding;
