import { useContext } from "react";
import CartContext from "../../../Store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const Mealitem = (props) => {
  const cartCtx = useContext(CartContext);
  const addToCartHandler = function (amount) {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal} key={props.id}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}> {`${props.price.toFixed(2)}₹`}</div>
      </div>
      <div>
        <MealItemForm id={props.id} addToCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default Mealitem;
