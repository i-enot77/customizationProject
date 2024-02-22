import product_400w from "../../assets/img/productImg/productSmall_400w.png";
import product_800w from "../../assets/img/productImg/productSmall_800.png";
import product_1200w from "../../assets/img/productImg/productSmall_1200.png";
import { Sofa, Lamp, Armchair, Chair, Table } from "../../services/productsApi";

import {
  useGetSofaItemsMutation,
  useGetArmchairItemsMutation,
  useGetChairItemsMutation,
  useGetTableItemsMutation,
  useGetLampItemsMutation,
} from "../../services/productsApi";
import ThumbnailProduct from "../products/ThumbnailProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  setArmchairArr,
  setChairArr,
  setLampArr,
  setProductItem,
  setSofaArr,
  setTableArr,
} from "../../services/productSlice";
import { useEffect, useState } from "react";
import { RootState } from "../../services/store";
import Footer from "../navigation/footer/Footer";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [dataArr, setDataArr] = useState<
    Sofa[] | Lamp[] | Armchair[] | Chair[] | Table[] | null
  >(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCategory = useSelector((state: RootState) => state.products.category);
  const pr = useSelector((state: RootState) => state.products.productItem);

  const handleClick = (item: Sofa | Lamp | Armchair | Chair | Table | null) => {
    dispatch(setProductItem(item));
    navigate("/product-description");
    console.log(pr);
  };

  const [sofa] = useGetSofaItemsMutation();
  const [armchair] = useGetArmchairItemsMutation();
  const [chair] = useGetChairItemsMutation();
  const [table] = useGetTableItemsMutation();
  const [lamp] = useGetLampItemsMutation();

  useEffect(() => {
    if (isCategory) {
      switch (isCategory) {
        case "sofy":
          sofa()
            .unwrap()
            .then((response) => {
              if (response) {
                dispatch(setSofaArr(response));
                setDataArr(response);
              }
            });
          break;
        case "fotele":
          armchair()
            .unwrap()
            .then((response) => {
              if (response) {
                dispatch(setArmchairArr(response));
                setDataArr(response);
              }
            });
          break;
        case "krzesła":
          chair()
            .unwrap()
            .then((response) => {
              if (response) {
                dispatch(setChairArr(response));
                setDataArr(response);
              }
            });
          break;
        case "stoły":
          table()
            .unwrap()
            .then((response) => {
              if (response) {
                dispatch(setTableArr(response));
                setDataArr(response);
              }
            });
          break;
        case "lampy":
          lamp()
            .unwrap()
            .then((response) => {
              if (response) {
                dispatch(setLampArr(response));
                setDataArr(response);
              }
            });
          break;
        default:
          setDataArr(null);
          break;
      }
    }
  }, [isCategory]);

  const style = {
    wrapper: `w-full bg-white overflow-y-auto mx-auto px-8`,
    product: `flex-auto w-[50%] pr-8`,
  };

  return (
    <div className={style.wrapper}>
      <h2 className="text-4xl text-center uppercase my-6">{isCategory}</h2>
      {dataArr && (
        <div className="w-full grid grid-cols-2 grid-rows-1 gap-6 justify-center content-stretch">
          {dataArr.map((item) => (
            <div
              key={item._id}
              className="w-full mb-6 cursor-pointer"
              onClick={() => handleClick(item)}
            >
              <ThumbnailProduct
                className={style.product}
                small={product_400w}
                medium={product_800w}
                large={product_1200w}
                productName={item.name}
                productPrice={item.price}
              />
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Products;
