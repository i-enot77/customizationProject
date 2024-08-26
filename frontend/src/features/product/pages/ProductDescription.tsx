import ProductItem from "../components/ProductItem";

const ProductDescription = () => {
  const style = {
    wrapper: `w-full flex-grow justify-self-end bg-white mx-auto px-8 py-4 `,
  };
  return (
    <div className={style.wrapper}>
      <ProductItem />
    </div>
  );
};

export default ProductDescription;
