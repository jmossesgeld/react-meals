import classes from "./Checkout.module.css";
import useInput from "../hooks/useInput";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);

  const {
    value: enteredName,
    hasError: nameHasError,
    onChange: nameOnChange,
    onBlur: nameOnBlur,
    isValid: nameIsValid,
    reset: nameReset,
  } = useInput((value) => value.trim().length > 5);

  const {
    value: enteredStreet,
    hasError: streetHasError,
    onChange: streetOnChange,
    onBlur: streetOnBlur,
    isValid: streetIsValid,
    reset: streetReset,
  } = useInput((value) => value.trim().length > 5);

  const {
    value: enteredPostalCode,
    hasError: postalCodeHasError,
    onChange: postalCodeOnChange,
    onBlur: postalCodeOnBlur,
    isValid: postalCodeIsValid,
    reset: postalCodeReset,
  } = useInput((value) => value.trim().length > 5);

  const {
    value: enteredCity,
    hasError: cityHasError,
    onChange: cityOnChange,
    onBlur: cityOnBlur,
    isValid: cityIsValid,
    reset: cityReset,
  } = useInput((value) => value.trim().length > 5);

  async function submitOrder(order) {
    const response = await fetch("https://project-041196-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  const formIsValid = nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const order = {
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
      meals: { items: cartCtx.items, totalAmount: cartCtx.totalAmount },
    };

    submitOrder(order);
    props.onCancel();
    props.onClose();
    nameReset();
    streetReset();
    postalCodeReset();
    cityReset();
    cartCtx.resetCart()

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${nameHasError && classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameOnChange}
          onBlur={nameOnBlur}
        />
      </div>
      <div className={`${classes.control} ${streetHasError && classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetOnChange}
          onBlur={streetOnBlur}
        />
      </div>
      <div className={`${classes.control} ${postalCodeHasError && classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostalCode}
          onChange={postalCodeOnChange}
          onBlur={postalCodeOnBlur}
        />
      </div>
      <div className={`${classes.control} ${cityHasError && classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityOnChange}
          onBlur={cityOnBlur}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
