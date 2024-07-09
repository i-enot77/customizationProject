import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductAmount from "./ProductAmount";
import Dimensions from "./Dimensions";
import ProductItemSkeleton from "./ProductItemSkeleton";
import { useAppDispatch } from "../../../services/hooks";
import {
  useGetProductByIdQuery,
  ProductById,
} from "../../../services/productsApi";
import { addToCart } from "../../../services/cartSlice";
import Button from "../../../components/Button";
import Scene from "../../model/components/Scene";
import MaterialMenu from "./MaterialMenu";
import { Material } from "../../../services/materialSlice";
import { checkCategory } from "../../../utils/checkCategory";

const ProductItem = () => {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const dispatch = useAppDispatch();
  const { category, _id }: { category: string; _id: string } = useParams() as {
    category: string;
    _id: string;
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const baseMtlParam = searchParams.get("base") as string;
  const legsMtlParam = searchParams.get("legs");

  const { data, isFetching, isSuccess, isError, refetch } =
    useGetProductByIdQuery({
      category,
      _id,
      baseMtl: baseMtlParam,
      legsMtl: legsMtlParam,
    });

  const [baseMtlTextures, setBaseMtlTextures] = useState<Material | null>(null);
  const [legsMtlTextures, setLegsMtlTextures] = useState<Material | null>(null);

  useEffect(() => {
    if (data) {
      const { baseMtl, legsMtl } = data;
      setBaseMtlTextures(baseMtl);
      if (legsMtl) setLegsMtlTextures(legsMtl);
    }
  }, [data]);

  const changeBaseMtl = (material: Material) => {
    setBaseMtlTextures(material);
    searchParams.set("base", material._id);
    if (legsMtlParam) {
      searchParams.set("legs", legsMtlParam);
    }
    setSearchParams(searchParams);
  };

  const changeLegsMtl = (material: Material) => {
    setLegsMtlTextures(material);
    searchParams.set("legs", material._id);
    searchParams.set("base", baseMtlParam);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    refetch();
  }, [category, _id, refetch]);

  const modelPart = checkCategory(data?.product?.category);

  const handleAddToCart = () => {
    if (data && baseMtlTextures) {
      dispatch(
        addToCart({
          productItem: data.product,
          baseMtl: baseMtlTextures.name,
          legsMtl: legsMtlTextures?.name,
          amount: selectedAmount,
        })
      );
    }
  };

  const style = {
    header: `text-lg font-medium uppercase mb-3`,
    btn: `w-full flex justify-center items-center py-3 rounded-md bg-[#2A254B] text-white `,
  };

  return (
    <>
      {isFetching && <ProductItemSkeleton />}
      {isSuccess && data && baseMtlTextures && (
        <div className="w-full grid grid-cols-[minmax(320px,_2fr)_minmax(320px,_1fr)] grid-rows-1 gap-6 justify-center content-stretch m3-6">
          <Scene
            baseMtlTextures={baseMtlTextures}
            legsMtlTextures={legsMtlTextures ?? null}
            glbUrl={data.product.modelPath}
          />

          <div className="mt-4 w-full px-8">
            <div>
              <h2 className="text-4xl">{data.product.name}</h2>
              <div className="text-xl my-4">{data.product.price} zł</div>
            </div>
            <div>
              <div>{data.product.description}</div>
            </div>
            <div className="my-5">
              <h3 className={style.header}>Wymiary:</h3>
              <Dimensions isCategory={category} item={data.product} />
            </div>

            <div className="">
              <h2 className={style.header}>Wybierz swój projekt:</h2>
              <MaterialMenu
                modelPart={modelPart}
                mtlName={baseMtlTextures.name}
                assignedMtl={data.product.assignedBaseMtl}
                isChecked={baseMtlTextures._id}
                handleChange={changeBaseMtl}
              />

              {legsMtlTextures && (
                <MaterialMenu
                  modelPart="Noga"
                  mtlName={legsMtlTextures?.name}
                  assignedMtl={data.product.assignedLegsMtl}
                  isChecked={legsMtlTextures._id}
                  handleChange={changeLegsMtl}
                />
              )}
            </div>

            <div className="">
              <div className="mb-10">
                <h2 className={style.header}>Ilość:</h2>
                <ProductAmount
                  amountProp={selectedAmount}
                  onAmountChange={setSelectedAmount}
                />
              </div>
              <Button className={style.btn} onClick={handleAddToCart}>
                Dodaj do koszyka
              </Button>
            </div>
          </div>
        </div>
      )}
      {isError && <div>Something went wrong...</div>}
    </>
  );
};

export default ProductItem;
