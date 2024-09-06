import React from 'react'
import "../register/register.css"
import { useForm } from 'react-hook-form'

const Register = () => {
     const { register, handleSubmit } = useForm()

     return (
          <div className="register__container">
               <form className='register__form'
                    onSubmit={handleSubmit((data) => console.log(data))} >
                    <p>Ruyhatdan  o'tish</p>
                    <input type="text" placeholder='Username' {...register("username")} />
                    <input type="password" placeholder='Parol' {...register("password")} />
                    <input type="text" name="" id=""  {...register("number")} />
                    <button type="submit">Yuborish</button>
               </form>
          </div>
     )
}

export default Register
