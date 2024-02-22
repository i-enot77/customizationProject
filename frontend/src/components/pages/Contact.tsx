import ContactForm from "../common/ContactForm";
import Footer from "../navigation/footer/Footer";
import SectionItem from "../section/SectionItem";

function Contact() {
  return (
    <>
      <SectionItem className="w-[1312px] h-[93%] px-4 items-center overflow-y-auto no-scrollbar">
        <div className="flex-initial w-[36%]">
          <p className="mb-4 text-lg font-medium">
            Zapraszamy do kontaktu z nami!
          </p>
          <p className="leading-relaxed mb-3">
            ul. Płocka 25
            <br />
            00-123 Warszawa
            <br />
            Poniedziałek - Piątek 10-17
          </p>
          <a href="mailto:office@office.pl">office@office.pl</a>

          <div className="my-3">
            <p>Przemysław Kowalczyk</p>
            <a href="tel:+48 987 567 345">+48 987 567 345</a>
          </div>

          <div>
            <p>Agnieszka Nowak</p>
            <a href="tel:+48 987 567 987">+48 987 567 987</a>
          </div>
        </div>
        <div className="flex-initial w-[60%]">
          <ContactForm />
        </div>
      </SectionItem>
      <Footer />
    </>
  );
}

export default Contact;
