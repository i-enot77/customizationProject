import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { RootState } from "../../../services/store";
import { useStorageCartUpdate } from "@/hooks/useStorageCartUpdate";

const Cart = () => {
  const cartArr = useSelector((state: RootState) => state.cart.cart);
  useStorageCartUpdate();

  const cartTotalPrice = useSelector(
    (state: RootState) => state.cart.totalPrice
  );
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="bg-white  overflow-y-auto">
        {cartArr.map((item) => (
          <CartItem
            key={item.product._id}
            product={item.product}
            baseMaterial={item.baseMaterial}
            legsMaterial={item.legsMaterial}
            quantity={item.quantity}
          />
        ))}
      </div>

      <div className="flex text-xl py-4  pl-6 pr-12 font-medium">
        <div>Wartość koszyka</div>
        <div className="flex-grow text-end">{cartTotalPrice} zł</div>
      </div>
    </div>
  );
};

export default Cart;
