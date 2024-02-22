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

// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
// import Button from "../common/Button";
// import { useSelector } from "react-redux";
// import { RootState } from "../../services/store";
// import { useAppDispatch } from "../../services/hooks";
// import {
//   productMinus,
//   productPlus,
//   updateCartItemAmount,
// } from "../../services/productSlice";

// interface AmountProps {
//   id?: string;
//   amountProp?: number;
//   amountChange?: (newAmount: number) => void;
// }

// const ProductAmount: React.FC<AmountProps> = ({
//   id,
//   amountProp,
//   amountChange,
// }) => {
//   const stateAmount = useSelector(
//     (state: RootState) => state.products.productAmount
//   );
//   const cartArr = useSelector((state: RootState) => state.products.cart);

//   // const [amount, setAmount] = useState(amountProp ? amountProp : stateAmount);
//   const dispatch = useAppDispatch();

//   // useEffect(() => {
//   //   console.log(cartArr);
//   // }, [amount]);

//   const incrementAmount = () => {
//     // if (id && amountProp && amountChange) {
//     //   setAmount((prev) => prev + 1);
//     //   amountChange(amount);
//     //   dispatch(updateCartItemAmount({ id, amount }));
//     // } else {
//     //   dispatch(productPlus());
//     //   setAmount((prev) => prev + 1);
//     // }
//   };
//   const decrementAmount = () => {
//     // if (id && amountProp && amountChange) {
//     //   setAmount((prev) => prev - 1);
//     //   amountChange(amount);
//     //   dispatch(updateCartItemAmount({ id, amount }));
//     // } else {
//     //   dispatch(productMinus());
//     //   setAmount((prev) => prev - 1);
//     // }
//   };
//   const minusIconColor = stateAmount === 1 ? "#808080" : "#000000";
//   return (
//     <div>
//       <Button
//         className="px-4"
//         onClick={decrementAmount}
//         disabled={stateAmount === 1}
//       >
//         <FontAwesomeIcon icon={faMinus} style={{ color: minusIconColor }} />
//       </Button>
//       <div className="text-xl font-medium">
//         {amountProp ? amountProp : stateAmount}
//       </div>
//       <Button className="px-4" onClick={incrementAmount}>
//         <FontAwesomeIcon icon={faPlus} style={{ color: "#000000" }} />
//       </Button>
//     </div>
//   );
// };

// export default ProductAmount;
