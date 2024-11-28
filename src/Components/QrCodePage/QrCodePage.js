import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalculator,
  faDownload,
  faEllipsisVertical,
  faLightbulb,
  faShare,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

import styles from "./QrCodePage.module.scss";
import Image from "../Images/Image";
import Button from "../Buttons/Button";
import imgHome from "~/assets/images/img-popular-home.png";
import * as getDetailTicket from "~/service/getEventDetailService";

const cx = classNames.bind(styles);

function QrCodePage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const result = await getDetailTicket.getEventDetailService(id);
      if (result.success && Array.isArray(result.dataEvents)) {
        setTickets(result.dataEvents);
      } else {
        console.log("get ticket fail");
      }
    };
    fetchAPI();
  }, [id]);

  console.log("tickets", tickets);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("header")}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={cx("icon-back")}
            onClick={() => window.history.back()}
          />
          <h2 className={cx("title")}>QR Code</h2>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className={cx("icon-menu")}
          />
        </div>
        {Array.isArray(tickets) &&
          tickets.length > 0 &&
          tickets.map((ticket, index) => (
            <div className={cx("content")} key={index}>
              <div className={cx("event")}>
                <div className={cx("left-item")}>
                  <Image src={imgHome} className={cx("img-ticket")} />
                </div>
                <div className={cx("right-item")}>
                  <div className={cx("title")}>{ticket.title}</div>
                  <div className={cx("desc-info")}>
                    <span className={cx("date")}>
                      <FontAwesomeIcon icon={faCalculator} /> {ticket.dateTime}
                    </span>
                    {Array.isArray(ticket.days) && ticket.days.length > 0 ? (
                      <span className={cx("hour-start")}>
                        <FontAwesomeIcon icon={faStopwatch} /> {ticket.days[0].hourTime}
                      </span>
                    ) : (
                      <span className={cx("hour-start")}>
                        <FontAwesomeIcon icon={faStopwatch} /> {ticket.hourTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Image src={ticket.qrCodeImage} className={cx("img-qrcode")} />
            </div>
          ))}

        <div className={cx("notifi")}>
          <span className={cx("icon-notifi")}>
            <FontAwesomeIcon icon={faLightbulb} />
          </span>
          <span className={cx("text-notifi")}>
            Please show this code at the event and scan it to proceed.
          </span>
        </div>

        <div className={cx("footer")}>
          <Button
            warning
            medium
            className={cx("btn_down_image")}
            lefticon={<FontAwesomeIcon icon={faDownload} />}
          >
            Down Image
          </Button>
          <Button
            white_outline
            medium
            className={cx("btn_show_qr")}
            lefticon={<FontAwesomeIcon icon={faShare} />}
          >
            Share Code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QrCodePage;
