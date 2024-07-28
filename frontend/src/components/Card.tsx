import { LazyLoadImage } from "react-lazy-load-image-component";

interface CardProps {
  small: string;
  medium: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <LazyLoadImage
          wrapperClassName="absolute top-0 left-0 w-full h-full"
          className="object-cover w-full h-full"
          srcSet={`${props.small} 640w, ${props.medium} 800w`}
          sizes="(max-width: 566px) 100vw, ((min-width: 567px) and (max-width: 1179px)) 50vw, (min-width: 1180px) 33vw"
          src={props.medium}
          alt="product"
          effect="blur"
          placeholderSrc="https://placehold.co/640x360"
        />
      </div>

      <div className="px-2">
        <h3 className="py-3 text-lg font-medium">{props.title}</h3>
        <div className="pb-3">{props.description}</div>
      </div>
    </div>
  );
};

export default Card;
