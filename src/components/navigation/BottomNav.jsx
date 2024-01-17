import { Link } from "react-router-dom";

function BottomNav() {
  const contactData = [
    {
      content: "email: ",
      contact: "office@office.pl",
      link: "mailto:office@office.pl",
    },
    {
      content: "tel: ",
      contact: "+48 987 567 345",
      link: "tel:+48 987 567 345",
    },
  ];

  const clientData = [
    { content: "Rejestracja", link: "/" },
    { content: "Logowanie", link: "/" },
    { content: "Zamówienia", link: "/" },
  ];

  const infoData = [
    { content: "Zwroty i reklamacje", link: "/" },
    { content: "Dostawa i płatność", link: "/" },
    { content: "Gwarancja", link: "/" },
  ];
  return (
    <div className="w-full bg-white fixed bottom-0 left-[50%] -translate-x-[50%] z-50 py-8 px-4 shadow-inner">
      <div className="w-[704px] px-4 mx-auto grid grid-cols-3 grid-rows-1 gap-14 text-sm">
        <ul>
          <li className="mb-1 text-base">Logo</li>
          {contactData.map((item, index) => (
            <li key={index} className="mb-1 last:mb-0">
              {item.content}
              <Link to={item.link}>{item.contact}</Link>
            </li>
          ))}
        </ul>

        <ul>
          <li className="mb-1 text-base">Panel klienta</li>
          {clientData.map((client, index) => (
            <li key={index} className="mb-1 last:mb-0">
              <Link to={client.link}>{client.content}</Link>
            </li>
          ))}
        </ul>

        <ul>
          <li className="mb-1 text-base">Informacje</li>
          {infoData.map((info, index) => (
            <li key={index} className="mb-1 last:mb-0">
              <Link to={info.link}>{info.content}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BottomNav;
