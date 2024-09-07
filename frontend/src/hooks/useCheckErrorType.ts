import { useState, useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "@/services/helpers/checkErrorType";

export const useCheckErrorType = (error: unknown, isSuccess: boolean) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess) {
      setErrorMessage(null);
    } else if (error && isFetchBaseQueryError(error)) {
      const fetchError = error as FetchBaseQueryError;
      if (fetchError.status === "FETCH_ERROR") {
        setErrorMessage(
          fetchError.error || "Network error, please try again later."
        );
      } else if (
        "data" in fetchError &&
        typeof fetchError.data === "object" &&
        fetchError.data
      ) {
        // Extract message if possible
        const message = (fetchError.data as any).message;
        setErrorMessage(message || "Error occurred");
      } else {
        setErrorMessage("Wystąpił błąd");
      }
    } else if (error && isErrorWithMessage(error) && error.message) {
      setErrorMessage(error.message);
    } else if (error) {
      // Generic error fallback only if error is actually defined
      setErrorMessage("An unexpected error occurred.");
    }
  }, [error, isSuccess]);

  return errorMessage;
};

// import { useState, useEffect } from "react";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import {
//   isFetchBaseQueryError,
//   isErrorWithMessage,
// } from "@/services/helpers/checkErrorType";

// export const useCheckErrorType = (error: unknown, isSuccess: boolean) => {
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   useEffect(() => {
//     if (isSuccess) {
//       setErrorMessage(null);
//     } else if (isFetchBaseQueryError(error)) {
//       const fetchError = error as FetchBaseQueryError;
//       if (
//         "data" in fetchError &&
//         typeof fetchError.data === "object" &&
//         fetchError.data
//       ) {
//         const message = (fetchError.data as any).message;
//         setErrorMessage(message || "Error occurred");
//       } else {
//         setErrorMessage("Wystąpił błąd");
//       }
//     } else if (isErrorWithMessage(error) && error.message) {
//       setErrorMessage(error.message);
//     }
//   }, [error, isSuccess]);

//   return errorMessage;
// };

// import { useState, useEffect } from "react";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import {
//   isFetchBaseQueryError,
//   isErrorWithMessage,
// } from "@/services/helpers/checkErrorType";

// export const useCheckErrorType = (error: unknown) => {
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   useEffect(() => {
//     if (isFetchBaseQueryError(error)) {
//       const fetchError = error as FetchBaseQueryError;
//       if (
//         "data" in fetchError &&
//         typeof fetchError.data === "object" &&
//         fetchError.data
//       ) {
//         const message = (fetchError.data as any).message;
//         setErrorMessage(message || "Error occurred");
//       } else {
//         setErrorMessage("Wystąpił błąd");
//       }
//     } else if (isErrorWithMessage(error)) {
//       setErrorMessage(error.message);
//     } else {
//       setErrorMessage("Wystąpił błąd");
//     }
//   }, [error]);

//   return errorMessage;
// };
