import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
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
import Blog from "../pages/Blog";
import AddBlog from "../pages/AddBlog";
import Copun from "../pages/Copun";
import AddCoupon from "../pages/AddCoupon";
import UpdateCoupon from "../pages/UpdateCoupon";
import Profile from "../pages/Profile";
import User from "../pages/User";
import Order from "../pages/Order";
import UpdateBlog from "../pages/UpdateBlog";
import Invoice from "../pages/Invoice";
import UserEdit from "../pages/UserEdit";
import ViewProduct from "../pages/ViewProduct";
import UserView from "../pages/UserView";

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
      <Route path="/view-product/:id" element={<ViewProduct />} />
      <Route path="/sell-car" element={<SellCar />} />
      <Route path="/order" element={<Order />} />
      <Route path="/order/:id" element={<Invoice />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/add-blog" element={<AddBlog />} />
      <Route path="/update-blog/:id" element={<UpdateBlog />} />
      <Route path="/coupon" element={<Copun />} />
      <Route path="/add-coupon" element={<AddCoupon />} />
      <Route path="/update-coupon/:id" element={<UpdateCoupon />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/:id" element={<UserEdit />} />
      <Route path="/user/view/:id" element={<UserView />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default Router;
