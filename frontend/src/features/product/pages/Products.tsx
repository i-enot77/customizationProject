import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import product_400w from "../../../assets/img/productImg/productSmall_400w.png";
import product_800w from "../../../assets/img/productImg/productSmall_800.png";
import product_1200w from "../../../assets/img/productImg/productSmall_1200.png";
import { RootState } from "../../../services/store";
import { useGetItemsByCategoryQuery } from "../../../services/productsApi";
import ProductSkeleton from "../components/ProductSkeleton";
import ThumbnailProduct from "../components/ThumbnailProduct";
import Footer from "../../../components/Footer";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productItem = useSelector(
    (state: RootState) => state.products.productItem
  );

  const { category }: { category: string } = useParams() as {
    category: string;
  };

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
    product: `flex-auto w-[50%] pr-8`,
    wrapper: `w-full grid grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 grid-flow-row auto-rows-fr  gap-6 justify-center content-stretch`,
  };

  return (
    <div className="custom-container">
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
                // dispatch(setProductItem(item));
                console.log(item);
                navigate(
                  `/products/${category}/${item._id}/${item.baseMaterial._id}/${item.legsMaterial?._id}`
                ); // add to route baseMaterial._idId and legsMaterialId ids from item....
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
