import { useState, useEffect } from "react";
import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js";

export const usePhoneNumber = (
  initialPhoneNumber: string | null | undefined
) => {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState<CountryCode>("PL");

  useEffect(() => {
    if (initialPhoneNumber) {
      const parsedPhone = parsePhoneNumberFromString(initialPhoneNumber);
      if (parsedPhone) {
        setPhone(parsedPhone.formatInternational());
        setCountry(parsedPhone.country || "PL");
      } else {
        setPhone("");
        setCountry("PL");
      }
    }
  }, [initialPhoneNumber]);

  return { phone, country };
};
