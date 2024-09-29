import { useState } from "react";
import Button from "../../../components/Button";
import { Material } from "../../../services/materialSlice";
import Modal from "../../../components/Modal";
import { useGetAssignedMtlMutation } from "../../../services/materialApi";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { grey } from "@mui/material/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";

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
    inner: `bg-[#e2e2e2] w-[35%] h-screen flex flex-col px-10 overflow-y-auto`,
    border: `rounded-lg border-2 border-[#9a9a9a] mb-6`,
  };
  return (
    <>
      <div
        className={`w-full flex justify-between items-center flex-wrap md:w-[70%] lg:w-full p-3 ${style.border}`}
      >
        <div>
          <div className="font-semibold">{modelPart}</div>
          <div>{mtlName}</div>
        </div>
        {assignedMtl && assignedMtl.length > 0 && (
          <Button
            data-testid="modal_btn"
            onClick={() => handleClick(assignedMtl)}
          >
            <span className="font-semibold pr-2">Zmień</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
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
          <div className="flex justify-between items-center px-1 py-7 sticky top-0 bg-[#e2e2e2] z-10">
            <h2 className="text-3xl font-semibold ">Zmień material</h2>
            <Button data-testid="close" onClick={closeModal}>
              close
              {/* <FontAwesomeIcon icon={faXmark} size="2xl" /> */}
            </Button>
          </div>

          <FormGroup
            sx={{
              width: "max-content",
              flexWrap: "nowrap",
              paddingBottom: "1rem",
            }}
          >
            {materialsArr.map((item) => (
              <div
                key={item._id}
                className={`${style.border} bg-white last:mb-0`}
              >
                <div className="w-full ">
                  <img
                    srcSet={`${item.mtlThumbnail.small} 244w, ${item.mtlThumbnail.medium} 600w`}
                    sizes="(max-width: 768px) 50vw, (min-width: 769px) 20vw"
                    src={item.mtlThumbnail.small}
                    alt="material"
                    className="lazyload rounded-t-lg w-full object-cover"
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
