import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import Button from "../common/Button";
import product_400w from "../../assets/img/productImg/productSmall_400w.png";
import product_800w from "../../assets/img/productImg/productSmall_800.png";
import product_1200w from "../../assets/img/productImg/productSmall_1200.png";
import ResponsiveImg from "../common/ResponsiveImg";
import ProductAmount from "./ProductAmount";
import { useAppDispatch } from "../../services/hooks";
import { addToCart } from "../../services/productSlice";

interface ProductItem {
  children: React.ReactNode;
}

const ProductItem: React.FC<ProductItem> = ({ children }) => {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const product = useSelector((state: RootState) => state.products.productItem);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(selectedAmount));
  };

  const style = {
    header: `text-lg font-medium uppercase mb-3`,
    btn: `px-6 py-3 rounded-md`,
  };
  return (
    <div className="w-full grid grid-cols-2 grid-rows-1 gap-6 justify-center content-stretch my-6">
      <ResponsiveImg
        className=""
        small={product_400w}
        medium={product_800w}
        large={product_1200w}
      />
      <div className="mt-4">
        {product && (
          <>
            <div>
              <h2 className="text-4xl">{product.name}</h2>
              <div className="text-xl my-4">{product.price} zł</div>
            </div>
            <div>
              <div>{product.description}</div>
            </div>
            <div className="my-5">
              <h3 className={style.header}>Wymiary:</h3>
              {children}
            </div>
            <div className="mb-10">
              <div className={style.header}>Ilość:</div>
              <ProductAmount
                amountProp={selectedAmount}
                onAmountChange={setSelectedAmount}
              />
            </div>
            <div>
              <Button
                className={`${style.btn} bg-[#2A254B] text-white mr-4`}
                onClick={handleAddToCart}
              >
                Dodaj do koszyka
              </Button>
              <Button className={`${style.btn} border border-slate-400`}>
                Skonfiguruj
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
