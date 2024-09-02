import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { toggleShowCart } from "../services/cartSlice";
import { useAppDispatch } from "../services/hooks";
import { setCategory } from "../services/productSlice";
import Button from "./Button";
import { menuConfig } from "../configs/menuConfig";
import LoginOrRegister from "@/features/user/components/LoginOrRegister";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";
import AccountInfo from "@/features/user/components/AccountInfo";

const Header = () => {
  const isLogged = useSelector(
    (state: RootState) => state.auth.auth.isAuthenticated
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const style = {
    item: `mr-7 last:mr-0 uppercase font-semibold text-lg`,
    nav: `sticky w-full bg-white shadow-sm px-8 py-7 top-0 left-0 z-[9] flex justify-between`,
    productMenu: `list-none absolute left-0 top-[4rem] w-full bg-white z-100 py-2 px-24 oveflow-hidden `,
    accountMenu: `absolute right-0 top-[4rem] text-right w-full flex justify-end bg-white z-100 py-2 px-2 oveflow-hidden`,
    btn: `uppercase font-medium cursor-pointer`,
  };

  return (
    <nav className={style.nav}>
      <div className="flex">
        <Link to={"/"} className={style.item}>
          logo
        </Link>

        <Menu>
          <MenuButton className={style.item}>produkty</MenuButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-700"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-500"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className={style.productMenu}>
              {menuConfig.map((item, index) => (
                <MenuItem
                  as="li"
                  key={index}
                  className={style.btn}
                  onClick={() => {
                    dispatch(setCategory(item));
                    navigate(`/products/${item}`);
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </Menu>

        <Link to="/inspiration" className={style.item}>
          inspiracja
        </Link>

        <Link to="/contact" className={style.item}>
          kontakt
        </Link>
      </div>
      <div>
        <Menu>
          <MenuButton className={style.item}>
            <FontAwesomeIcon
              icon={faUser}
              size="xl"
              style={{ color: "#000000" }}
            />
          </MenuButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-700"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-500"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className={style.accountMenu}>
              <MenuItem as="div" className="w-max text-center">
                {isLogged ? <AccountInfo /> : <LoginOrRegister />}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>

        <Button className="mr-4" onClick={() => dispatch(toggleShowCart())}>
          <FontAwesomeIcon
            icon={faBagShopping}
            size="xl"
            style={{ color: "#000000" }}
          />
        </Button>
      </div>
    </nav>
  );
};

export default Header;
