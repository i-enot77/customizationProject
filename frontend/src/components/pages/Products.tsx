import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetItemsByCategoryQuery } from "../../services/productsApi";

import product_400w from "../../assets/img/productImg/productSmall_400w.png";
import product_800w from "../../assets/img/productImg/productSmall_800.png";
import product_1200w from "../../assets/img/productImg/productSmall_1200.png";
import ThumbnailProduct from "../products/ThumbnailProduct";
import { setProductItem } from "../../services/productSlice";
import { RootState } from "../../services/store";
import Footer from "../navigation/footer/Footer";

import ProductSkeleton from "../products/ProductSkeleton";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productItem = useSelector(
    (state: RootState) => state.products.productItem
  );

  const { category }: { category: string } = useParams() as {
    category: string;
  };
  //do I need to use unknown and type guard here?
  const {
    data: dataArr,
    isLoading,
    refetch,
  } = useGetItemsByCategoryQuery(category);

  useEffect(() => {
    refetch();
  }, [category, refetch]);

  useEffect(() => {
    console.log(productItem);
  }, [productItem]);

  const style = {
    container: `w-full bg-white overflow-y-auto mx-auto px-8`,
    product: `flex-auto w-[50%] pr-8`,
    wrapper: `w-full grid grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 grid-flow-row auto-rows-fr  gap-6 justify-center content-stretch`,
  };

  return (
    <div className={style.container}>
      <h2 className="text-4xl text-center uppercase my-6">{category}</h2>

      <div className={style.wrapper}>
        {isLoading ? (
          <ProductSkeleton products={8} />
        ) : (
          dataArr?.map((item) => (
            <div
              key={item._id}
              className="w-full mb-6 cursor-pointer"
              onClick={() => {
                dispatch(setProductItem(item));
                navigate(`/products/${category}/${item._id}`); // Change route to include item._id
              }}
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
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
