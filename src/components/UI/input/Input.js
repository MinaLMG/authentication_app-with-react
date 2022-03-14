import React, { forwardRef, useImperativeHandle, useRef } from "react";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  function activate() {
    inputRef.current.focus();
  }
  useImperativeHandle(ref, () => {
    return { activate: activate };
  });
  return (
    <div className={props.className}>
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});
export default Input;
