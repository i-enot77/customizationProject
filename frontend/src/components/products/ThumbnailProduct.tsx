import ResponsiveImg, { ResponsiveImgProps } from "../common/ResponsiveImg";

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
      <div className="flex justify-around items-center py-4">
        <span>{props.productName}</span>
        <span>{props.productPrice}</span>
      </div>
    </>
  );
};

export default ThumbnailProduct;
