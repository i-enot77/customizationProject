import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import product_400w from "../../assets/img/productImg/productSmall_400w.png";
import product_800w from "../../assets/img/productImg/productSmall_800.png";
import product_1200w from "../../assets/img/productImg/productSmall_1200.png";
import { useAppDispatch } from "../../services/hooks";
import { addToCart } from "../../services/cartSlice";
import { useGetProductByIdQuery } from "../../services/productsApi";
import { useStorageCartUpdate } from "../../hooks/useStorageCartUpdate";
import ProductItemSkeleton from "../../features/product/components/ProductItemSkeleton";
import ResponsiveImg from "../ResponsiveImg";
import Dimensions from "../../features/product/components/Dimensions";
import ProductAmount from "../../features/product/components/ProductAmount";
import Button from "../Button";

const ProductItem = () => {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const dispatch = useAppDispatch();

  const { category, _id }: { category: string; _id: string } = useParams() as {
    category: string;
    _id: string;
  };

  const {
    data: product,
    isLoading,
    //isSuccess - When true, indicates that the query has data from a successful request.
    refetch,
  } = useGetProductByIdQuery({ category, _id });

  useEffect(() => {
    refetch();
  }, [category, _id, refetch]);
  if (product) {
    console.log(product);
  }

  // useStorageCartUpdate();
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ productItem: product, amount: selectedAmount }));
    }
  };

  const checkCategory = (category: string) => {
    switch (category) {
      case "sofy":
      case "kresła":
        break;
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
                <Button
                  className={`${style.btn} bg-[#2A254B] text-white mr-4`}
                  onClick={handleAddToCart}
                >
                  Dodaj do koszyka
                </Button>
                <div className="">Wybierz swój projekt</div>
                <div></div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
