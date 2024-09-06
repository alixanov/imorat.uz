import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Register } from "../page";
import {Home} from "../components/";

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
    </Routes>
  );
};

export default AppRouter;
