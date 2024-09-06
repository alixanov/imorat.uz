import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../components/main/Main";
import GetStartedPage from "../components/get-started/GetStartedPage";
import { Login, Register } from "../page";
import Home from "../components/home/Home";

const AppRouter = () => {
  const token = localStorage.getItem("token");
  return;
  token ? (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<GetStartedPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
