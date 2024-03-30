import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Button from "../common/Button";
import { useAppDispatch } from "../../services/hooks";
import { toggleShowCart } from "../../services/cartSlice";
import { setCategory } from "../../services/productSlice";

const menuItems = ["sofy", "fotele", "krzesła", "stoły", "lampy"];

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const style = {
    item: `mr-7 last:mr-0 uppercase font-semibold text-lg`,
    nav: `relative w-full bg-white shadow-sm px-4 py-7 fixed top-0 left-[50%] -translate-x-[50%] z-50`,
    productMenu: `absolute left-0 top-[4rem] w-full bg-white z-10 py-2 px-24 oveflow-hidden transition-all duration-700 ease-in-out`,
    btn: `uppercase font-medium cursor-pointer`,
  };

  return (
    <nav className={style.nav}>
      <div className="mx-auto flex justify-between items-center">
        <div className="flex list-none">
          <Link to={"/"} className={style.item}>
            logo
          </Link>

          <Menu>
            <Menu.Button className={style.item}>produkty</Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className={style.productMenu}>
                {menuItems.map((item, index) => (
                  <Menu.Item
                    as="li"
                    key={index}
                    className={style.btn}
                    onClick={() => {
                      dispatch(setCategory(item));
                      navigate(`/products/${item}`);
                    }}
                  >
                    {item}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>

          <Link to={"/"} className={style.item}>
            inspiracja
          </Link>

          <Link to={"/"} className={style.item}>
            kontakt
          </Link>
        </div>
        <div>
          <Link to={"/"} className="mr-4">
            <FontAwesomeIcon
              icon={faUser}
              size="xl"
              style={{ color: "#000000" }}
            />
          </Link>
          <Button onClick={() => dispatch(toggleShowCart())}>
            <FontAwesomeIcon
              icon={faBagShopping}
              size="xl"
              style={{ color: "#000000" }}
            />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
