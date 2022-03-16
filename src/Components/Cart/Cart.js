import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../Store/cart-context";
import Checkout from "./Checkout";
import { useState } from "react";
const Cart = (props) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const Cart = useContext(CartContext);
  const totalAmount = `${Cart.totalAmount.toFixed(2)}₹`;
  const hasItem = Cart.items.length > 0;
  const cartItemAddHandler = (item) => {
    Cart.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    Cart.removeItem(id);
  };
  const Cartitems = (
    <ul className={classes["cart-items"]}>
      {Cart.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const orderHandler = function (e) {
    setIsChecking(true);
    console.log("Ordering...");
    // props.onHideCart();
  };

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://fooddelivery-665ca-default-rtdb.asia-southeast1.firebasedatabase.app/order.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: Cart.items }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    Cart.clearCart();
  };

  const cartModalContent = (
    <React.Fragment>
      {Cartitems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isChecking ? (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />
      ) : (
        ""
      )}
      {!isChecking && modalAction}
    </React.Fragment>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmittingContent = (
    <React.Fragment>
      <p>Sucessfully submitted your order...</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClick={props.onHideCart}>
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmittingContent}
      {!isSubmitting && !didSubmit && cartModalContent}
    </Modal>
  );
};
export default Cart;
