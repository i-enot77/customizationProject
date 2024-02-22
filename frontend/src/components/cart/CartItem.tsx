import { useEffect, useState } from "react";
import {
  CartState,
  calculateTotalPrice,
  deleteCartItem,
  updateCartItemAmount,
} from "../../services/productSlice";
import ProductAmount from "../products/ProductAmount";
import product_400w from "../../assets/img/productImg/productSmall_400w.png";
// import product_800w from "../../assets/img/productImg/productSmall_800.png";
import { useAppDispatch } from "../../services/hooks";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const CartItem = (props: CartState) => {
  const [selectedAmount, setSelectedAmount] = useState(props.amount);
  const [itemPriceTotal, setItemPriceTotal] = useState(
    selectedAmount * props.price
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setItemPriceTotal(selectedAmount * props.price);
    dispatch(updateCartItemAmount({ id: props.id, amount: selectedAmount }));
    dispatch(calculateTotalPrice());
  }, [selectedAmount]);

  const handleEdit = (id: string) => {
    //update cart item logic
    navigate("/product-description");
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCartItem(id));
    dispatch(calculateTotalPrice());
  };

  return (
    <div className="border-b border-b-black flex flex-col mx-8 mb-4">
      <Button
        onClick={() => handleDelete(props.id)}
        className="self-end py-2 flex items-center"
      >
        <span className="pr-1">Usuń</span>
        <FontAwesomeIcon
          icon={faXmark}
          size="xl"
          style={{ color: "#000000" }}
        />
      </Button>
      <div className="w-[50%] self-center">
        <img
          srcSet={`${product_400w} 400w, `}
          sizes="(max-width: 566px) 100vw, ((min-width: 567px) and (max-width: 1179px)) 400px, (min-width: 1180px) 400px"
          src={product_400w}
          alt="product"
          className="lazyload object-cover w-full"
        />
      </div>

      <div className="flex justify-between content-center text-2xl mt-10">
        <h2 className="font-medium">{props.name}</h2>
        <ProductAmount
          amountProp={selectedAmount}
          onAmountChange={setSelectedAmount}
        />
      </div>

      <div className="flex justify-between items-end py-4">
        <div>
          <div>will be shown product materials</div>
          <div>will be shown product materials</div>
        </div>
      </div>
      <div className="flex justify-between items-end pb-6">
        <Button
          onClick={() => handleEdit(props.id)}
          className="font-medium underline underline-offset-2"
        >
          Edytuj
        </Button>
        <div className="text-lg">{itemPriceTotal}</div>
      </div>
    </div>
  );
};

export default CartItem;
