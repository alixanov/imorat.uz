import React from 'react';
import { useForm } from 'react-hook-form';
import "../login/login.css";
import { BackgroundVideo } from "../";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
     const { register, handleSubmit, reset } = useForm();
     const navigate = useNavigate();

     const onSubmit = async (data) => {
          if (!data.login || !data.password) {
               alert("Заполните все поля!");
               return;
          }

          try {
               const response = await axios.post("http://localhost:5007/register", data, {
                    headers: {
                         'Content-Type': 'application/json',
                    }
               });
               console.log(response.data.message);
               alert("Siz muvoffaqiyatli ro'yhatdan o'tdingiz!");
               reset();
               navigate("/"); // Перенаправление на страницу входа
          } catch (error) {
               console.error("Ошибка регистрации:", error.response?.data || error.message);
               if (error.response?.status === 400) {
                    alert("Этот логин уже используется.");
               } else {
                    alert("Произошла ошибка на сервере.");
               }
          }
     };

     return (
          <div className="register__container">
               <BackgroundVideo />
               <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
                    <p>Ruyhatdan o'tish</p>
                    <input type="text" placeholder="Username" {...register("login", { required: true })} />
                    <input type="password" placeholder="Parol" {...register("password", { required: true })} />
                    <button type="submit">Yuborish</button>
               </form>
          </div>
     );
};

export default Register;
