import ResponsiveImg, {
  ResponsiveImgProps,
} from "../../../components/ResponsiveImg";

interface ProductProps extends ResponsiveImgProps {
  productName: string;
  productPrice: number;
}

const ThumbnailProduct: React.FC<ProductProps> = (props) => {
  return (
    <>
      <ResponsiveImg
        className={props.className}
        small={props.small}
        medium={props.medium}
        large={props.large}
      />
      <div className="flex justify-around items-center py-1 text-lg font-medium">
        <span>{props.productName}</span>
        <span>{props.productPrice} zł</span>
      </div>
    </>
  );
};

export default ThumbnailProduct;
