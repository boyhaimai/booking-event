import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./Popper.module.scss";

const cx = classNames.bind(styles);
function Wrapper({ children }) {
  return <div className={cx("wrapper")}>{children}</div>;
}

export default Wrapper;

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
