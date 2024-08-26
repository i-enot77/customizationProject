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
    <div className="w-full h-full flex flex-col flex-grow justify-between">
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

      <div className="flex justify-between text-xl py-4  pl-6 pr-12 font-medium">
        <div>Wartość koszyka</div>
        <div>{cartTotalPrice}</div>
      </div>
    </div>
  );
};

export default Cart;
