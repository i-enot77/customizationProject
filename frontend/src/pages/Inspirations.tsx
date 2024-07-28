import Card from "@/components/Card";
import HeaderItem from "@/components/HeaderItem";
import ResponsiveImg from "@/components/ResponsiveImg";
import { materials } from "@/configs/materials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { productsCarousel } from "@/configs/productsCarousel";
import Footer from "@/components/Footer";

const Inspirations = () => {
  const style = {
    sectionClass: `w-full flex flex-col lg:flex-row lg:justify-center lg:items-end flex-wrap my-10`,
    cardText: `text-2xl font-medium py-2 pl-10`,
  };
  return (
    <>
      <main className="flex flex-col items-center">
        <h2 className="text-3xl font-medium py-4 mt-10">
          Trendy we Wnętrzach 2024: Nowoczesność z Duszą
        </h2>

        <section className={style.sectionClass}>
          <HeaderItem
            headerWrapper="lg:w-[39%] w-full"
            headerClass="mb-4"
            headerContent="Kolory Ziemi i Palety Natury"
            content="W roku 2024 kochamy się w ziemi. Kolory inspirowane naturą, takie jak ciepłe odcienie brązów, beży, zielenie i spokojne niebieskie, dodają wnętrzom harmonii i przytulności. Połączenie tych kolorów tworzy spokojną oazę, sprzyjającą relaksowi."
          />
          <div className="w-full flex-initial lg:w-[60%]">
            <ResponsiveImg
              small="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar07_640.jpg?t=2024-07-08T09%3A52%3A25.967Z"
              medium="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar07_800.jpg?t=2024-07-08T09%3A52%3A15.956ZZ"
              large="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar07_1024.jpg"
            />
          </div>
        </section>

        <section className={style.sectionClass}>
          <div className="w-full flex-initial lg:w-[60%]">
            <ResponsiveImg
              small="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar07_640.jpg?t=2024-07-08T09%3A52%3A25.967Z"
              medium="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar07_800.jpg?t=2024-07-08T09%3A52%3A15.956ZZ"
              large="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar07_1024.jpg"
            />
          </div>
          <HeaderItem
            headerWrapper="lg:w-[39%] w-full"
            headerClass="mb-4"
            headerContent="Materiały Ekologiczne i Naturalne"
            content="W tym roku wzrasta popularność mebli wykonanych z naturalnych i ekologicznych materiałów. Drewno, rattan, kamień, a także tkaniny z organicznych włókien stają się kluczowymi graczami. Połączenie designu z dbałością o środowisko to nie tylko trendy, ale i zobowiązanie do zrównoważonego stylu życia."
          />
        </section>

        <section className={style.sectionClass}>
          <HeaderItem
            headerWrapper="lg:w-[39%] w-full"
            headerClass="mb-4"
            headerContent="Metaliczne Elegancje"
            content="Dodatki w kolorze złota, miedzi czy srebra nadają wnętrzom elegancji i luksusu. Subtelne metaliczne detale, takie jak uchwyty czy stoliki, stają się ważnym elementem, dodającym blasku i charakteru."
          />
          <div className="w-full flex-initial lg:w-[60%]">
            <ResponsiveImg
              small="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar07_640.jpg?t=2024-07-08T09%3A52%3A25.967Z"
              medium="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar07_800.jpg?t=2024-07-08T09%3A52%3A15.956ZZ"
              large="https://aadrlikldnsqjrqrpedi.supabase.co/storage/v1/object/public/img/avatar07_1024.jpg"
            />
          </div>
        </section>

        <section className="my-8">
          <div>
            <h2 className="text-xl font-medium py-4">
              Jakich materiałów używamy:
            </h2>
            <div>
              Dlatego też korzystamy tylko z drewna i płyt od sprawdzonych
              dostawców, z kolei wykorzystywane przez nas lakiery wyróżniają się
              atestami bezpieczeństwa (są odpowiednie dla dzieci). Daje nam to
              pewność, że nasze meble nawet po latach wciąż będą zachwycać Cię
              wyglądem, a korzystanie z nich będzie dla Ciebie niezmiennie
              prawdziwą przyjemnością. U nas zamówisz meble w wielu kolorach i
              wykończeniach frontów – od w pełni gładkich (matowych lub
              lakierowanych na wysoki połysk), przez frezowane, po ażurowe. Z
              nami stworzysz aranżację, która podkreśli niepowtarzalny styl
              Twojego domu. I to niezależnie od tego, czy zechcesz nadać jej
              przytulny, rustykalny charakter, czy wręcz przeciwnie: urządzić
              wnętrza nowoczesne i bardzo minimalistyczne. Pomożemy Ci osiągnąć
              dokładnie taki efekt, na którym Ci zależy!
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-max gap-2 lg:gap-4 xl:gap-5 mt-4">
            {materials.map((item, index) => (
              <Card
                key={index}
                small={item.mtlSmall}
                medium={item.mtlMedium}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <section className="w-full">
          <Carousel className="w-[95%] my-0 mx-auto py-6">
            <h2 className={`${style.cardText} pl-0 mb-2`}>
              Wybrane realizacje
            </h2>
            <CarouselContent>
              {productsCarousel.map((item, index) => (
                <CarouselItem key={index} className="basis-1/3 cursor-pointer">
                  <ResponsiveImg
                    small={item.small}
                    medium={item.medium}
                    large={item.large}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Inspirations;
