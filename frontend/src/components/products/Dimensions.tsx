import { useSelector } from "react-redux";
import { Armchair, Chair, Lamp, Sofa, Table } from "../../services/productsApi";
import { RootState } from "../../services/store";

const Dimensions = () => {
  const isCategory = useSelector((state: RootState) => state.products.category);
  const item = useSelector((state: RootState) => state.products.productItem);

  function isType<T>(item: unknown): item is T {
    return typeof item === "object" && item !== null;
  }

  const style = {
    dmItem: `w-full grid grid-cols-2 grid-flow-row auto-rows-max gap-x-8 gap-y-1.5`,
  };

  let dimensionFor;
  switch (isCategory) {
    case "sofy":
      if (isType<Sofa>(item)) {
        dimensionFor = (
          <>
            <div>Wysokość: {item.dimensions.height} cm</div>
            <div>Szerokość: {item.dimensions.width} cm</div>
            <div>Głębokość: {item.dimensions.depth} cm</div>
            <div>Wysokość siedzenia: {item.dimensions.seatHeight} cm</div>
            <div>
              Wysokość podłokietnika: {item.dimensions.armsrestHeight} cm
            </div>
            <div>Waga: {item.dimensions.weight} kg</div>
            <div>Siedzenia: {item.dimensions.seats}</div>
          </>
        );
      }
      break;
    case "fotele":
      if (isType<Armchair>(item)) {
        dimensionFor = (
          <>
            <div>Wysokość: {item.dimensions.height} cm</div>
            <div>Szerokość: {item.dimensions.width} cm</div>
            <div>Głębokość: {item.dimensions.depth} cm</div>
            <div>Wysokość siedzenia: {item.dimensions.seatHeight} cm</div>
            <div>
              Wysokość podłokietnika: {item.dimensions.armsrestHeight} cm
            </div>
            <div>Waga: {item.dimensions.weight} kg</div>
          </>
        );
      }
      break;
    case "krzesła":
      if (isType<Chair>(item)) {
        dimensionFor = (
          <>
            <div>Wysokość: {item.dimensions.height} cm</div>
            <div>Szerokość: {item.dimensions.width} cm</div>
            <div>Głębokość: {item.dimensions.depth} cm</div>
            <div>Wysokość siedzenia: {item.dimensions.seatHeight} cm</div>
            <div>
              Wysokość podłokietnika: {item.dimensions.armsrestHeight} cm
            </div>
          </>
        );
      }
      break;
    case "stoły":
      if (isType<Table>(item)) {
        dimensionFor = (
          <>
            <div>Wysokość: {item.dimensions.height} cm</div>
            <div>Szerokość: {item.dimensions.width} cm</div>
            <div>Długość: {item.dimensions.length} cm</div>
            <div>Wysokość do blatu: {item.dimensions.legHeight} cm</div>
            <div>Grubość blatu: {item.dimensions.countertopThickness} cm</div>
            <div>Siedzenia: {item.dimensions.seats}</div>
            <div>Waga: {item.dimensions.weight} kg</div>
          </>
        );
      }
      break;
    case "lampy":
      if (isType<Lamp>(item)) {
        dimensionFor = (
          <>
            <div>Wysokość: {item.dimensions.height} cm</div>
            <div>Średnica: {item.dimensions.diameter} cm</div>
            <div>Długość przewodu: {item.dimensions.cableLength} cm</div>
            <div>Waga: {item.dimensions.weight} kg</div>
          </>
        );
      }
      break;

    default:
      break;
  }
  return <div className={style.dmItem}>{dimensionFor}</div>;
};

export default Dimensions;
