import Footer from "../navigation/footer/Footer";
import Dimensions from "../products/Dimensions";
import ProductItem from "../products/ProductItem";

const ProductDescription = () => {
  const style = {
    wrapper: `w-full bg-white overflow-y-auto mx-auto px-8`,
  };
  return (
    <div className={style.wrapper}>
      <ProductItem>
        <Dimensions />
      </ProductItem>
      <Footer />
    </div>
  );
};

export default ProductDescription;
