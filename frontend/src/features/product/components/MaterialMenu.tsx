import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Material } from "../../../services/materialSlice";
import Modal from "../../../components/Modal";
import InputItem from "../../../components/InputItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/store";
import { useGetAssignedMtlMutation } from "../../../services/materialApi";

interface MaterialMenuProps {
  modelPart: string;
  mtlName: string;
  assignedMtl?: string[];
  handleChange?: (item: string) => void;
}

const MaterialMenu = ({
  modelPart,
  mtlName,
  assignedMtl,
  handleChange,
}: MaterialMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [materialsArr, setMaterialsArr] = useState<Material[]>([]);

  const [materials] = useGetAssignedMtlMutation();
  // const productItem = useSelector(
  //   (state: RootState) => state.products.productItem
  // );

  const handleClick = (items: string[]) => {
    setIsOpen(true);
    materials(items)
      .unwrap()
      .then((response: Material[]) => {
        if (response) {
          setMaterialsArr(response);
        }
      });
  };

  // useEffect(() => {
  //   console.log(productItem);
  // }, [productItem]);

  return (
    <>
      <div>
        <div>
          <div>{modelPart}</div>
          <div>{mtlName}</div>
        </div>
        {assignedMtl && assignedMtl.length > 0 && (
          <Button onClick={() => handleClick(assignedMtl)}>Zmień</Button>
        )}
      </div>
      {isOpen && materialsArr && handleChange && (
        <Modal innerClass="" onClick={() => setIsOpen(false)} className="">
          <div>
            {materialsArr.map((item) => (
              <div key={item._id}>
                <InputItem
                  type="checkbox"
                  id={item._id}
                  value={item._id}
                  onChange={() => handleChange(item._id)}
                />
                <label htmlFor={item._id}>{item.name}</label>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default MaterialMenu;
