import React from 'react'
import "../login/login.css"
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = () => {
     const { register, handleSubmit } = useForm()

     return (
          <div className="login__container">
               <form className='login__form'
                    onSubmit={handleSubmit((data) => console.log(data))} >
                    <p>Shaxsiy kabinetga o'tish</p>
                    <input type="text" placeholder='Username' {...register("username")} />
                    <input type="password" placeholder='Parol' {...register("password")} />
                    <div className="page__register">
                         <Link>Ruyhatdan o'tish</Link>
     <Link>Parol unutdingizmi ?</Link>
                    </div>
                    <button type="submit">Kirish</button>
               </form>
          </div>
     )
}

export default Login
