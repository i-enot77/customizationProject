import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button";
import { useState } from "react";
import DropMenu from "./DropMenu";
import { useAppDispatch } from "../../services/hooks";
import { toggleShowCart } from "../../services/cartSlice";

const Header = () => {
  const [isOpen, setOpen] = useState(true);
  const toggleOpen = () => {
    setOpen(!isOpen);
  };
  const dispatch = useAppDispatch();
  const style = {
    item: `mr-7 last:mr-0 uppercase font-semibold text-lg`,
    nav: ` relative w-full bg-white shadow-sm px-4 py-7 fixed top-0 left-[50%] -translate-x-[50%] z-50`,
  };

  return (
    <nav className={style.nav}>
      <div className="w-[1312px] mx-auto flex justify-between items-center">
        <div className="flex list-none">
          <Link to={"/"} className={style.item}>
            logo
          </Link>

          <Button className={style.item} onClick={toggleOpen}>
            produkty
          </Button>

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
      <DropMenu isOpen={isOpen} />
    </nav>
  );
};

export default Header;
