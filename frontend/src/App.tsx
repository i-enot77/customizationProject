import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CartModal from "./features/cart/components/CartModal";
import ResetPwdRequest from "./features/auth/pages/ResetPwdRequest";
import ResetPassword from "./features/auth/pages/ResetPassword";
import SendEmailInfo from "./features/auth/pages/SendEmailInfo";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Returns from "./pages/Returns";
import Products from "./features/product/pages/Products";
import CartSummaryForm from "./features/cart/pages/CartSummaryForm";
import ProductDescription from "./features/product/pages/ProductDescription";
import Success from "./features/cart/pages/Success";
import Cancel from "./features/cart/pages/Cancel";
import Inspirations from "./pages/Inspirations";
import useAuthRefresh from "./features/auth/hooks/usePersistLogin";
import UserAccount from "./features/user/pages/UserAccount";

const App = () => {
  useAuthRefresh();

  const location = useLocation();
  const hideHeaderRoutes = ["/success", "/cancel"];

  return (
    <div className="App">
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <CartModal />
      <Routes>
        <Route path="/request-reset" element={<ResetPwdRequest />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/sended-email" element={<SendEmailInfo />} />

        <Route path="/account" element={<Account />} />
        <Route path="/user-account" element={<UserAccount />} />

        <Route path="/" element={<Home />} />
        <Route path="/inspiration" element={<Inspirations />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/returns" element={<Returns />} />

        <Route path="/products/:category" element={<Products />} />
        <Route path="/:category/:_id" element={<ProductDescription />} />

        <Route path="/cart-sum" element={<CartSummaryForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </div>
  );
};

export default App;
