import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import SellCar from "../pages/SellCar";
import Settings from "../pages/Settings";
import Category from "../pages/Category";
import AddCategory from "../pages/AddCategory";
import Brand from "../pages/Brand";
import AddBrand from "../pages/AddBrand";
import UpdateCategory from "../pages/UpdateCategory";
import UpdateBrand from "../pages/UpdateBrand";
import Product from "../pages/Product";
import AddProduct from "../pages/AddProduct";
import UpdateProduct from "../pages/UpdateProduct";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" element={<Dashboard />} />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/category" element={<Category />} />
      <Route path="/add-category" element={<AddCategory />} />
      <Route path="/update-category/:id" element={<UpdateCategory />} />
      <Route path="/brand" element={<Brand />} />
      <Route path="/add-brand" element={<AddBrand />} />
      <Route path="/update-brand/:id" element={<UpdateBrand />} />
      <Route path="/product" element={<Product />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/update-product/:id" element={<UpdateProduct />} />
      <Route path="/sell-car" element={<SellCar />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default Router;
