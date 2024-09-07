import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import {
  CartState,
  calculateTotalPrice,
  deleteCartItem,
} from "../../../services/cartSlice";
import { RootState } from "../../../services/store";
import { useAppDispatch } from "../../../services/hooks";
import { useCartItem } from "../../../hooks/useCartItem";

import Button from "../../../components/Button";
import ProductAmount from "../../product/components/ProductAmount";

const CartItem = (props: CartState) => {
  const cartSummary = useSelector((state: RootState) => state.cart.cartSummary);
  const [selectedAmount, setSelectedAmount] = useState(props.quantity);

  const dispatch = useAppDispatch();

  const itemPriceTotal = useCartItem(
    selectedAmount,
    props.product.price,
    props.product._id
  );

  const handleDelete = (id: string) => {
    dispatch(deleteCartItem(id));
    dispatch(calculateTotalPrice());
  };

  return (
    <div className="border-b border-b-black flex flex-col mx-8 mb-4">
      {cartSummary ? (
        <div className="w-[50%] self-center">
          <img
            srcSet={`${props.product.img.small} 640w,`}
            sizes="(max-width: 566px) 20vw, ((min-width: 567px) and (max-width: 1179px)) 10vw, (min-width: 1180px) 400px"
            src={props.product.img.small}
            alt="product"
            className="lazyload object-cover w-full h-full"
          />
          <div className="flex justify-between content-center text-2xl mt-10">
            <h2 className="font-medium">{props.product.name}</h2>
            <span>Ilość: {selectedAmount}</span>
          </div>
          <div className="py-4">
            <div>Material: {props.baseMaterial.name}</div>
            {props.legsMaterial && <div>Noga: {props.legsMaterial.name}</div>}
          </div>
          <div className="text-lg">{itemPriceTotal}</div>
        </div>
      ) : (
        <>
          <Button
            onClick={() => handleDelete(props.product._id)}
            className="self-end py-2 flex items-center"
          >
            <span className="pr-1">Usuń</span>
            <FontAwesomeIcon
              icon={faXmark}
              size="lg"
              style={{ color: "#000000" }}
            />
          </Button>
          <div className="w-[50%] self-center">
            <img
              srcSet={`${props.product.img.small} 640w`}
              sizes="(max-width: 566px) 20vw, ((min-width: 567px) and (max-width: 1179px)) 10vw, (min-width: 1180px) 400px"
              src={props.product.img.small}
              alt="product"
              className="lazyload object-cover w-full h-full"
            />
          </div>

          <div className="flex justify-between content-center text-2xl mt-10">
            <h2 className="font-medium">{props.product.name}</h2>
            <ProductAmount
              amountProp={selectedAmount}
              onAmountChange={setSelectedAmount}
            />
          </div>

          <div className="py-4">
            <div>Material: {props.baseMaterial.name}</div>
            {props.legsMaterial && <div>Noga: {props.legsMaterial.name}</div>}
          </div>
          <div className="flex justify-between items-end pb-6">
            <div className="text-lg">{itemPriceTotal}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
