import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalIsValid = !isNotFiveChars(enteredPostal);

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postal: postalIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid
        ? true
        : false;

    if (!formIsValid) return;

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
    });
  };

  const nameControlClasses = `${classes.control} ${
    !formValidity.name ? classes.invalid : ""
  }`;
  const streetControlClasses = `${classes.control} ${
    !formValidity.street ? classes.invalid : ""
  }`;
  const postalControlClasses = `${classes.control} ${
    !formValidity.postal ? classes.invalid : ""
  }`;
  const cityControlClasses = `${classes.control} ${
    !formValidity.city ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" ref={nameInputRef} id="name" />
        {!formValidity.name && <p>Please enter valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" ref={streetInputRef} id="street" />
        {!formValidity.street && <p>Please enter valid street name</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" ref={postalInputRef} id="postal" />
        {!formValidity.postal && <p>Please enter valid postal code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" ref={cityInputRef} id="city" />
        {!formValidity.city && <p>Please enter valid city name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
