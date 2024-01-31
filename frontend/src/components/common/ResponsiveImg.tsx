import React from "react";

interface ResponsiveImgProps {
  mediaWrapper?: string;
  small: string;
  medium: string;
  large: string;
}

const ResponsiveImg: React.FC<ResponsiveImgProps> = ({
  mediaWrapper = "",
  small,
  medium,
  large,
}) => {
  return (
    <div className={mediaWrapper}>
      <picture className="">
        {/* Source for small screens (max-width: 598px) */}
        <source media="(max-width: 598px)" srcSet={small} />

        {/* Source for medium screens (599px to 1179px) */}
        <source
          media="(min-width: 599px) and (max-width: 1179px)"
          srcSet={medium}
        />

        {/* Source for large screens (min-width: 1180px) */}
        <source media="(min-width: 1180px)" srcSet={large} />

        {/* Default image for browsers that do not support the <picture> element */}
        <img
          className="lazyload object-cover w-full h-full"
          alt="img"
          src={large}
        />
      </picture>
    </div>
  );
};

export default ResponsiveImg;
