import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import CartItem from "./CartItem";
import Button from "../common/Button";

const Cart = () => {
  const cartArr = useSelector((state: RootState) => state.products.cart);
  const cartTotalPrice = useSelector(
    (state: RootState) => state.products.totalPrice
  );

  return (
    <div className="w-full">
      <div className="bg-white h-[72vh] overflow-y-auto">
        {cartArr.map((item, index) => (
          <CartItem
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between text-xl pt-4  pl-6 pr-12 ">
          <div>Wartość koszyka</div>
          <div>{cartTotalPrice}</div>
        </div>
        <Button className="self-center bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white">
          Dalej
        </Button>
      </div>
    </div>
  );
};

export default Cart;
