import SectionItem from "../../section/SectionItem";
import HeaderItem from "../../common/HeaderItem";
import ResponsiveImg from "../../common/ResponsiveImg";
import { aboutUs } from "./homePageData";
import ContactForm from "../../common/ContactForm";
import Footer from "../../navigation/footer/Footer";

const Home = () => {
  const style = {
    sectionClass: `w-full items-end`,
  };
  return (
    <>
      <main className="w-[1312px] px-4 h-[93%] flex flex-col justify-center items-center">
        <div className="w-full h-full my-4 overflow-y-auto no-scrollbar">
          <SectionItem sectionClass={style.sectionClass}>
            <HeaderItem
              headerWrapper="w-[39%]"
              headerContent="Minimalistyczne, dostosowane do twoich potrzeb meble do salonu, do
        sypialni oraz do przedpokoju."
              content="Szukasz mebli z materialów organicznych, które doskonale wpasują
        się w otoczenie i podkreślą twój unikalny styl? wybierz
        ponadczasowe meble stworzone z troską o najmniejszy detal z
        wykorzystaniem doskonałej jakości materiałów i możliwością
        personalizacji. postaw na nowoczesną klasykę, szlachetnę formy i
        niebanalny design, który doskonale dopełni twoje wnętrze."
            />
            <ResponsiveImg
              mediaWrapper="flex-initial w-[59%] bg-amber-500"
              small=""
              medium=""
              large=""
            />
          </SectionItem>

          <SectionItem sectionClass={style.sectionClass}>
            <h2 className="flex-initial w-[39%] text-3xl">
              Nadaj uroku swoim wnętrzom dzięki meblom z materiałów organicznych
            </h2>
            <div className="flex-initial w-[59%]">
              {aboutUs.map((item, index) => (
                <HeaderItem
                  key={index}
                  headerWrapper="mb-5 last:mb-0"
                  headerClass="text-2xl mb-2"
                  headerContent={item.headerContent}
                  content={item.content}
                />
              ))}
            </div>
          </SectionItem>

          <SectionItem sectionClass={style.sectionClass}>
            <ResponsiveImg
              mediaWrapper="flex-initial w-[59%] bg-amber-500"
              small=""
              medium=""
              large=""
            />
            <HeaderItem
              headerWrapper="w-[39%]"
              headerContent="Meble na lata"
              content="Nietuzinkowe formy, starannie dobrane kolory oraz rzemieślnicze metody produkcji mebli tworzą jakość, która obroni się zarówno w futurystycznej, jak i tradycyjnej aranżacji. Unikalny design i szeroki wybór odcieni pozwala na skomponowanie wystroju skrojonego na miarę Twojego gustu i osobowości."
            />
          </SectionItem>

          <SectionItem sectionClass={style.sectionClass}>
            <HeaderItem
              headerWrapper="w-[40%]"
              headerContent="Zainteresowała Cię nasza oferta?"
              content="Skorzystaj z formularza dostępnego na naszej stronie, wyślij nam wiadomość email albo zadzwoń – odpowiemy na wszystkie Twoje pytania. 
          Wolisz osobiste spotkanie z nami? Zadzwoń i zarezerwuj termin! Podczas spotkania w naszym punkcie sprzedaży przedstawimy Ci próbki dostępnych u nas kolorów i materiałów. Już na tym etapie służymy też w pełni darmowym, profesjonalnym doradztwem."
            />
            <div className="w-[58%] flex flex-col justify-center items-center">
              <ContactForm />
            </div>
          </SectionItem>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
