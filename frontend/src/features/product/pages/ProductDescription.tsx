import Footer from "../../../components/Footer";
import ProductItem from "../components/ProductItem";

const ProductDescription = () => {
  const style = {
    wrapper: `w-full bg-white overflow-y-auto mx-auto px-8`,
  };
  return (
    <div className={style.wrapper}>
      <ProductItem />
      <Footer />
    </div>
  );
};

export default ProductDescription;
