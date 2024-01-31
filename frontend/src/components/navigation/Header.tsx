import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navData = [
    { content: "logo", link: "/" },
    { content: "produkty", link: "/" },
    { content: "inspiracja", link: "/" },
    { content: "kontakt", link: "/" },
  ];
  return (
    <nav className="w-full bg-white shadow-sm px-4 py-7 fixed top-0 left-[50%] -translate-x-[50%] z-50">
      <div className="w-[1312px] mx-auto flex justify-between items-center">
        <ul className="flex list-none">
          {navData.map((item, index) => (
            <li
              key={index}
              className="mr-7 last:mr-0 uppercase font-semibold text-lg"
            >
              <Link className="" to={item.link}>
                {item.content}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <Link to={"/"} className="mr-4">
            <FontAwesomeIcon
              icon={faUser}
              size="xl"
              style={{ color: "#000000" }}
            />
          </Link>
          <Link to={"/"}>
            <FontAwesomeIcon
              icon={faBagShopping}
              size="xl"
              style={{ color: "#000000" }}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
