import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { useState, useRef } from "react";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    console.log(enteredAmountNumber);
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 10
    ) {
      setAmountIsValid(false);
      return;
    }
    setAmountIsValid(true);
    props.addToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Qty:"
        input={{
          id: "Qty:_" + props.id,
          min: 1,
          max: 10,
          type: "number",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Invalid quantity</p>}
    </form>
  );
};

export default MealItemForm;
