import { useState } from "react";
import Button from "../../../components/Button";
import { Material } from "../../../services/materialSlice";
import Modal from "../../../components/Modal";
import { useGetAssignedMtlMutation } from "../../../services/materialApi";
import mtlSmall from "../../../assets/img/productImg/small.jpg";
import mtlMedium from "../../../assets/img/productImg/medium.jpg";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { grey } from "@mui/material/colors";

interface MaterialMenuProps {
  modelPart: string;
  mtlName: string;
  assignedMtl?: string[];
  isChecked?: string;
  handleChange?: (item: Material) => void;
}

const MaterialMenu = ({
  modelPart,
  mtlName,
  assignedMtl,
  isChecked,
  handleChange,
}: MaterialMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [materialsArr, setMaterialsArr] = useState<Material[] | null>(null);
  const [trigger] = useGetAssignedMtlMutation();

  const handleClick = (items: string[]) => {
    setIsOpen(true);
    const stringData = items.join(",");
    trigger({ materialIds: stringData })
      .unwrap()
      .then((response: Material[]) => {
        if (response) {
          setMaterialsArr(response);
        }
      });
  };

  const closeModal = () => setIsOpen(false);

  const style = {
    inner: `bg-[#d5d5d5] w-[35%] h-full flex flex-col p-10`,
  };

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
      {materialsArr && handleChange && (
        <Modal
          isOpen={isOpen}
          innerClass={`${isOpen ? "animate-slideIn" : "animate-slideOut"} ${
            style.inner
          }`}
          onClick={closeModal}
          className="fixed z-10 inset-0 w-full h-screen flex justify-end items-center"
        >
          <h2 className="text-3xl font-semibold pb-6">Zmień material</h2>
          <FormGroup
            sx={{
              width: "max-content",
            }}
          >
            {materialsArr.map((item) => (
              <div
                key={item._id}
                className="rounded-lg border-2 border-[#9a9a9a] mb-6 last:mb-0"
              >
                <div>
                  <img
                    srcSet={`${mtlSmall} 244w, ${mtlMedium} 600w`}
                    sizes="(max-width: 768px) 100vw, (min-width: 769px) 244px"
                    src={mtlSmall}
                    alt="material"
                    className="lazyload rounded-t-lg"
                  />
                </div>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={item._id}
                      value={item._id}
                      onChange={() => handleChange(item)}
                      checked={isChecked === item._id}
                      sx={{
                        "&.Mui-checked": {
                          color: grey[600],
                        },
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                      }}
                    />
                  }
                  label={item.name}
                  sx={{
                    ".MuiFormControlLabel-label": {
                      fontSize: "18px",
                      fontWeight: "semibold",
                    },
                    padding: ".5rem",
                    paddingLeft: "3rem",

                    // textAlign: "center",
                    // width: "100%",
                    // display: "inline-block",
                  }}
                />
              </div>
            ))}
          </FormGroup>
        </Modal>
      )}
    </>
  );
};

export default MaterialMenu;
