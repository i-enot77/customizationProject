import { useEffect, useState } from "react";
import { useAppDispatch } from "../services/hooks";
import {
  calculateTotalPrice,
  updateCartItemQuantity,
} from "../services/cartSlice";

export const useCartItem = (
  selectedAmount: number,
  price: number,
  id: string
) => {
  const [itemPriceTotal, setItemPriceTotal] = useState(selectedAmount * price);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setItemPriceTotal(selectedAmount * price);
    dispatch(updateCartItemQuantity({ id: id, quantity: selectedAmount }));
    dispatch(calculateTotalPrice());
  }, [selectedAmount]);
  return itemPriceTotal;
};
