import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <section className="w-[90%] lg:w-[80%] flex-grow flex flex-col justify-center items-center lg:flex-row">
        <div className="flex-initial w-[90%] lg:w-[40%] text-center lg:text-start lg:pl-6 my-12 lg:my-0">
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
        <div className="flex-initial w-full lg:w-[55%] px-6  py-4">
          <ContactForm />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
