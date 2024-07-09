import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../services/store";
import {
  Sofa,
  Armchair,
  Chair,
  Table,
  Lamp,
  useGetItemsByCategoryQuery,
} from "../../../services/productsApi";
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
    isFetching,
    refetch,
  } = useGetItemsByCategoryQuery(category);

  useEffect(() => {
    refetch();
  }, [category, refetch]);

  useEffect(() => {
    console.log(productItem);
  }, [productItem]);

  const handleClick = (item: Sofa | Armchair | Chair | Table | Lamp) => {
    const url = `/${category}/${item._id}?base=${item.baseMaterial}${
      item.legsMaterial ? `&legs=${item.legsMaterial}` : ""
    }`;
    console.log(url);
    navigate(url);
  };

  const style = {
    product: ` w-full`,
    wrapper: `w-full grid grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 grid-flow-row auto-rows-fr  gap-14 justify-center content-stretch mb-6`,
  };

  return (
    <>
      <div className="flex-grow">
        <h2 className="text-4xl text-center uppercase my-8">{category}</h2>
        <div className={style.wrapper}>
          {isFetching ? (
            <ProductSkeleton products={6} />
          ) : (
            dataArr?.map((item) => (
              <div
                key={item._id}
                className="w-full  cursor-pointer"
                onClick={() => handleClick(item)}
              >
                <ThumbnailProduct
                  className={style.product}
                  small={item.img.small}
                  medium={item.img.medium}
                  large={item.img.large}
                  productName={item.name}
                  productPrice={item.price}
                />
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
