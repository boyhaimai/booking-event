import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClose,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";

import styles from "./register.module.scss";
import { AppleIcon, GgIcon, HidePass, ShowPass } from "~/Components/Icons";
import Button from "~/Components/Buttons/Button";
import Image from "~/Components/Images/Image";
import Success from "~/assets/images/regisSuccess.png";
import * as registerUser from "~/service/setAccountService";

const cx = classNames.bind(styles);

function Register() {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const hasSpace = password.includes(" ");
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !hasSpace && pattern.test(email)) {
      e.preventDefault();
      handleRegister();
    }
  };

  const handleRegister = async () => {
    if (disable) {
      alert("Vui lòng điền đầy đủ thoogn tin. ");
      return;
    }

    const data = await registerUser.registerUser(0, userName, email, password, [
      {
        isProduct: null,
        remainProduct: null,
      },
    ]);

    if (data.success) {
      setOverlay(true);
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    if (!hasSpace && pattern.test(email) && password && password.length >= 6) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, email]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("back")}>
          {" "}
          <a href="/menulogin">
            <FontAwesomeIcon icon={faArrowLeft} />
          </a>
        </div>
        <h2 className="title" style={{ marginBottom: "60px" }}>
          Let's Get Started
        </h2>
        <div className={cx("form")}>
          <div className={cx("input-data")}>
            <input
              type="text"
              onKeyDown={handleKeyPress}
              placeholder="User"
              value={userName}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <span className={cx("icon-user")}>
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>

          <div className={cx("input-data")}>
            <input
              type="email"
              onKeyDown={handleKeyPress}
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <span className={cx("icon-email")}>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>

          <div className={cx("input-data")}>
            <input
              onKeyDown={handleKeyPress}
              type={isShow ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span className={cx("icon-lock")}>
              <FontAwesomeIcon icon={faLock} />
            </span>
            {!isShow ? (
              <span className={cx("showpass")} onClick={() => setIsShow(true)}>
                <HidePass />
              </span>
            ) : (
              <span className={cx("showpass")} onClick={() => setIsShow(false)}>
                <ShowPass />
              </span>
            )}
          </div>

          <br />
          <div className={cx("btn")}>
            <Button warning large disabled={disable} onClick={handleRegister}>
              Đăng nhập
            </Button>
            <p>or</p>
            <Button
              disabled
              className={cx("gg")}
              white_outline
              large
              lefticon={<GgIcon className={cx("gg-icon")} />}
            >
              Continue with Google
            </Button>
            <br />
            <Button
              disabled
              className={cx("app")}
              white_outline
              large
              lefticon={<AppleIcon className={cx("apple-icon")} />}
              style={{ marginTop: "20px" }}
            >
              Continue with Apple
            </Button>
          </div>

          <div className={cx("policy")}>
            By sign in. I accept the <a href=" ">Terms of Service</a> and{" "}
            <a href=" ">Community Guidelines</a> and have read{" "}
            <a href=" ">Privacy Policy</a>
          </div>
        </div>
      </div>
      {overlay && (
        <div className={cx("wrapper-overlay")}>
          <div className={cx("overlay-content")}>
            <div className={cx("back-icon")}>
              <FontAwesomeIcon
                icon={faClose}
                onClick={() => setOverlay(false)}
              />
            </div>
            <Image src={Success} className={cx("img-success")} alt="" />
            <Button large warning href="/login" className={cx("btn-login")}>
              Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
