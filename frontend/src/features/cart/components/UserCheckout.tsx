import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LoginForm from "@/features/auth/pages/LoginForm";
import UserDataForm from "./UserDataForm";
import { Link } from "react-router-dom";

function UserCheckout({ nextStep }: { nextStep?: () => void }) {
  const style = {
    header: `text-xl font-semibold`,
    trigger: `text-lg font-medium`,
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <h2 className={style.header}>Masz konto użytkownika?</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className={style.trigger}>
            Zaloguj się
          </AccordionTrigger>
          <AccordionContent>
            <LoginForm />
            <Link
              to="/account"
              className="block text-center underline underline-offset-2 font-medium"
            >
              albo przejdz do rejestracji
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="my-2">albo</div>

      <h2 className={`${style.trigger} mb-2`}>Zapłać jako gość</h2>
      <UserDataForm nextStep={nextStep} />
    </div>
  );
}

export default UserCheckout;
