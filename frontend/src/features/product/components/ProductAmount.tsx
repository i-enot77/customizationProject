import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useStorageCartUpdate } from "../../../hooks/useStorageCartUpdate";
import Button from "../../../components/Button";

interface AmountProps {
  amountProp: number;
  onAmountChange: (newAmount: number) => void;
}

const ProductAmount: React.FC<AmountProps> = ({
  amountProp,
  onAmountChange,
}) => {
  useStorageCartUpdate();

  const incrementAmount = () => {
    if (amountProp) {
      onAmountChange(amountProp + 1);
    }
  };

  const decrementAmount = () => {
    if (amountProp && amountProp > 1) {
      onAmountChange(amountProp - 1);
    }
  };

  const minusIconColor = amountProp === 1 ? "#808080" : "#000000";

  return (
    <div>
      <Button
        data-testid="minus_btn"
        className="px-4"
        onClick={decrementAmount}
        disabled={amountProp === 1}
      >
        <FontAwesomeIcon
          data-testid="img"
          icon={faMinus}
          style={{ color: minusIconColor }}
        />
      </Button>
      <span className="text-xl font-medium">{amountProp}</span>
      <Button data-testid="plus_btn" className="px-4" onClick={incrementAmount}>
        <FontAwesomeIcon icon={faPlus} style={{ color: "#000000" }} />
      </Button>
    </div>
  );
};

export default ProductAmount;
