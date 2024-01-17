import { Routes, Route } from "react-router-dom";
import "./App.css";
import RegistrationForm from "../src/components/login/RegistrationForm";
import LoginForm from "../src/components/login/LoginForm";
import Account from "./components/pages/Account";
import TopNav from "./components/navigation/TopNav";
import BottomNav from "./components/navigation/BottomNav";
import PersistLogin from "./components/login/PersistLogin";
import SendEmailInfo from "./components/login/SendEmailInfo";
import ResetPwdRequest from "./components/login/ResetPwdRequest";
import ResetPassword from "./components/login/ResetPassword";
import Home from "./components/pages/Home";

function App() {
  return (
    <div className="App">
      <TopNav />
      <Routes>
        <Route path="/request-reset" element={<ResetPwdRequest />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path={"/sended-email"} element={<SendEmailInfo />} />
        <Route path={"/account"} element={<Account />} />
        <Route path={"/"} element={<Home />} />
        <Route path={"/register"} element={<RegistrationForm />} />
        <Route path={"/login"} element={<LoginForm />} />
        <Route element={<PersistLogin />}></Route>
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
