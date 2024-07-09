import clsx from "clsx";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export interface ResponsiveImgProps {
  className?: string;
  small: string;
  medium: string;
  large: string;
}

const ResponsiveImg: React.FC<ResponsiveImgProps> = (props) => {
  return (
    // <div className={clsx(props.className)}>
    <LazyLoadImage
      wrapperClassName=" w-full h-auto"
      className="object-cover w-full h-full"
      srcSet={`${props.small} 640w, ${props.medium} 800w, ${props.large} 1024w`}
      sizes="(max-width: 566px) 100vw, ((min-width: 567px) and (max-width: 1179px)) 50vw, (min-width: 1180px) 33vw"
      src={props.medium}
      alt={"product"}
      effect="blur"
      width="100%"
      height="auto"
      // placeholderSrc="https://placehold.co/600x400"
    />
    // </div>
  );
};

export default ResponsiveImg;
