import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductSkeleton({ products }: { products: number }) {
  return Array(products)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="">
        <Skeleton width={"25rem"} height={"15rem"} />
        <Skeleton className="mt-3" width={"25rem"} height={"2rem"} />
      </div>
    ));
}

export default ProductSkeleton;
