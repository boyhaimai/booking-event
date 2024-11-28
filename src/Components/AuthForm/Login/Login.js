import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { faArrowLeft, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { jwtDecode } from "jwt-decode";

import styles from "./login.module.scss";
import { AuthContext } from "~/Components/AuthProvider/AuthProvider";
import { AppleIcon, GgIcon, HidePass, ShowPass } from "~/Components/Icons";
import Button from "~/Components/Buttons/Button";
import * as loginUser from "~/service/getAccountService";

const cx = classNames.bind(styles);

function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const hasSpace = password.includes(" ");
  const pattern = /\S/;

  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (
      e.key === "Enter" &&
      !hasSpace &&
      pattern.test(email) &&
      pattern.test(password)
    ) {
      e.preventDefault();
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser.getAccount(email, password);
      if (data.success) {
        const { accessToken, refreshToken } = data;
        if (!accessToken) {
          console.error("Access Token khong hop le", accessToken);
          return;
        }
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.id || "defaultUserId";

        localStorage.setItem(
          "tokens",
          JSON.stringify({ accessToken, refreshToken, userId })
        );

        login(refreshToken, userId);
        navigate("/selectlocal");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      alert("Đã xảy ra lỗi khi đăng nhập. Vui sối thử lagi.");
    }
  };

  useEffect(() => {
    if (!hasSpace && pattern.test(email) && pattern.test(password)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("back")}>
          {" "}
          <a href="/menulogin">
            <FontAwesomeIcon icon={faArrowLeft} />
          </a>
        </div>
        <h2 className={cx("title")}>Let's Get Started</h2>
        <p className={cx("desc")}>
          Sign up or log in to what happening <br /> near you
        </p>
        <div className={cx("form")}>
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

          <a href=" " className={cx("forgot-pass")}>
            Forgot Password?
          </a>
          <br />
          <div className={cx("btn")}>
            <Button warning large disabled={disable} onClick={handleLogin}>
              Đăng nhập
            </Button>
            <p>or</p>
            <Button
              disabled={true}
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
    </div>
  );
}

export default Login;
