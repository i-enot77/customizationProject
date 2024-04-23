import { Routes, Route } from "react-router-dom";
import "./App.css";
import RegistrationForm from "../src/components/login/RegistrationForm";
import LoginForm from "../src/components/login/LoginForm";
import Account from "../src/components/pages/Account";
import Header from "../src/components/navigation/Header";
import PersistLogin from "../src/components/login/PersistLogin";
import SendEmailInfo from "../src/components/login/SendEmailInfo";
import ResetPwdRequest from "../src/components/login/ResetPwdRequest";
import ResetPassword from "../src/components/login/ResetPassword";
import Home from "../src/components/pages/home/Home";
import Contact from "../src/components/pages/Contact";
import Returns from "../src/components/pages/returns/Returns";

// import Scene from "./components/models/Scene";
import Products from "./components/pages/Products";
import ProductDescription from "./components/pages/ProductDescription";
import CartModal from "./components/cart/CartModal";
import CartSummaryForm from "./components/cart/CartSummaryForm";
import Success from "./components/cart/Success";
import Cancel from "./components/cart/Cancel";

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

        <Route
          path="/products/:category/:_id"
          element={<ProductDescription />}
        />
        <Route path="/cart-sum" element={<CartSummaryForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        <Route element={<PersistLogin />}></Route>
      </Routes>

      {/* <Scene /> */}
    </div>
  );
};

export default App;
