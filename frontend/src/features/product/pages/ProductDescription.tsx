import ProductItem from "../components/ProductItem";

const ProductDescription = () => {
  const style = {
    wrapper: `w-full flex-grow bg-white overflow-y-auto mx-auto px-8 py-4 flex flex-col justify-center`,
  };
  return (
    <div className={style.wrapper}>
      <ProductItem />
    </div>
  );
};

export default ProductDescription;
