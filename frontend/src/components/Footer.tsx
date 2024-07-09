import { Link } from "react-router-dom";
import { contactData, clientData, infoData } from "../configs/footerConfig";

interface FooterItem {
  link: string;
  content: string;
}

function Footer() {
  return (
    <footer className="w-[70%] justify-self-end mx-auto bg-white  py-8 px-4 shadow-inner">
      <div className="px-4  grid grid-cols-3 grid-rows-1 gap-14 text-sm items-end">
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
    </footer>
  );
}

export default Footer;
