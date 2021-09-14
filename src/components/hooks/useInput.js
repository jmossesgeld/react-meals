import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "change":
      return { ...state, value: action.value };
    case "validate":
      const isValid = action.validator(state.value);
      return { ...state, hasError: !isValid && state.isTouched, isValid: isValid };
    case "blur":
      return { ...state, isTouched: true };
    case "reset":
      return {
        value: "",
        isTouched: false,
        hasError: false,
        isValid: false,
      };
    default:
  }
  return reducer;
};

const useInput = (validationFn) => {
  const [input, dispatch] = useReducer(reducer, {
    value: "",
    isTouched: false,
    hasError: false,
    isValid: false,
  });

  const validate = () => {
    dispatch({ type: "validate", validator: validationFn });
  };

  const onChangeHandler = (e) => {
    dispatch({ type: "change", value: e.target.value });
    validate();
  };

  const onBlurHandler = () => {
    dispatch({ type: "blur" });
    validate();
  };

  const reset = () => {
    dispatch({ type: "reset" });
  };

  return {
    value: input.value,
    hasError: input.hasError,
    onChange: onChangeHandler,
    onBlur: onBlurHandler,
    isValid: input.isValid,
    reset: reset,
  };
};

export default useInput;
