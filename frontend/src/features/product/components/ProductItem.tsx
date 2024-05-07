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
import MaterialMenu from "./MaterialMenu";
import { createBrowserHistory } from "history";

const ProductItem = () => {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const dispatch = useAppDispatch();
  const history = createBrowserHistory();

  const {
    category,
    _id,
    baseMaterial,
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

  const [baseMtlID, setBaseMtlID] = useState(baseMaterial);
  const [legsMtlID, setLegsMtlID] = useState(legsMaterial);

  const changeBaseMtlID = (materialID: string) => {
    setBaseMtlID(materialID);
    console.log(materialID);
    history.replace(
      `/products/${category}/${_id}/${materialID}/${legsMaterial}`
    );
  };

  const changeLegsMtlID = (materialID: string) => {
    setLegsMtlID(materialID);
    history.replace(
      `/products/${category}/${_id}/${baseMaterial}/${materialID}`
    );
  };

  const { data, isLoading, isSuccess, refetch } = useGetProductByIdQuery({
    category,
    _id,
    baseMaterial: baseMtlID,
    legsMaterial: legsMtlID,
  });

  const { product, baseMtl, legsMtl } = data || {};

  useEffect(() => {
    refetch();
    console.log(baseMaterial, legsMaterial);
  }, [category, _id, baseMtlID, legsMtlID, refetch]);

  if (product) {
    console.log(product);
  }

  const checkCategory = () => {
    let modelPart = "";
    switch (product?.category) {
      case "sofy":
      case "fotele":
        return (modelPart = "Tapicerka");
      case "krzesła":
        return (modelPart = "Siedzenie");
      case "stoły":
        return (modelPart = "Blat");
      case "lampy":
        return (modelPart = "Lampa");
      default:
        return (modelPart = "");
    }
  };
  const modelPart = checkCategory();

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
      {isLoading && <ProductItemSkeleton />}
      {isSuccess && product && baseMtl ? (
        <div className="w-full grid grid-cols-[minmax(320px,_2fr)_minmax(320px,_1fr)] grid-rows-1 gap-6 justify-center content-stretch my-6">
          <Scene baseMaterial={baseMtl} legsMaterial={legsMtl} />
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

            <div>
              <div className="">Wybierz swój projekt</div>
              <MaterialMenu
                modelPart={modelPart}
                mtlName={baseMtl.name}
                assignedMtl={product.assignedBaseMtl}
                handleChange={changeBaseMtlID}
              />

              {legsMtl && (
                <MaterialMenu
                  modelPart="Noga"
                  mtlName={legsMtl?.name}
                  assignedMtl={product.assignedLegsMtl}
                  handleChange={changeLegsMtlID}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ProductItem;
