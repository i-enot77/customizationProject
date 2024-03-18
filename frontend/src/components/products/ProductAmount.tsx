import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button";

interface AmountProps {
  amountProp: number;
  onAmountChange: (newAmount: number) => void;
}

const ProductAmount: React.FC<AmountProps> = ({
  amountProp,
  onAmountChange,
}) => {
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
        className="px-4"
        onClick={decrementAmount}
        disabled={amountProp === 1}
      >
        <FontAwesomeIcon icon={faMinus} style={{ color: minusIconColor }} />
      </Button>
      <span className="text-xl font-medium">{amountProp}</span>
      <Button className="px-4" onClick={incrementAmount}>
        <FontAwesomeIcon icon={faPlus} style={{ color: "#000000" }} />
      </Button>
    </div>
  );
};

export default ProductAmount;
