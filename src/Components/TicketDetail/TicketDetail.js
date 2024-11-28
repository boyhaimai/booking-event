import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUpFromBracket,
  faCalendarDay,
  faHeart,
  faHeartBroken,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./ticketdetail.module.scss";
import Image from "../Images/Image";
import Button from "../Buttons/Button";
import * as getEventDetailService from "~/service/getEventDetailService";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function TicketDetail() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const [eventDetail, setEventDetail] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      const result = await getEventDetailService.getEventDetailService(id);

      if (result.success && Array.isArray(result.dataEvents)) {
        setEventDetail(result.dataEvents);
      } else {
        console.log("khong co API");
      }
    };
    fetchAPI();
  }, [id]);

  const getATicket = () => {
    navigate(`/get_ticket?id=${id}`);
  };

  return (
    <div className={cx("wrapper")}>
      {eventDetail.map((item) => (
        <div className={cx("inner")} key={item.id}>
          <div className={cx("header")}>
            <a href="/" className={cx("icon-back")}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </a>
            <span className={cx("right")}>
              <span className={cx("share-icon")}>
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
              </span>
              <span className={cx("heart-icon")}>
                <FontAwesomeIcon icon={faHeartBroken} />
              </span>
              <span className={cx("heart-icon", "pink")}>
                <FontAwesomeIcon icon={faHeart} />
              </span>
            </span>
          </div>
          <div className={cx("content")}>
            <div className={cx("avatar")}>
              <Image src={item.imageEvent} />
              <Button
                medium
                lefticon={<FontAwesomeIcon icon={faVideo} />}
                className={cx("watch-video")}
              >
                {" "}
                Watch video
              </Button>
            </div>

            <h3 className={cx("title")}>{item.title}</h3>

            <div className={cx("time")}>
              {item.days && item.days.length > 0 ? (
                <div className={cx("desc-time")}>
                  <span className={cx("date-month")}>
                    <h4 className={cx("date")}>{item.days[0].date}</h4>
                    <p className={cx("month")}>{item.days[0].month}</p>
                  </span>
                  <span className={cx("day-hour")}>
                    <h4 className={cx("day")}>{item.days[0].day}</h4>
                    <p className={cx("hour")}>
                      {item.days[0].hourTime} - {item.days[0].timeEnd}
                    </p>
                  </span>
                </div>
              ) : (
                <div className={cx("desc-time")}>
                  <span className={cx("date-month")}>
                    <h4 className={cx("date")}>{item.date}</h4>
                    <p className={cx("month")}>{item.month}</p>
                  </span>
                  <span className={cx("day-hour")}>
                    <h4 className={cx("day")}>{item.day}</h4>
                    <p className={cx("hour")}>
                      {item.hourTime} - {item.timeEnd}
                    </p>
                  </span>
                </div>
              )}

              <div className={cx("select-time")}>
                <Button className={cx("carlendar")} lightwarning>
                  <FontAwesomeIcon
                    icon={faCalendarDay}
                    className={cx("icon-carlendar")}
                  />
                </Button>
              </div>
            </div>

            <div className={cx("desc")}>
              <h4 className={cx("title-desc")}>About this events</h4>
              <p className={cx("content-desc")}>{item.description}</p>
              <p className={cx("more")}> Show more</p>
            </div>

            <div className={cx("footer")}>
              <div className={cx("desc-price")}>
                <h4 className={cx("price")}>
                  ${item.price}.00 - ${item.pricePremium}.00
                </h4>
                <p className={cx("remain")}>
                  {Number(item.remainingTickets) +
                    Number(item.remainingTicketsPremium)}{" "}
                  spot left
                </p>
              </div>
              <Button warning className={cx("get-btn")} onClick={getATicket}>
                Get a Ticket
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketDetail;
