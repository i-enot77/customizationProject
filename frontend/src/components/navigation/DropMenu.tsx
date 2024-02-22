import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../services/hooks";
import { setCategory } from "../../services/productSlice";
import Button from "../common/Button";

const DropMenu = ({ isOpen }: { isOpen: boolean }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const menuItems = ["sofy", "fotele", "krzesła", "stoły", "lampy"];

  const style = {
    productMenu: `absolute left-0 top-[5.2rem] w-full bg-white z-10 py-2 px-24 oveflow-hidden transition-all duration-700 ease-in-out`,
    height: isOpen ? "150px" : "0",
    width: isOpen ? "auto" : "0",
    opacity: isOpen ? "1" : "0",
    opacityTransitionDuration: isOpen ? "duration-500" : "duration-100",
    opacityTransitionDelay: isOpen ? "delay-300" : "delay-0",
    btn: `uppercase font-medium`,
  };

  return (
    <ul
      className={style.productMenu}
      style={{
        height: style.height,
        width: style.width,
        opacity: style.opacity,
      }}
    >
      <div
        className={`mb-1 last:mb-0 transition-opacity ease-linear ${style.opacityTransitionDuration} ${style.opacityTransitionDelay}`}
        style={{
          height: style.height,
          width: style.width,
          opacity: style.opacity,
        }}
      >
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              dispatch(setCategory(item));
              navigate("/products");
            }}
          >
            <Button className={style.btn}>{item}</Button>
          </li>
        ))}
      </div>
    </ul>
  );
};

export default DropMenu;
