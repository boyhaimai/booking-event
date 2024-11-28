import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCalendar,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./ticket.module.scss";
import * as getStorageTicket from "~/service/getStorageTicketService";
import Image from "~/Components/Images/Image";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Ticket() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [surroundingDate, setSurroundingDate] = useState([]);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [showTickets, setShowTickets] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpenCalendar(false);

    const selectedDay = date.getDate();

    const days = [];
    for (let i = -2; i <= 2; i++) {
      const newDate = new Date(date);
      newDate.setDate(selectedDay + i);
      days.push(newDate);
    }
    setSurroundingDate(days);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      if (!selectedDate) {
        console.error("No date selected");
        return;
      }

      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("No user id");
        return;
      }

      try {
        const formattedDate = new Date(selectedDate).toString();
        console.log(formattedDate, "formattedDate");
        const response = await getStorageTicket.storageTicket(
          userId,
          formattedDate
        );
        setShowTickets(response);
        console.log(response, "data response from server");
      } catch (err) {
        console.error("Error fetching ticket", err);
        return;
      }
    };
    fetchAPI();
  }, [selectedDate]);

  const handleGetInfoTicket = (id) => {
    navigate(`/barcodepage/?id=${id}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("header")}>
          <h2 className={cx("title")}>Ticket</h2>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className={cx("icon-menu")}
          />
        </div>

        <div className={cx("wrap-calendar")}>
          <div className={cx("select")}>
            <div className={cx("select-month")}>
              <span className={cx("next-month")}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </span>
              <span className={cx("selected-month")}>
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-US", {
                      month: "long",
                    }) +
                    "  " +
                    selectedDate.getFullYear()
                  : "Chưa chọn date"}
              </span>
              <span className={cx("prev-month")}>
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </div>

            <div className={cx("icon-calendar")}>
              <FontAwesomeIcon
                onClick={() => setIsOpenCalendar(!isOpenCalendar)}
                icon={faCalendar}
              />
              {isOpenCalendar && (
                <DatePicker
                  className={cx("box-calendar")}
                  selected={selectedDate}
                  onChange={handleDateChange}
                  line
                  onClickOutside={() => setIsOpenCalendar(false)}
                />
              )}
            </div>
          </div>

          <div className={cx("calendar-list")}>
            {surroundingDate.map((date, index) => (
              <div key={index}>
                <div
                  className={cx("calendar", {
                    hightlight:
                      date.toDateString() === selectedDate.toDateString(),
                  })}
                >
                  <div className={cx("date")}>{date.getDate()}</div>
                  <div className={cx("month")}>
                    {selectedDate.toLocaleString("en-US", { month: "short" })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cx("content")}>
          <div className={cx("status")}>
            <div className={cx("status-upcoming", "hightlight")}>Upcoming</div>
            <div className={cx("past-ticket")}>Past ticket</div>
          </div>
          {Array.isArray(showTickets) && showTickets.length > 0 ? (
            showTickets.map((ticket, index) => (
              <div
                className={cx("block-lists")}
                key={index}
                onClick={() => handleGetInfoTicket(ticket.id)}
              >
                <div className={cx("list-ticket")}>
                  <div className={cx("title-ticket")}>
                    <h3 className={cx("title-item")}>{ticket.title}</h3>
                    <span className={cx("icon-music")}>
                      <Image src={ticket.iconTypeTicket} />
                    </span>
                  </div>
                  <hr className={cx("dashed-line")} />

                  <div className={cx("info-ticket")}>
                    <div className={cx("left-info")}>
                      {ticket.days && ticket.days.length > 0 ? (
                        Array.isArray(ticket.days) &&
                        ticket.days.length > 0 && (
                          <div className={cx("time")} key={index}>
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
                    <div className={cx("right-info")}>
                      {ticket.ticketType} x{ticket.remainProduct}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={cx("no-ticket")}>
              <h3>No select date or</h3>
              <p>No ticket available for this date</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
