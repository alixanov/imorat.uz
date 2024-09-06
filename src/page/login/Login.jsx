import React, { useState } from 'react';
import "../login/login.css";
import { Link, useNavigate } from 'react-router-dom';
import { BackgroundVideo } from "../";
import axios from 'axios';

const Login = () => {
     const [login, setLogin] = useState(''); // Бу ерда useState() ни фойдаланиш керак
     const [password, setPassword] = useState('');
     const navigate = useNavigate();

     function loginUser() {
          const data = {
               login,
               password
          };
          axios
               .post("http://localhost:5007/login", data)
               .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    window.location.reload();
               })
               .catch((error) => {
                    console.log(error);
               });
     }

     return (
          <div className="login__container">
               <BackgroundVideo />
               <form className='login__form' onSubmit={(e) => { e.preventDefault(); loginUser(); }}>
                    <p>Shaxsiy kabinetga o'tish</p>
                    <input
                         type="text"
                         placeholder="Username"
                         value={login}
                         onChange={(e) => setLogin(e.target.value)} // setLogin энди тўғри ишлайди
                    />
                    <input
                         type="password"
                         placeholder="Parol"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                    />
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
