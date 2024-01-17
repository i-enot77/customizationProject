import "lazysizes";

const ResponsiveImg = ({ mediaWrapper, small, medium, large }) => {
  return (
    <div className={`flex-initial w-[59%] ${mediaWrapper}`}>
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

// import React from 'react';

// const ResponsiveImage = () => {
//   return (
//     <picture className="nav-module__image img-fade-in">
//       {/* Source for small screens (max-width: 598px) */}
//       <source media="(max-width: 598px)" srcSet="https://p3.aprimocdn.net/boconcept/4c36b5b9-8c40-43d0-882a-b08c00a6eb1e/IDS23%20019_WEB-FeatureLeftOrRightAlign-M-500x410.jpg" />

//       {/* Source for medium screens (599px to 1179px) */}
//       <source media="(min-width: 599px) and (max-width: 1179px)" srcSet="URL_FOR_MEDIUM_SCREEN_IMAGE" />

//       {/* Source for large screens (min-width: 1180px) */}
//       <source media="(min-width: 1180px)" srcSet="https://p3.aprimocdn.net/boconcept/4c36b5b9-8c40-43d0-882a-b08c00a6eb1e/IDS23%20019_WEB-FeatureLeftOrRightAlign-D-1300x1100.jpg" />

//       {/* Default image for browsers that do not support the <picture> element */}
//       <img
//         className="ls-is-cached lazyloaded"
//         alt="The designer Henrik Pedersen"
//         src="https://p3.aprimocdn.net/boconcept/4c36b5b9-8c40-43d0-882a-b08c00a6eb1e/IDS23%20019_WEB-FeatureLeftOrRightAlign-D-1300x1100.jpg"
//       />
//     </picture>
//   );
// };

// export default ResponsiveImage;
