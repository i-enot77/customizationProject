import { useEffect, useLayoutEffect } from "react";
import { setCart } from "../../services/cartSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCartSummary, setShowCart } from "../../services/cartSlice";
import { useAppDispatch } from "../../services/hooks";
import { RootState } from "../../services/store";
import Cart from "./Cart";
import CartEmpty from "./CartEmpty";
import Button from "../common/Button";

const CartModal = () => {
  const showCart = useSelector((state: RootState) => state.cart.showCart);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const savedCart = localStorage.getItem("cart");
    console.log(savedCart);

    dispatch(setCart(savedCart ? JSON.parse(savedCart) : []));
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const handleClick = () => {
    dispatch(setCartSummary(true));
    dispatch(setShowCart(false));
    navigate("/cart-sum");
  };
  return (
    <>
      {showCart && (
        <div
          onClick={() => dispatch(setShowCart(false))}
          className="fixed z-100 inset-0  w-full h-screen bg-[#6e6e6eab] flex justify-end items-center "
        >
          <div
            className="bg-white w-[50%] h-full flex flex-col justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {cart.length ? (
              <>
                <Cart />
                <Button
                  className="mt-10 self-center bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white"
                  onClick={() => handleClick()}
                >
                  Dalej
                </Button>
              </>
            ) : (
              <CartEmpty />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
