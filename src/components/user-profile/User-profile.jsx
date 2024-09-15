import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import "./user-profile.css"

const Userprofile = () => {
  const { register, handleSubmit } = useForm(); // react-hook-form да формани бошқариш учун ишлатилади
  const [isAddOpen, setIsAddOpen] = useState(false) // Модални очиқлигини сақлаш учун state
  const handleAddClick = () => {
    setIsAddOpen(true) // Кнопка босилганда модални очиш
  }

  const handleCloseAdd = () => {
    setIsAddOpen(false) // Модални ёпиш функцияси
  }

  return (
    <div className='user__container'>
      <div className="user__navbar">
        <div className="user__img">
          {/* Бу ерга фойдаланувчининг суратини қўшиш мумкин */}
        </div>

        <div className="user__info">
          <p>User name:</p> {/* Фойдаланувчи номи кўрсатилади */}
          <p>Ism:</p>
          <p>Familya:</p>
          <span>Telefon raqam:</span>
          <button onClick={handleAddClick} >Malumotlarni yangilash</button> {/* Модални очувчи кнопка */}

          {/* Модаль окно фақат очиқ бўлган вақтда кўрсатилсин */}
          {isAddOpen && (
            <div className='modal'>
              <div className="modal-content">
                <span className='close' onClick={handleCloseAdd}>
                  &times; {/* Close иконкаси, босилганда модаль ёпилади */}
                </span>
                <form onSubmit={handleSubmit((data) => console.log(data))} className='modal__form'>
                  <input type="text" name="ism" placeholder='Ismingiz' {...register("nomi", { required: true })} /> {/* "nomi" майдони */}
                  <input type="text" name="familya" placeholder='Familyangiz' {...register("narxi", { required: true })} /> {/* "narxi" майдони */}
                  <input type="text" name="telefonraqam" placeholder='Telefon raqamingiz' {...register("soni", { required: true })} /> {/* "soni" майдони */}
                  <button type="submit">Отправить данные</button> {/* Жўнатиш кнопкаси */}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Userprofile
//