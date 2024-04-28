import { Material } from "../../services/materialSlice";

interface BaseMaterialProps {
  category: string;
  material: Material[];
  isChanging: boolean;
}

const MaterialMenu = ({
  category,
  material,
  isChanging,
}: BaseMaterialProps) => {
  return (
    <div>
      <div></div>
      <div></div>
    </div>
  );
};

export default MaterialMenu;
