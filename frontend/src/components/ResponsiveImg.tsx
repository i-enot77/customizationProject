import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export interface ResponsiveImgProps {
  className?: string;
  small: string;
  medium: string;
  large: string;
}

const ResponsiveImg: React.FC<ResponsiveImgProps> = (props) => {
  const [paddingBottom, setPaddingBottom] = useState("56.25%"); // Default to 16:9 aspect ratio

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const aspectRatio = (img.naturalHeight / img.naturalWidth) * 100;
    setPaddingBottom(`${aspectRatio}%`);
  };

  return (
    <div className="relative w-full" style={{ paddingBottom }}>
      <LazyLoadImage
        wrapperClassName="absolute top-0 left-0 w-full h-full"
        className="object-cover w-full h-full"
        srcSet={`${props.small} 640w, ${props.medium} 800w, ${props.large} 1024w`}
        sizes="(max-width: 566px) 100vw, ((min-width: 567px) and (max-width: 1179px)) 50vw, (min-width: 1180px) 33vw"
        src={props.medium}
        alt="product"
        effect="blur"
        placeholderSrc="https://placehold.co/640x360"
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ResponsiveImg;
