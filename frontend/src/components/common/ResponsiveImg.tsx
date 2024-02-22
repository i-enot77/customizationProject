export interface ResponsiveImgProps {
  className?: string;
  small: string;
  medium: string;
  large: string;
}

const ResponsiveImg: React.FC<ResponsiveImgProps> = (props) => {
  return (
    <div className="w-full">
      <img
        srcSet={`${props.small} 400w, ${props.medium} 800w, ${props.large} 1200w`}
        sizes="(max-width: 566px) 100vw, ((min-width: 567px) and (max-width: 1179px)) 50vw, (min-width: 1180px) 33vw"
        src={props.medium}
        alt="product"
        className="lazyload object-cover w-full h-full"
      />
    </div>

    // <div className={clsx(props.className)}>
    //   <picture className="">
    //     <source media="(max-width: 598px)" srcSet={props.small} />

    //     <source
    //       media="(min-width: 599px) and (max-width: 1179px)"
    //       srcSet={props.medium}
    //     />

    //     <source media="(min-width: 1180px)" srcSet={props.large} />

    //     <img
    //       className="lazyload object-cover w-full h-full"
    //       alt="img"
    //       src={props.large}
    //     />
    //   </picture>
    // </div>
  );
};

export default ResponsiveImg;
