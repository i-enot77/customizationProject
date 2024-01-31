import Button from "../common/Button";

interface ProductItem {
  id: string;
  name: string;
  price: number;
  description: string;
  modelPath: string; // Path to the 3D model file
  height: number;
  width: number;
  depth?: number;
}

const ProductItem: React.FC<ProductItem> = (props) => {
  return (
    <div>
      <div></div>
      <div>
        <div>
          <h2>{props.name}</h2>
          <p>{props.price} zł</p>
        </div>
        <div>
          <p>Opis</p>
          <p>{props.description}</p>
          <p>Wymiary</p>
          <div>
            <p>Wysokość</p>
            <p>{props.height} cm</p>
          </div>
          <div>
            <p>Szerokość</p>
            <p>{props.width} cm</p>
          </div>
          <div>
            <p>Głębokość</p>
            <p>{props.depth} cm</p>
          </div>
        </div>
        <div>
          <p>Ilość</p>
        </div>
        <div>
          <Button className="">Dodaj do koszyka</Button>
          <Button className="">Skonfiguruj</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
