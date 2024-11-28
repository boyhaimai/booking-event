import React from "react";

import Header from "~/Layouts/Header/Header";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>{children}</div>
      <Header />
    </div>
  );
}

export default DefaultLayout;
