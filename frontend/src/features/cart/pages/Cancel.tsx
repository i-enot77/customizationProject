import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Cancel() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <FontAwesomeIcon
        icon={faCircleXmark}
        size="2xl"
        style={{ color: "#e12d2d" }}
      />
      <h2 className="text-2xl font-medium py-5">
        Twoja płatność została anulowana
      </h2>
      <div className="text-lg mb-5">
        Twoja płatność nie została zrealizowana. Nie pobrano żadnych opłat.
        Możesz skontaktować się z nami aby uzyskać pomoc!
      </div>
      <Link
        to="/"
        className="text-lg text-white bg-[#5548a7] py-2 px-4 rounded"
      >
        Wróć do sklepu
      </Link>
    </div>
  );
}

export default Cancel;
