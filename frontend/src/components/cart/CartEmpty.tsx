import cart from "../../assets/img/cartImg/cart.png";
import smallerCart from "../../assets/img/cartImg/cart-600_x_450.png";
import Footer from "../navigation/footer/Footer";

const CartEmpty = () => {
  return (
    <div className="w-[1312px] h-[93vh] px-4 mx-auto grid grid-cols-1 grid-rows-[minmax(400px,_1fr)_140px] gap-6 justify-center content-end">
      <section className="h-full flex flex-col justify-center items-center">
        <img
          srcSet={`${smallerCart} 600w, ${cart} 1200w,`}
          sizes="(max-width: 800px) 100vw, 800px"
          src={cart}
          alt="cart"
        />
        <h2 className="text-4xl font-medium">Twój koszyk jest pusty</h2>
      </section>
      <Footer />
    </div>
  );
};

export default CartEmpty;
