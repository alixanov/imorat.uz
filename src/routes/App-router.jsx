import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Login, Register } from "../page";
import { Adding, Home, InfoAd, Admin, Catalog } from "../components/";
import Userprofile from "../components/user-profile/User-profile";

const AppRouter = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<InfoAd />} />
      <Route path="/adding" element={<Adding />} />
      <Route path="/register" element={<Register />} />
      <Route path="/iadmin" element={<Admin />} /> 
      <Route path="/user-profile" element={<Userprofile />} />
      <Route path="/catalog" element={<Catalog/>}/>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Добавляем редирект на страницу логина, если маршрут не существует */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
