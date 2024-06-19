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

    // <img alt="" loading="lazy" width="100" height="56" decoding="async" data-nimg="1" class="" sizes="(max-width: 1024px) 100vw, 25vw" srcset="https://p3.aprimocdn.net/boconcept/678e3d56-198d-4728-aa25-b09a00aa44f8/Ravello 3220 Sand_WEB-Global16%3a9-2500x1400.jpg?format=pjpg&amp;auto=webp&amp;fit=bounds&amp;width=175&amp;quality=75%2C60&amp;height=98 175w, https://p3.aprimocdn.net/boconcept/678e3d56-198d-4728-aa25-b09a00aa44f8/Ravello 3220 Sand_WEB-Global16%3a9-2500x1400.jpg?format=pjpg&amp;auto=webp&amp;fit=bounds&amp;width=375&amp;quality=75%2C60&amp;height=210 375w, https://p3.aprimocdn.net/boconcept/678e3d56-198d-4728-aa25-b09a00aa44f8/Ravello 3220 Sand_WEB-Global16%3a9-2500x1400.jpg?format=pjpg&amp;auto=webp&amp;fit=bounds&amp;width=768&amp;quality=75%2C60&amp;height=430 768w, https://p3.aprimocdn.net/boconcept/678e3d56-198d-4728-aa25-b09a00aa44f8/Ravello 3220 Sand_WEB-Global16%3a9-2500x1400.jpg?format=pjpg&amp;auto=webp&amp;fit=bounds&amp;width=1024&amp;quality=75%2C60&amp;height=573 1024w, https://p3.aprimocdn.net/boconcept/678e3d56-198d-4728-aa25-b09a00aa44f8/Ravello 3220 Sand_WEB-Global16%3a9-2500x1400.jpg?format=pjpg&amp;auto=webp&amp;fit=bounds&amp;width=1280&amp;quality=75%2C60&amp;height=716 1280w, https://p3.aprimocdn.net/boconcept/678e3d56-198d-4728-aa25-b09a00aa44f8/Ravello 3220 Sand_WEB-Global16%3a9-2500x1400.jpg?format=pjpg&amp;auto=webp&amp;fit=bounds&amp;width=1920&amp;quality=75%2C60&amp;height=1075 1920w, https://p3.aprimocdn.net/boconcept/678e3d56-198d-4728-aa25-b09a00aa44f8/Ravello 3220 Sand_WEB-Global16%3a9-2500x1400.jpg?format=pjpg&amp;auto=webp&amp;fit=bounds&amp;width=2048&amp;quality=75%2C60&amp;height=1146 2048w, https://p3.aprimocdn.net/boconcept/678e3d56-198d-4728-aa25-b09a00aa44f8/Ravello 3220 Sand_WEB-Global16%3a9-2500x1400.jpg?format=pjpg&amp;auto=webp&amp;fit=bounds&amp;width=3020&amp;quality=75%2C60&amp;height=1691 3020w" src="https://p3.aprimocdn.net/boconcept/678e3d56-198d-4728-aa25-b09a00aa44f8/Ravello%203220%20Sand_WEB-Global16%3a9-2500x1400.jpg?format=pjpg&amp;auto=webp&amp;fit=bounds&amp;width=3020&amp;quality=75%2C60&amp;height=1691" style="color: transparent;"></img>
  );
};

export default ResponsiveImg;
