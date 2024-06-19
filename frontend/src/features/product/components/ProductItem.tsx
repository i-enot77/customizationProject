import { Suspense, useEffect, useState, useTransition } from "react";
import { Params, useParams, useSearchParams } from "react-router-dom";
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
import { Material } from "../../../services/materialSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { checkCategory } from "../../../utils/checkCategory";

const ProductItem = () => {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const history = createBrowserHistory();
  const { category, _id, baseMaterial, legsMaterial } = useParams();

  if (!category || !_id || !baseMaterial) {
    return;
  }

  const { data, isLoading, isSuccess, isError, refetch } =
    useGetProductByIdQuery({
      category,
      _id,
      baseMaterial,
      legsMaterial,
    });
  const { product, baseMtl, legsMtl } = data || {};

  const [baseMtlTextures, setBaseMtlTextures] = useState<Material | null>(
    baseMtl || null
  );
  const [legsMtlTextures, setLegsMtlTextures] = useState<Material | null>(
    legsMtl || null
  );

  useEffect(() => {
    if (baseMtl) setBaseMtlTextures(baseMtl);
    if (legsMtl) setLegsMtlTextures(legsMtl);
  }, [baseMtl, legsMtl]);

  const changeBaseMtl = (material: Material) => {
    startTransition(() => {
      setBaseMtlTextures(material);
      console.log(material);
      history.replace(
        `/products/${category}/${_id}/${material._id}/${legsMaterial}`
      );
    });
  };

  // // https://reactrouter.com/en/main/hooks/use-search-params

  // let [searchParams, setSearchParams] = useSearchParams();

  // Object.values({});

  // const newParams = new URLSearchParams("");

  // // 1
  // newParams.set("material", "wood");

  // // 2
  // newParams.set("material", "glass");

  // // ?material=glass

  // history.replace(`/products?category=${category}&id=132213&`);

  // setSearchParams(newParams);

  const changeLegsMtl = (material: Material) => {
    startTransition(() => {
      setLegsMtlTextures(material);
      history.replace(
        `/products/${category}/${_id}/${baseMaterial}/${material._id}`
      );
    });
  };

  useEffect(() => {
    refetch();
    console.log(baseMaterial, legsMaterial);
  }, [category, _id, refetch]);

  const modelPart = checkCategory(product?.category);

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
      {isSuccess && product && baseMtlTextures && (
        <div className="w-full grid grid-cols-[minmax(320px,_2fr)_minmax(320px,_1fr)] grid-rows-1 gap-6 justify-center content-stretch my-6">
          <Scene
            baseMtlTextures={baseMtlTextures}
            legsMtlTextures={legsMtlTextures ?? null}
            glbUrl={product.modelPath}
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

            <div>
              <div className="">Wybierz swój projekt</div>
              <MaterialMenu
                modelPart={modelPart}
                mtlName={baseMtlTextures.name}
                assignedMtl={product.assignedBaseMtl}
                isChecked={baseMtlTextures._id}
                handleChange={changeBaseMtl}
              />

              {legsMtlTextures && (
                <MaterialMenu
                  modelPart="Noga"
                  mtlName={legsMtlTextures?.name}
                  assignedMtl={product.assignedLegsMtl}
                  isChecked={legsMtlTextures._id}
                  handleChange={changeLegsMtl}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
