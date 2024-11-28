import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDownload,
  faEllipsisVertical,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./BarCodePage.module.scss";
import Image from "../Images/Image";
import frame_img from "~/assets/images/frameBarTickcode.jpg";
import Button from "../Buttons/Button";
import * as getDetailTicket from "~/service/getEventDetailService";

const cx = classNames.bind(styles);

function BarCodePage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const result = await getDetailTicket.getEventDetailService(id);
      if (result) {
        setTickets(result.dataEvents);
        console.log("get ticket success", result);
      } else {
        console.log("get ticket fail");
      }
    };
    fetchAPI();
  }, [id]);

  const handleDownloadTicket = () => {};

  const handleGetQrCode = () => {
    navigate(`/qrcodepage/?id=${id}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("header")}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={cx("icon-back")}
            onClick={() => window.history.back()}
          />
          <h2 className={cx("title")}>Ticket</h2>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className={cx("icon-menu")}
          />
        </div>
        {Array.isArray(tickets) &&
          tickets.length > 0 &&
          tickets.map((ticket, index) => (
            <div className={cx("content")} key={index}>
              <Image src={frame_img} className={cx("img-frame")} alt="" />

              <Image
                src={ticket.imageEvent}
                className={cx("img-popular")}
                alt=""
              />

              <h4 className={cx("title-ticket")}>{ticket.title}</h4>
              <div className={cx("info-ticket")}>
                <div className={cx("left-info")}>
                  <div className={cx("date")}>
                    <p className={cx("date-title")}>Date</p>
                    <h4 className={cx("date-value")}>{ticket.dateTime}</h4>
                  </div>
                  <div className={cx("venue")}>
                    <p className={cx("venue-title")}>Venue</p>
                    <h4 className={cx("venue-value")}>{ticket.venue}</h4>
                  </div>
                </div>
                <div className={cx("right-info")}>
                  {ticket.days && ticket.days.length > 0 ? (
                    Array.isArray(ticket.days) &&
                    ticket.days.length > 0 && (
                      <div className={cx("time")}>
                        <div className={cx("time-start")}>Time</div>
                        <h4 className={cx("info-time")}>
                          {ticket.days[0].hourTime}
                        </h4>
                      </div>
                    )
                  ) : (
                    <div className={cx("time")}>
                      <div className={cx("time-start")}>Time</div>
                      <h4 className={cx("info-time")}>{ticket.hourTime}</h4>
                    </div>
                  )}

                  <div className={cx("seat")}>
                    <div className={cx("time-start")}>Seat</div>
                    <h4 className={cx("info-time")}>{ticket.seat}</h4>
                  </div>
                </div>
              </div>
              <hr className={cx("dashed-line")} />
              <Image
                className={cx("barcode")}
                src="https://i.imgur.com/OcjVLmy.png"
              ></Image>
            </div>
          ))}

        <div className={cx("footer")}>
          <Button
            warning
            medium
            className={cx("btn_down_image")}
            lefticon={<FontAwesomeIcon icon={faDownload} />}
            onClick={handleDownloadTicket}
          >
            Down Image
          </Button>
          <Button
            white_outline
            medium
            className={cx("btn_show_qr")}
            lefticon={<FontAwesomeIcon icon={faQrcode} />}
            onClick={handleGetQrCode}
          >
            Show QR Code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BarCodePage;
