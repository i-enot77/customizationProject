import { Link } from "react-router-dom";
import BottomNav from "../../navigation/footer/Footer";
import SectionItem from "../../section/SectionItem";
import MyPdf from "./toDownload.pdf";

const Returns = () => {
  const style = {
    header: `text-2xl font-semibold`,
    content: `font-medium text-center`,
  };

  return (
    <>
      <SectionItem sectionClass="w-[1312px] h-[74%] px-4 flex-col items-center overflow-y-auto no-scrollbar">
        <h4 className={style.header}>Zwroty i reklamacje</h4>
        <div className={`${style.content} text-lg`}>
          <h4 className={`${style.header} uppercase `}>uwaga!</h4>
          <p>
            Należy koniecznie rozpakować produkt przy kurierze! W przypadku
            uszkodzeń produktu, należy sporządzić protokół zniszczenia –
            wypełniając formularz kuriera. Brak protokołu zniszczenia – skutkuje
            brakiem pokrycia kosztów naprawy lub wymiany produktu.
          </p>
        </div>
        <div className={style.content}>
          <h4 className={`${style.header} my-3`}>Zwroty</h4>
          <p>
            Wierzymy, że produkty przez nas stworzone idealnie wpasują się w
            Twoją przestrzeń. Jeśli jednak zdecydujesz się na zwrot, możesz
            odstąpić od umowy kupna w ciągu 15 dni od dnia otrzymania mebli.
            Odsyłany przedmiot powinien być nieuszkodzony, odpowiednio
            zabezpieczony na czas transportu oraz oryginalnie zapakowany. Klient
            jest odpowiedzialny za logistykę związaną ze zwrotem oraz ponosi
            koszty przesyłki.
          </p>
          <p>
            W przypadku realizacji zamówień mebli ze zmienionymi wymiarami,
            kolorystyką lub użytym materiałem, nie ma możliwości dokonania
            zwrotu. Produkt ten jest tworzony na indywidualne zamówienie
            klienta, skutkiem czego nie może być ponownie sprzedany.
          </p>
          <p>
            Aby skorzystać z prawa odstąpienia od umowy, muszą Państwo
            poinformować nas e-mail:{" "}
            <a
              className="underline decoration-sky-500 underline-offset-4"
              href="mailto:office@office.pl"
            >
              office@office.pl
            </a>
            , tel:{" "}
            <a
              className="underline decoration-sky-500 underline-offset-4"
              href="tel:+48 987 567 345"
            >
              +48 987 567 345
            </a>{" "}
            o swojej decyzji o odstąpieniu od niniejszej umowy w drodze
            jednoznacznego oświadczenia (na przykład pismo wysłane pocztą lub
            pocztą elektroniczną). Mogą Państwo skorzystać z wzoru formularza
            odstąpienia od umowy, jednak nie jest to obowiązkowe.
          </p>
          <p className="mb-8">
            Aby zachować termin do odstąpienia od umowy, wystarczy, aby wysłali
            Państwo informację dotyczącą wykonania przysługującego Państwu prawa
            odstąpienia od umowy przed upływem terminu do odstąpienia od umowy.
            Środki zostaną przekazane na konto klienta w przeciągu 14 dni od
            daty otrzymania nieuszkodzonego towaru.
          </p>

          <Link
            to={MyPdf}
            download="Formularz_zwrotu"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white py-2 px-8 bg-[#2A254B] rounded-md"
          >
            Formularz zwrotu
          </Link>
        </div>
        <div className={`${style.content} mb-3`}>
          <h4 className={`${style.header} my-3`}>Reklamacje</h4>
          <p>
            Po otrzymaniu przesyłki należy sprawdzić wszystkie produkty w ciągu
            7 dni i poinformować nas o ewentualnych brakach lub wadach.
            Wymienimy wszystkie meble, które dotarły uszkodzone lub doślemy
            brakujące elementy najszybciej jak to możliwe.
          </p>
        </div>
      </SectionItem>
      <BottomNav />
    </>
  );
};

export default Returns;
