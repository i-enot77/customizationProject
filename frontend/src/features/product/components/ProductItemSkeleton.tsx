import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductItemSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-2 grid-rows-1 gap-6 justify-center content-stretch my-6">
      <Skeleton width={200} height={200} />
      <div className="mt-4">
        <div>
          <Skeleton height={40} width={200} />
          <div className="text-xl my-4">
            <Skeleton height={20} width={100} />
          </div>
        </div>
        <div>
          <div>
            <Skeleton count={3} />
          </div>
        </div>
        <div className="my-5">
          <h3 className="text-lg font-medium uppercase mb-3">
            <Skeleton height={20} width={150} />
          </h3>
          <div>
            <Skeleton count={3} />
          </div>
        </div>
        <div className="mb-10">
          <div className="text-lg font-medium uppercase mb-3">
            <Skeleton height={20} width={100} />
          </div>
          <div>
            <Skeleton count={2} />
          </div>
        </div>
        <div className="flex">
          <Skeleton containerClassName="flex-1" width={"80%"} height={40} />
          <Skeleton containerClassName="flex-1" width={"80%"} height={40} />
        </div>
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
