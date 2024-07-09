import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CartModal from "./features/cart/components/CartModal";
import ResetPwdRequest from "./features/auth/pages/ResetPwdRequest";
import ResetPassword from "./features/auth/pages/ResetPassword";
import SendEmailInfo from "./features/auth/pages/SendEmailInfo";
import Account from "./pages/Account";
import Home from "./pages/Home";
import RegistrationForm from "./features/auth/pages/RegistrationForm";
import LoginForm from "./features/auth/pages/LoginForm";
import Contact from "./pages/Contact";
import Returns from "./pages/Returns";
import Products from "./features/product/pages/Products";
import CartSummaryForm from "./features/cart/pages/CartSummaryForm";
import ProductDescription from "./features/product/pages/ProductDescription";
import Success from "./features/cart/pages/Success";
import Cancel from "./features/cart/pages/Cancel";
import PersistLogin from "./features/auth/pages/PersistLogin";

const App = () => {
  return (
    <div className="App">
      <Header />
      <CartModal />
      <Routes>
        <Route path="/request-reset" element={<ResetPwdRequest />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/sended-email" element={<SendEmailInfo />} />
        <Route path="/account" element={<Account />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/returns" element={<Returns />} />

        <Route path="/products/:category" element={<Products />} />
        <Route path="/:category/:_id" element={<ProductDescription />} />

        <Route path="/cart-sum" element={<CartSummaryForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        <Route element={<PersistLogin />}></Route>
      </Routes>
    </div>
  );
};

export default App;
