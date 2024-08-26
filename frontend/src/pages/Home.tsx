import { productsCarousel } from "@/configs/productsCarousel";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import HeaderItem from "../components/HeaderItem";
import ResponsiveImg from "../components/ResponsiveImg";
import { aboutUs } from "../configs/homePageConfig";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { setCategory } from "@/services/productSlice";
import { useAppDispatch } from "@/services/hooks";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const style = {
    sectionClass: `w-full flex flex-col lg:flex-row lg:justify-center lg:items-end flex-wrap my-10`,
    main: `w-full my-4 bg-white`,
    cardText: `text-2xl font-medium py-2 pl-10`,
  };
  return (
    <>
      <main className={`${style.main}`}>
        <section className={style.sectionClass}>
          <HeaderItem
            headerWrapper="lg:w-[39%] w-full flex-initial"
            headerClass="mb-4"
            headerContent="Minimalistyczne, dostosowane do twoich potrzeb meble do salonu, do
        sypialni oraz do przedpokoju."
            content="Szukasz mebli z materialów organicznych, które doskonale wpasują
        się w otoczenie i podkreślą twój unikalny styl? wybierz
        ponadczasowe meble stworzone z troską o najmniejszy detal z
        wykorzystaniem doskonałej jakości materiałów i możliwością
        personalizacji. postaw na nowoczesną klasykę, szlachetnę formy i
        niebanalny design, który doskonale dopełni twoje wnętrze."
          />
          <div className="w-full flex-initial lg:w-[60%]">
            <ResponsiveImg
              small="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar07_640.jpg?t=2024-07-08T09%3A52%3A25.967Z"
              medium="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar07_800.jpg?t=2024-07-08T09%3A52%3A15.956ZZ"
              large="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar07_1024.jpg"
            />
          </div>
        </section>

        <Carousel className="w-[95%] my-0 mx-auto py-6">
          <h2 className={`${style.cardText} pl-0 mb-2`}>Czego poszukujesz?</h2>
          <CarouselContent>
            {productsCarousel.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-1/3 cursor-pointer"
                onClick={() => {
                  dispatch(setCategory(item.category.toLocaleLowerCase()));
                  navigate(`/products/${item.category.toLowerCase()}`);
                }}
              >
                <ResponsiveImg
                  small={item.small}
                  medium={item.medium}
                  large={item.large}
                />

                <div className={style.cardText}>{item.category}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <section className={style.sectionClass}>
          <h2 className="flex-initial w-full lg:w-[39%] text-3xl mb-4">
            Nadaj uroku swoim wnętrzom dzięki meblom z materiałów organicznych
          </h2>
          <div className="flex-initial w-full lg:w-[59%]">
            {aboutUs.map((item, index) => (
              <HeaderItem
                key={index}
                headerWrapper=""
                headerClass="mb-2"
                headerContent={item.headerContent}
                content={item.content}
              />
            ))}
          </div>
        </section>
        <section className={style.sectionClass}>
          <div className="w-full flex-initial lg:w-[60%]">
            <ResponsiveImg
              small="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar02_640.jpg?t=2024-07-08T10%3A19%3A25.948Z"
              medium="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar02_800.jpg"
              large="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar02_1024.jpg?t=2024-07-08T10%3A19%3A09.049Z"
            />
          </div>
          <HeaderItem
            headerWrapper="lg:w-[39%] lg:pb-8 w-full"
            headerClass="mb-4"
            headerContent="Meble na lata"
            content="Nietuzinkowe formy, starannie dobrane kolory oraz rzemieślnicze metody produkcji mebli tworzą jakość, która obroni się zarówno w futurystycznej, jak i tradycyjnej aranżacji. Unikalny design i szeroki wybór odcieni pozwala na skomponowanie wystroju skrojonego na miarę Twojego gustu i osobowości."
          />
        </section>
        <section className={style.sectionClass}>
          <HeaderItem
            headerWrapper="w-full lg:w-[40%]"
            headerClass="mb-4"
            headerContent="Zainteresowała Cię nasza oferta?"
            content="Skorzystaj z formularza dostępnego na naszej stronie, wyślij nam wiadomość email albo zadzwoń – odpowiemy na wszystkie Twoje pytania. 
          Wolisz osobiste spotkanie z nami? Zadzwoń i zarezerwuj termin! Podczas spotkania w naszym punkcie sprzedaży przedstawimy Ci próbki dostępnych u nas kolorów i materiałów. Już na tym etapie służymy też w pełni darmowym, profesjonalnym doradztwem."
          />
          <div className="w-[80%] lg:w-[50%] flex flex-col justify-center self-center">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
