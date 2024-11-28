import React, { useState } from "react";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";

import { Wrapper as PopperWrapper } from "../Popper";
import styles from "./Notification.module.scss";
import Button from "~/Components/Buttons/Button";
import Image from "../Images/Image";
import avaNoti1 from '~/assets/images/avatar-noti1.png'

const cx = classNames.bind(styles);
function Notification() {
  const [toggle, setToggle] = useState(false);

  const handleShowNotifi = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <div>
      <Tippy
        visible={toggle}
        interactive={true}
        placement="bottom-start"
        appendTo={document.body}
        render={(atrrs) => (
          <div className={cx("wrapper")} tabIndex="-1" {...atrrs}>
            <div className={cx("notification")}>
              <PopperWrapper>
                <div className={cx("content")}>
                  <div className={cx("header")}>
                    <h3 className={cx("title")}>Notification</h3>
                    <span className={cx("icon")}>
                      {" "}
                      <FontAwesomeIcon icon={faBell} />
                    </span>
                  </div>
                  <div className={cx("list-notification")}>
                    <div className={cx("item")}>
                      <div className={cx("left-item")}>
                        <Image src={avaNoti1} />
                      </div>
                      <div className={cx("right-item")}>
                        <div className={cx("title-notification")}>Anna Mariana <span>and 8 others friend joined</span> to Art <br />
                        & Craft Professional event</div>
                        <div className={cx("desc-notification")}>
                          <div className={cx("left-desc")}>
                            <FontAwesomeIcon icon={faBell} />
                          </div>
                          <div className={cx("right-desc")}>10h ago</div>
                        </div>
                        <div className={cx("auth")}>
                          <Button
                            medium
                            white_outline
                            className={cx("decline")}
                          >
                            Decline
                          </Button>
                          <Button medium warning className={cx("accept")}>
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx("list-notification")}>
                    <div className={cx("item")}>
                      <div className={cx("left-item")}>
                        <Image src={avaNoti1} />
                      </div>
                      <div className={cx("right-item")}>
                        <div className={cx("title-notification")}>Anna Mariana <span>and 8 others friend joined</span> to Art <br />
                        & Craft Professional event</div>
                        <div className={cx("desc-notification")}>
                          <div className={cx("left-desc")}>
                            <FontAwesomeIcon icon={faBell} />
                          </div>
                          <div className={cx("right-desc")}>10h ago</div>
                        </div>
                        <div className={cx("auth")}>
                          <Button
                            medium
                            white_outline
                            className={cx("decline")}
                          >
                            Decline
                          </Button>
                          <Button medium warning className={cx("accept")}>
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx("list-notification")}>
                    <div className={cx("item")}>
                      <div className={cx("left-item")}>
                        <Image src={avaNoti1} />
                      </div>
                      <div className={cx("right-item")}>
                        <div className={cx("title-notification")}>Anna Mariana <span>and 8 others friend joined</span> to Art <br />
                        & Craft Professional event</div>
                        <div className={cx("desc-notification")}>
                          <div className={cx("left-desc")}>
                            <FontAwesomeIcon icon={faBell} />
                          </div>
                          <div className={cx("right-desc")}>10h ago</div>
                        </div>
                        <div className={cx("auth")}>
                          <Button
                            medium
                            white_outline
                            className={cx("decline")}
                          >
                            Decline
                          </Button>
                          <Button medium warning className={cx("accept")}>
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx("list-notification")}>
                    <div className={cx("item")}>
                      <div className={cx("left-item")}>
                        <Image src={avaNoti1} />
                      </div>
                      <div className={cx("right-item")}>
                        <div className={cx("title-notification")}>Anna Mariana <span>and 8 others friend joined</span> to Art <br />
                        & Craft Professional event</div>
                        <div className={cx("desc-notification")}>
                          <div className={cx("left-desc")}>
                            <FontAwesomeIcon icon={faBell} />
                          </div>
                          <div className={cx("right-desc")}>10h ago</div>
                        </div>
                        <div className={cx("auth")}>
                          <Button
                            medium
                            white_outline
                            className={cx("decline")}
                          >
                            Decline
                          </Button>
                          <Button medium warning className={cx("accept")}>
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx("list-notification")}>
                    <div className={cx("item")}>
                      <div className={cx("left-item")}>
                        <Image src={avaNoti1} />
                      </div>
                      <div className={cx("right-item")}>
                        <div className={cx("title-notification")}>Anna Mariana <span>and 8 others friend joined</span> to Art <br />
                        & Craft Professional event</div>
                        <div className={cx("desc-notification")}>
                          <div className={cx("left-desc")}>
                            <FontAwesomeIcon icon={faBell} />
                          </div>
                          <div className={cx("right-desc")}>10h ago</div>
                        </div>
                        <div className={cx("auth")}>
                          <Button
                            medium
                            white_outline
                            className={cx("decline")}
                          >
                            Decline
                          </Button>
                          <Button medium warning className={cx("accept")}>
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx("list-notification")}>
                    <div className={cx("item")}>
                      <div className={cx("left-item")}>
                        <Image src={avaNoti1} />
                      </div>
                      <div className={cx("right-item")}>
                        <div className={cx("title-notification")}>Anna Mariana <span>and 8 others friend joined</span> to Art <br />
                        & Craft Professional event</div>
                        <div className={cx("desc-notification")}>
                          <div className={cx("left-desc")}>
                            <FontAwesomeIcon icon={faBell} />
                          </div>
                          <div className={cx("right-desc")}>10h ago</div>
                        </div>
                        <div className={cx("auth")}>
                          <Button
                            medium
                            white_outline
                            className={cx("decline")}
                          >
                            Decline
                          </Button>
                          <Button medium warning className={cx("accept")}>
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PopperWrapper>
            </div>
          </div>
        )}
      >
        <div>
          <Button
            small
            white_outline
            className={cx("btn-notification")}
            onClick={handleShowNotifi}
          >
            <FontAwesomeIcon icon={faBell} />
          </Button>
        </div>
      </Tippy>
    </div>
  );
}

export default Notification;
