import { useState } from "react";
import product_400w from "../../../assets/img/productImg/productSmall_400w.png";
// import product_800w from "../../assets/img/productImg/productSmall_800.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CartState,
  calculateTotalPrice,
  deleteCartItem,
} from "../../../services/cartSlice";
import { RootState } from "../../../services/store";
import { useAppDispatch } from "../../../services/hooks";
import { useCartItem } from "../../../hooks/useCartItem";
import { useStorageCartUpdate } from "../../../hooks/useStorageCartUpdate";
import Button from "../../../components/Button";
import ProductAmount from "../../product/components/ProductAmount";

const CartItem = (props: CartState) => {
  const cartSummary = useSelector((state: RootState) => state.cart.cartSummary);
  const [selectedAmount, setSelectedAmount] = useState(props.quantity);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const itemPriceTotal = useCartItem(selectedAmount, props.price, props.id);
  useStorageCartUpdate();

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
      {cartSummary ? (
        <div>
          <img
            srcSet={`${product_400w} 400w, `}
            sizes="(max-width: 566px) 100vw, ((min-width: 567px) and (max-width: 1179px)) 400px, (min-width: 1180px) 400px"
            src={product_400w}
            alt="product"
            className="lazyload object-cover w-full"
          />
          <div className="flex justify-between content-center text-2xl mt-10">
            <h2 className="font-medium">{props.name}</h2>
            <span>Ilość: {selectedAmount}</span>
          </div>
          <div className="flex justify-between items-end py-4">
            <div>
              <div>will be shown product materials</div>
              <div>will be shown product materials</div>
            </div>
          </div>
          <div className="text-lg">{itemPriceTotal}</div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default CartItem;
