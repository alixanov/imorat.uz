import React from 'react';
import { useForm } from 'react-hook-form';
import "../login/login.css"
import { BackgroundVideo } from "../";

const Register = () => {
     const { register, handleSubmit } = useForm();

     return (
          <div className="register__container">
               {/* Видеофон */}
               <BackgroundVideo />

               {/* Форма регистрации */}
               <form className="register__form" onSubmit={handleSubmit((data) => console.log(data))}>
                    <p>Ruyhatdan o'tish</p>
                    <input type="text" placeholder="Username" {...register("username")} />
                    <input type="password" placeholder="Parol" {...register("password")} />
                    <input type="text" placeholder="Phone Number" {...register("number")} />
                    <button type="submit">Yuborish</button>
               </form>
          </div>
     );
};

export default Register;
