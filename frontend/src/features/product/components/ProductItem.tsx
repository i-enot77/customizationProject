import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductAmount from "./ProductAmount";
import Dimensions from "./Dimensions";
import ProductItemSkeleton from "./ProductItemSkeleton";
// import { useStorageCartUpdate } from "../../hooks/useStorageCartUpdate";
import { useAppDispatch } from "../../../services/hooks";
import { useGetProductByIdQuery } from "../../../services/productsApi";
import { addToCart } from "../../../services/cartSlice";
import Button from "../../../components/Button";
import Scene from "../../model/components/Scene";
import { Material } from "../../../services/materialSlice";

const ProductItem = () => {
  const [selectedAmount, setSelectedAmount] = useState(1);
  // const [baseMaterial, setBaseMaterial] = useState<Material>();
  // const [legsMaterial, setLegsMaterial] = useState<Material>();
  const dispatch = useAppDispatch();

  const {
    category,
    _id,
    baseMaterial, //id's only
    legsMaterial,
  }: {
    category: string;
    _id: string;
    baseMaterial: string;
    legsMaterial: string;
  } = useParams() as {
    category: string;
    _id: string;
    baseMaterial: string;
    legsMaterial: string;
  };

  const {
    data: product,
    isLoading,
    isSuccess,
    refetch,
  } = useGetProductByIdQuery({
    category,
    _id,
    baseMaterial,
    legsMaterial,
  });

  useEffect(() => {
    refetch();
  }, [category, _id, refetch]);
  if (product) {
    console.log(product);
  }

  // if (isSuccess)
  //   return () => {
  //     setBaseMaterial(product.baseMaterial);
  //     if (product.legsMaterial) {
  //       setLegsMaterial(product.legsMaterial);
  //     }
  //   };

  // useStorageCartUpdate();

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
        <div className="w-full grid grid-cols-[minmax(320px,_2fr)_minmax(320px,_1fr)] grid-rows-1 gap-6 justify-center content-stretch my-6">
          {product && (
            <>
              <Scene
                baseMaterial={product.baseMaterial}
                legsMaterial={product.legsMaterial}
              />
              <div className="mt-4 w-full">
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
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProductItem;
