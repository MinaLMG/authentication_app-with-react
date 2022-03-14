import React, { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../store/auth-context";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isvalid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isvalid: state.value.includes("@") };
  }
  return { value: "", isvalid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isvalid: action.value.length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isvalid: state.value.length > 6 };
  }
  return { value: "", isvalid: false };
};
const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dipatchEmailState] = useReducer(emailReducer, {
    value: "",
    isvalid: undefined,
  });
  const [passwordState, dipatchPasswordState] = useReducer(passwordReducer, {
    value: "",
    isvalid: undefined,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailState.isvalid && passwordState.isvalid);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.value, passwordState.value]);

  const emailChangeHandler = (event) => {
    dipatchEmailState({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dipatchPasswordState({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dipatchEmailState({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dipatchEmailState({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  const ctx = useContext(AuthContext);
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!formIsValid}
            onClick={ctx.onLogIn}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
