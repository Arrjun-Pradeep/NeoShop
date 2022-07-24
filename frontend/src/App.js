import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from "./components/Admin/Admin";
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import ListingProducts from "./components/ListingProducts/ListingProducts";

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search/:value" element={<ListingProducts />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;