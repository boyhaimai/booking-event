import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
  className,
  to,
  href,
  onClick,
  warning,
  lightwarning,
  outline,
  white_outline,
  children,
  large,
  medium,
  small,
  lefticon,
  righticon,
  disabled,
  ...passprops
}) {
  let Comp = "button";
  const classes = cx(
    "wrapper", 
    className,
    {
      lightwarning,
      warning,
      outline,
      white_outline,
      large,
      medium,
      small,
      disabled,
    }
  );
  

  let props = {
    onClick,
    warning,
    lefticon,
    righticon,
    classes,
    ...passprops,
  };

  if(disabled) {
    Object.keys(props).forEach(key =>{
      if(key.startsWith('on') && typeof props[key] === 'function'){
        delete props[key]
      }
    })
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  return (
    <Comp className={classes} {...props}>
      {lefticon && <span className={cx("icon")}>{lefticon}</span>}
        <span className={cx('title')}> {children}</span>
      {righticon && <span className={cx("icon")}>{righticon}</span>}
    </Comp>
  );
}

export default Button;
