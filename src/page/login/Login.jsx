import React, { useState } from 'react';
import "../login/login.css";
import { Link, useNavigate } from 'react-router-dom';
import { BackgroundVideo } from "../";
import axios from 'axios';
import Swal from 'sweetalert2'; // SweetAlert2 ni import qilamiz

const Login = () => {
     const [login, setLogin] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate();

     const notifySuccess = (message) => {
          Swal.fire({
               icon: 'success',
               title: 'Успех!',
               text: message,
               timer: 3000,
               showConfirmButton: false,
          });
     };

     const notifyError = (message) => {
          Swal.fire({
               icon: 'error', // Xatolik ikonkasi
               title: 'Xato!',
               text: message,
               timer: 3000,
               showConfirmButton: false,
          });
     };

     const loginUser = async () => {
          if (!login || !password) {
               notifyError('Iltimos, barcha maydonlarni to\'ldiring.'); // Popup orqali ko'rsatamiz
               return;
          }

          const data = {
               login,
               password
          };

          try {
               const res = await axios.post("http://localhost:5007/login", data, {
                    headers: {
                         'Content-Type': 'application/json',
                    }
               });
               localStorage.setItem("token", res.data.token);

               navigate('/details');
               window.location.reload();

               notifySuccess("Siz muvaffaqiyatli tizimga kirdingiz!");
          } catch (error) {
               console.error("Xato:", error.response?.data || error.message);
               notifyError('Login yoki parol noto\'g\'ri.'); // Xatolik popup tarzida ko'rsatiladi
          }
     };

     return (
          <div className="login__container">
               <BackgroundVideo />
               <form className='login__form' onSubmit={(e) => { e.preventDefault(); loginUser(); }}>
                    <p>Shaxsiy kabinetga o'tish</p>
                    <input
                         type="text"
                         placeholder="Username"
                         value={login}
                         onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                         type="password"
                         placeholder="Parol"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="page__register">
                         <Link to={"/register"}>Ruyhatdan o'tish</Link>
                         <Link to={"/forgot-password"}>Parolni unutdingizmi?</Link>
                    </div>
                    <button type="submit">Kirish</button>
               </form>
          </div>
     );
};

export default Login;
