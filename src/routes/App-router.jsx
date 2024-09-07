import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Register } from "../page";
import {Adding, Home} from "../components/";

const AppRouter = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adding" element={<Adding/>}/>
    </Routes>
  );
};

export default AppRouter;
