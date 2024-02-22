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
      {/* <div className="w-full">
        <img
          srcSet={`${props.small} 400w, ${props.medium} 800w, ${props.large} 1200w`}
          sizes="(max-width: 566px) 100vw, ((min-width: 567px) and (max-width: 1179px)) 50vw, (min-width: 1180px) 33vw"
          src={props.medium}
          alt="product"
          className="lazyload object-cover w-full h-full"
        />
      </div> */}
      <div className="flex justify-around items-center py-4">
        <span>{props.productName}</span>
        <span>{props.productPrice}</span>
      </div>
    </>
  );
};

export default ThumbnailProduct;
