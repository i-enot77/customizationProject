import { useEffect } from "react";
import { useAppDispatch } from "../services/hooks";
import { setPersist } from "../services/authenticationSlice";

export const usePersistLogin = (persist: boolean) => {
  const dispatch = useAppDispatch();

  const setPersistValue = () => dispatch(setPersist(!persist));

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return setPersistValue;
};
