import React from 'react';
import "../login/login.css";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import video from "../../assets/mixkit-aerial-view-of-a-city-during-the-night-4308-full-hd.mp4";

const Login = () => {
     const { register, handleSubmit } = useForm();

     // Массив данных с видео можно убрать, так как путь уже импортирован
     // const data = [{ id: 1, video: video }];  // Эта часть не нужна

     return (
          <div className="login__container">
               {/* Видеофон */}
               <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="background__video"
               >
                    <source src={video} type="video/mp4" />
                    Ваш браузер не поддерживает HTML5 видео.
               </video>

               {/* Форма входа */}
               <form className="login__form" onSubmit={handleSubmit((data) => console.log(data))}>
                    <p>Shaxsiy kabinetga o'tish</p>
                    <input type="text" placeholder="Username" {...register("username")} />
                    <input type="password" placeholder="Parol" {...register("password")} />
                    <div className="page__register">
                         <Link>Ruyhatdan o'tish</Link>
                         <Link>Parol unutdingizmi?</Link>
                    </div>
                    <button type="submit">Kirish</button>
               </form>
          </div>
     );
};

export default Login;
