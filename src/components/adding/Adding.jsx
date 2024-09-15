import React, { useState, useRef } from 'react';
import './adding.css';
import { useForm } from 'react-hook-form';
import axios from "axios";
import Swal from 'sweetalert2'; // SweetAlert2 ni import qilamiz
import { useNavigate } from 'react-router-dom'; // useNavigate ni import qilamiz

const Adding = () => {
  const [images, setImages] = useState([]); // Tasvirlar uchun state
  const fileInputRef = useRef(null); // Fayl inputni boshqarish uchun useRef
  const { register, handleSubmit, formState: { errors } } = useForm(); // React Hook Form dan foydalanamiz
  const navigate = useNavigate(); // useNavigate hookidan foydalanamiz

  // Tasvirlarni yuklash funksiyasi
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files); // Yuklangan fayllarni arrayga o'zgartiramiz
    setImages([...images, ...files].slice(0, 8)); // Tasvirlar ro'yxatiga qo'shamiz, 8 tadan oshmasligi kerak
  };

  // Fayl tanlash inputini ishga tushirish
  const triggerFileInput = () => {
    fileInputRef.current.click(); // Ref orqali inputni bosish funksiyasi
  };

  // Muvaffaqiyatli natija uchun xabar
  const notifySuccess = (message, homeId) => {
    Swal.fire({
      icon: 'success', // Muvaffaqiyat ikonkasi
      title: 'Успех!',
      text: message,
      timer: 3000,
      showConfirmButton: false, // OK tugmasi bo'lmaydi
    }).then(() => {
      // Muvaffaqiyatli qo'shilgandan so'ng detallar sahifasiga yo'naltirish
      navigate(`/details/${homeId}`);
    });
  };

  // Xatolik yuzaga kelsa xabar
  const notifyError = (message) => {
    Swal.fire({
      icon: 'error', // Xato ikonkasi
      title: 'Ошибка!',
      text: message,
      timer: 3000,
      showConfirmButton: false, // OK tugmasi bo'lmaydi
    });
  };

  // Kategoriyani to'g'ri yozuvga o'zgartirish uchun xarita
  const categoryMapping = {
    kvartira__sotish: "Kvartira sotiladi",
    kvartira__ijaraga__berish: "Kvartira ijaraga beriladi",
    ofis__sotish: "Ofis sotiladi",
    ofis__ijaraga__berish: "Ofis ijaraga beriladi",
    hovli__sotish: "Hovli sotiladi",
    hovli__ijaraga__berish: "Hovli ijaraga beriladi",
  };

  // Formani yuborish funksiyasi
  const onSubmit = async (formData) => {
    const data = new FormData(); // FormData obyekti bilan ma'lumot yuboramiz

    // Kategoriyani xaritadan o'zgarishsiz holga keltiramiz
    const categoryText = categoryMapping[formData.category];

    data.append('category', categoryText);
    data.append('location', formData.location);
    data.append('details', formData.details);
    data.append("mobilecontact", formData.mobilecontact)
    data.append('contacts', formData.contacts);
    data.append('price', formData.price); // Narxni qo'shamiz

    // Har bir tasvirni ma'lumotlar bilan birga qo'shamiz
    images.forEach((image) => {
      data.append('images', image);
    });

    // Ma'lumotlarni serverga yuborish
    try {
      const response = await axios.post('http://localhost:5007/add-home', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Multipart form ma'lumotlarini yuborish
        },
      });
      notifySuccess('Объявление успешно добавлено!', response.data.home._id); // Muvaffaqiyatli xabar va id
    } catch (error) {
      notifyError('Ошибка при отправке данных.'); // Xato xabar
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <div className='adding__container'>
      <div className="adding__title">
        <p>Elon joylash</p> {/* Formani sarlavhasi */}
      </div>
      <div className="adding__card">
        <form className='adding__form-card' onSubmit={handleSubmit(onSubmit)}>
          {/* Kategoriya tanlash */}
          <label>Kategoriya tanlang</label>
          <select {...register('category', { required: true })}>
            <option value="kvartira__sotish">Kvartira sotiladi</option>
            <option value="kvartira__ijaraga__berish">Kvartira ijaraga beriladi</option>
            <option value="ofis__sotish">Ofis sotiladi</option>
            <option value="ofis__ijaraga__berish">Ofis ijaraga beriladi</option>
            <option value="hovli__sotish">Hovli sotiladi</option>
            <option value="hovli__ijaraga__berish">Hovli ijaraga berish</option>
          </select>
          {errors.category && <span className="error">Kategoriya majburiy!</span>}

          {/* Manzil tanlash */}
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
          {errors.location && <span className="error">Manzil majburiy!</span>}

          {/* Batafsil ma'lumot */}
          <label>Batafsil ma'lumot</label>
          <input
            type="text"
            placeholder="Misol uchun: 3 xonalik 4 etaj euro remont minimalisim"
            {...register('details', { required: true })}
          />
          {errors.details && <span className="error">Batafsil ma'lumot majburiy!</span>}

          {/* Narxni kiritish */}
          <label>Narxi $</label>
          <input
            type="text"
            placeholder="Misol uchun: 500"
            {...register('price', { required: true })}
          />
          {errors.price && <span className="error">Narxni kiritish majburiy!</span>}

          {/* Suratlarni joylash */}
          <label>Suratlarni joylash</label>
          <input
            type="file"
            ref={fileInputRef} // Fayl inputini ref orqali boshqaramiz
            multiple
            onChange={handleImageUpload} // Tasvirlarni yuklash
            accept="image/*"
            style={{ display: 'none' }} // Fayl inputini ko'rsatmaymiz
          />

          <div className="image-grid">
            {/* Tasvirlar uchun grid yaratamiz */}
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`image-grid__item ${index === 0 ? 'main-image' : ''}`} // Birinchi tasvir asosiy bo'ladi
                onClick={triggerFileInput} // Tasvirni bosganda fayl yuklash ishlaydi
              >
                {images[index] ? (
                  <img src={URL.createObjectURL(images[index])} alt={`preview-${index}`} /> // Tasvirni preview qilish
                ) : (
                  <div className="placeholder">Rasm yuklash</div> // Tasvir joylanmagan bo'lsa
                )}
              </div>
            ))}
          </div>
          <label htmlFor="">Telefon raqamingiz</label>
          <input type="number" name="" id=""
            placeholder='Misol uchun: 940751313'
            {...register('mobilecontact', { required: true })}
          />
          {errors.mobilecontact && <span className="error">Telefon raqam kiritish majburiy!</span>}


          {/* Kontaktlarni kiritish */}
          <label>Bog'lanish uchun kontaktlar</label>
          <textarea
            placeholder="Pochta, telegram user"
            {...register('contacts', { required: true })}
          />
          {errors.contacts && <span className="error">Kontaktlar majburiy!</span>}

          {/* Formani yuborish tugmasi */}
          <div className="form__send-btn">
            <button type="submit">Joylash</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Adding;
