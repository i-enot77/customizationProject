import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import CartItem from "./CartItem";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../services/hooks";
import { setCartSummary, setShowCart } from "../../services/cartSlice";

const Cart = () => {
  const cartArr = useSelector((state: RootState) => state.cart.cart);
  const cartSummary = useSelector((state: RootState) => state.cart.cartSummary);
  const cartTotalPrice = useSelector(
    (state: RootState) => state.cart.totalPrice
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setCartSummary(true));
    dispatch(setShowCart(false));
    navigate("/cart-sum");
  };

  return (
    <div className="w-full">
      <div className="bg-white h-[72vh] overflow-y-auto">
        {cartArr.map((item, index) => (
          <CartItem
            key={index}
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
        <div className="mt-10 self-center">
          {!cartSummary && (
            <Button
              className="bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white"
              onClick={() => handleClick()}
            >
              Dalej
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
