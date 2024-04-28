import cart from "../../../assets/img/cartImg/cart.png";
import smallerCart from "../../../assets/img/cartImg/cart-600_x_450.png";

const CartEmpty = () => {
  return (
    <div className="w-full px-6">
      <section className="flex flex-col justify-center items-center">
        <div className="">
          <img
            srcSet={`${smallerCart} 600w, ${cart} 1200w,`}
            sizes="(max-width: 800px) 100vw, 800px"
            src={cart}
            alt="cart"
          />
        </div>

        <h2 className="text-4xl font-medium">Twój koszyk jest pusty</h2>
      </section>
    </div>
  );
};

export default CartEmpty;
