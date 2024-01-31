import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import CartEmpty from "./components/cart/CartEmpty";

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
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
          <Route path="/cart" element={<CartEmpty />} />

          <Route element={<PersistLogin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
