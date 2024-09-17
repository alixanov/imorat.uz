import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Login, Register } from "../page";
import { Adding, Home, InfoAd, Admin, Catalog, Layout ,Ad} from "../components/";
import Userprofile from "../components/user-profile/User-profile";

const AppRouter = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <Routes>
      <Route path="/" element={<Layout />}>  {/* Обернули в Layout */}
        <Route index element={<Home />} />
        <Route path="/details/:id" element={<InfoAd />} />
        <Route path="/adding" element={<Adding />} />
        <Route path="/register" element={<Register />} />
        <Route path="/iadmin" element={<Admin />} />
        <Route path="/user-profile" element={<Userprofile />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/ads/:category" element={<Ad />} />
        <Route path="*" element={<Navigate to="/" />} />
        {/* <Route path="/details/:id" element={<AdDetails />}  */}

      </Route>
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
