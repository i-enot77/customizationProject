import product_400w from "../../assets/img/productImg/productSmall_400w.png";
import product_800w from "../../assets/img/productImg/productSmall_800.png";
import product_1200w from "../../assets/img/productImg/productSmall_1200.png";
import {
  Sofa,
  Lamp,
  Armchair,
  Chair,
  Table,
  useGetItemsByCategoryQuery,
} from "../../services/productsApi";

import ThumbnailProduct from "../products/ThumbnailProduct";
import { useDispatch, useSelector } from "react-redux";
import { setProductItem } from "../../services/productSlice";
import { RootState } from "../../services/store";
import Footer from "../navigation/footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isCategory = searchParams.get("category"); // Get category from query parameter
  const product = useSelector((state: RootState) => state.products.productItem);

  const {
    data: dataArr,
    isLoading,
    refetch,
  } = useGetItemsByCategoryQuery(isCategory || ""); // Pass isCategory as the category query parameter

  useEffect(() => {
    refetch();
  }, [isCategory, refetch]);

  const handleClick = (item: Sofa | Lamp | Armchair | Chair | Table | null) => {
    dispatch(setProductItem(item));
    navigate("/product-description");
    console.log(product);
  };

  const style = {
    container: `w-full bg-white overflow-y-auto mx-auto px-8`,
    product: `flex-auto w-[50%] pr-8`,
    wrapper: `w-full grid grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 grid-flow-row auto-rows-fr  gap-6 justify-center content-stretch`,
  };

  return (
    <div className={style.container}>
      <h2 className="text-4xl text-center uppercase my-6">{isCategory}</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={style.wrapper}>
          {dataArr &&
            dataArr.map((item) => (
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
