import ContactForm from "../common/ContactForm";
import Footer from "../navigation/footer/Footer";

function Contact() {
  return (
    <div className="custom-container xxl:w-[80%] h-[90%] grid grid-cols-1 grid-rows-[3fr_.5fr]">
      <section className="self-center flex flex-col items-center lg:flex-row lg:justify-between lg:items-end">
        <div className="flex-initial w-[80%] lg:w-[40%] text-center lg:text-start lg:pl-6 my-12 lg:my-0">
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
        <div className="flex-initial w-full md:w-[80%] lg:w-[55%] pl-6  pb-4 lg:pb-0">
          <ContactForm />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
