import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/ContactPage";
import Services from "../pages/Services";
import Login from "../pages/Login";
import BuyerDashboard from "../pages/buyer/BuyerDashboard";
import SellerDashboard from "../pages/seller/SellerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Register from "../pages/Register";

function AppRoute() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<Services />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/buyer" element={<BuyerDashboard />} />

      <Route path="/seller" element={<SellerDashboard />} />

      <Route path="/admin" element={<AdminDashboard />} />

      {/* <Route path="/login" element={<PublicRoute>
<Login/>
</PublicRoute>}
/> */}
    </Routes>
  );
}
export default AppRoute;
