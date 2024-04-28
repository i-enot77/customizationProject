import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { RootState } from "../../../services/store";

const Cart = () => {
  const cartArr = useSelector((state: RootState) => state.cart.cart);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cartArr));
  // }, [cartArr]);

  const cartTotalPrice = useSelector(
    (state: RootState) => state.cart.totalPrice
  );
  return (
    <div className="w-full">
      <div className="bg-white h-[72vh] overflow-y-auto">
        {cartArr.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            category={item.category}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between text-xl pt-4  pl-6 pr-12 ">
          <div>Wartość koszyka</div>
          <div>{cartTotalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
