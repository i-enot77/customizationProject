import { Link } from "react-router-dom";
import { contactData, clientData, infoData } from "../configs/footerConfig";

interface FooterItem {
  link: string;
  content: string;
}

function Footer() {
  return (
    <div className="w-full bg-white  py-8 px-4 shadow-inner">
      <div className="xlg:w-[704px] px-4 mx-auto grid grid-cols-3 grid-rows-1 gap-14 text-sm">
        <ul>
          <li className="mb-1 text-base">Logo</li>
          {contactData.map((item: FooterItem, index: number) => (
            <li key={index} className="mb-1 last:mb-0">
              {item.content}
              <Link to={item.link}>{item.content}</Link>
            </li>
          ))}
        </ul>

        <ul>
          <li className="mb-1 text-base">Panel klienta</li>
          {clientData.map((client: FooterItem, index: number) => (
            <li key={index} className="mb-1 last:mb-0">
              <Link to={client.link}>{client.content}</Link>
            </li>
          ))}
        </ul>

        <ul>
          <li className="mb-1 text-base">Informacje</li>
          {infoData.map((info: FooterItem, index: number) => (
            <li key={index} className="mb-1 last:mb-0">
              <Link to={info.link}>{info.content}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Footer;
