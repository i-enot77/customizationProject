import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../common/Button";
import product_400w from "../../assets/img/productImg/productSmall_400w.png";
import product_800w from "../../assets/img/productImg/productSmall_800.png";
import product_1200w from "../../assets/img/productImg/productSmall_1200.png";
import ResponsiveImg from "../common/ResponsiveImg";
import ProductAmount from "./ProductAmount";
import { useAppDispatch } from "../../services/hooks";
import { addToCart } from "../../services/cartSlice";
import { useGetProductByIdQuery } from "../../services/productsApi";
import Dimensions from "./Dimensions";
import ProductItemSkeleton from "./ProductItemSkeleton";

const ProductItem = () => {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const dispatch = useAppDispatch();

  const { category, _id }: { category: string; _id: string } = useParams() as {
    category: string;
    _id: string;
  };

  console.log(category, _id);
  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductByIdQuery({ category, _id });

  useEffect(() => {
    refetch();
  }, [category, _id, refetch]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ productItem: product, amount: selectedAmount }));
    }
  };

  const style = {
    header: `text-lg font-medium uppercase mb-3`,
    btn: `px-6 py-3 rounded-md`,
  };
  return (
    <>
      {isLoading ? (
        <ProductItemSkeleton />
      ) : (
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
                  <Dimensions isCategory={category} item={product} />
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
      )}
    </>
  );
};

export default ProductItem;
