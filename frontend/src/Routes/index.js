import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from "../pages/Home";
import TransactionDetails from "../pages/TransactionDetails";

const index = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path ="/Home" element= {<Home />}/>
          <Route path ="/TransactionDetails" element= {<TransactionDetails />}/>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default index;
