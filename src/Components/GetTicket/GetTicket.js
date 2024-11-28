import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./getTicket.module.scss";
import Image from "../Images/Image";
import * as getEventTicket from "~/service/getEventDetailService";
import Button from "../Buttons/Button";

const cx = classNames.bind(styles);

function GetTicket() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const [ticketInfo, setTicketInfo] = useState([]);
  const [selectDay, setSelectDay] = useState(0);
  const [activeTicket, setActiveTicket] = useState(false);
  const [activeTicketRe, setActiveTicketRe] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedQuantityRe, setSelectedQuantityRe] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPricePre, setTotalPricePre] = useState(0);
  const [statusContent, setStatusContent] = useState([]);
  const [daysToShow, setDaysToShow] = useState([]);

  const navigate = useNavigate();

  // get tickets
  useEffect(() => {
    const fetchAPI = async () => {
      const result = await getEventTicket.getEventDetailService(id);

      if (result.success && Array.isArray(result.dataEvents)) {
        setTicketInfo(result.dataEvents);
      }
    };
    fetchAPI();
  }, [id]);

  //get date
  useEffect(() => {
    const calculateDays = () => {
      if (ticketInfo.length > 0) {
        const firstTicket = ticketInfo[0];
        let allDays = [];
        let defaultSelecttDaysIndex = 0;

        if (
          firstTicket.hasOwnProperty("days") &&
          Array.isArray(firstTicket.days) &&
          firstTicket.days.length > 0
        ) {
          const daysFromApi = firstTicket.days;
          const firstApiDate = new Date(firstTicket.dateTime);

          const allDayBeforApi = 2;
          for (
            let i = 1;
            allDays.length < allDayBeforApi && firstApiDate.getDate() - i > 0;
            i++
          ) {
            const prevDays = new Date(firstApiDate);
            prevDays.setDate(prevDays.getDate() - i);
            allDays.unshift({
              date: prevDays.getDate(),
              month: prevDays.toLocaleString("en-US", { month: "short" }),
              isApiDay: false,
            });
          }

          daysFromApi.forEach((day, index) => {
            allDays.push({ ...day, isApiDay: true });
            if (index === 0) defaultSelecttDaysIndex = allDays.length - 1;
          });

          const nextDays1 = new Date(firstApiDate);
          nextDays1.setDate(nextDays1.getDate() + daysFromApi.length);
          allDays.push({
            date: nextDays1.getDate(),
            month: nextDays1.toLocaleString("en-US", { month: "short" }),
            isApiDay: false,
          });
        } else {
          const apiDate = new Date(firstTicket.dateTime);

          for (let i = 2; i > 0; i--) {
            const prevDays = new Date(apiDate);
            prevDays.setDate(apiDate.getDate() - i);
            allDays.push({
              date: prevDays.getDate(),
              month: prevDays.toLocaleString("en-US", { month: "short" }),
              isApiDay: false,
            });
          }

          allDays.push({
            date: apiDate.getDate(),
            month: apiDate.toLocaleString("en-US", { month: "short" }),
            isApiDay: true,
          });
          defaultSelecttDaysIndex = allDays.length - 1;

          for (let i = 1; i <= 2; i++) {
            const nextDays = new Date(apiDate);
            nextDays.setDate(apiDate.getDate() + i);

            allDays.push({
              date: nextDays.getDate(),
              month: nextDays.toLocaleString("en-US", { month: "short" }),
              isApiDay: false,
            });
          }
        }
        setDaysToShow(allDays);
        setStatusContent([allDays[defaultSelecttDaysIndex]]);
        setSelectDay(defaultSelecttDaysIndex);

        localStorage.setItem("getDay", allDays[defaultSelecttDaysIndex].date);
      }
    };
    calculateDays();
  }, [ticketInfo]);

  // select day
  useEffect(() => {
    if (ticketInfo.length > 0) {
      if (ticketInfo[0]?.days && ticketInfo[0].days.length > 0) {
        const selectedEvent = ticketInfo[0].days[selectDay];
        if (selectedEvent) {
          setStatusContent([selectedEvent]);
        }
      } else {
        setStatusContent([ticketInfo[0]]);
      }
    }
  }, [selectDay, ticketInfo]);

  // select ticket type
  const handleGetDetailOrder = () => {
    if (selectedQuantity <= 0 && selectedQuantityRe <= 0) {
      alert("Please select quantity");
      return;
    }
    localStorage.setItem(
      "selectedQuantity",
      selectedQuantity || selectedQuantityRe
    );

    navigate(`/detail_order?id=${id}`);
  };

  const handleBack = () =>{
    navigate(`/detail_ticket?id=${id}`);
    localStorage.removeItem("getDay");
    localStorage.removeItem("selectedTicketType");
  }

  return (
    <div className={cx("wrapper")}>
      {ticketInfo.map((date, index) => (
        <div className={cx("inner")}>
          <div className={cx("header")}>
            <a href={' '} className={cx("icon-back")} onClick={handleBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </a>
            <h2 className={cx("title")}>Get a Ticket</h2>
          </div>

          <div className={cx("wrap-calendar")}>
            {daysToShow.map((day, index) => (
              <div
                className={cx("calendar", {
                  hightlight: selectDay === index && day.isApiDay,
                  hidden: !day.isApiDay,
                })}
                key={index}
                onClick={() => {
                  setSelectDay(index);
                  setTotalPrice(0);
                  setTotalPricePre(0);
                  setActiveTicket(false);
                  setActiveTicketRe(false);
                  if (ticketInfo[0].days) {
                    setStatusContent([daysToShow[index]]);
                  }
                  localStorage.setItem("getDay", day.date);
                }}
              >
                <div className={cx("date")}>{day.date}</div>
                <div className={cx("month")}>{day.month}</div>
              </div>
            ))}
          </div>

          <div className={cx("content")}>
            {statusContent.map((item, index) => (
              <p>
                <h2 className={cx(" title-content")}>Choose a ticket</h2>

                <div className={cx("list-ticket")}>
                  <div className={cx("ticket", { active: activeTicket })}>
                    <div className={cx("header-ticket")}>
                      <h3 className={cx("style-ticket")}>
                        {item.type_premium}
                      </h3>
                      <span className={cx("input-checkbox")}>
                        <input type="checkbox" checked={activeTicket}></input>
                      </span>
                    </div>

                    <div
                      className={cx("body-ticket")}
                      onClick={() => {
                        if (activeTicket === false) {
                          setActiveTicket(true);

                          localStorage.setItem(
                            "selectedTicketType",
                            item.type_premium
                          );
                        } else {
                          setActiveTicket(false);
                          localStorage.removeItem("selectedTicketType");
                        }
                        setTotalPrice(0);
                        setTotalPricePre(0);
                        setSelectedQuantity(0);
                        setSelectedQuantityRe(0);
                        setActiveTicketRe(false);
                      }}
                    >
                      <div className={cx("item-left")}>
                        <Image
                          className={cx("img-ticket")}
                          src={item.imageDay || item.imageTicket}
                          alt=""
                        />
                      </div>
                      <div className={cx("item-right")}>
                        <h2 className={cx("title-ticket")}>
                          {item.titleEvent || item.title}
                        </h2>
                        <div className={cx("desc-ticket")}>
                          <span className={cx("remain")}>
                            {item.remainEventPre ||
                              item.remainingTicketsPremium}{" "}
                            spot left
                          </span>
                          <h4 className={cx("price")}>
                            ${item.pricePre || item.pricePremium}.00
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className={cx("footer-ticket")}>
                      <div className={cx("more")}>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="icon-more"
                        />
                        <span>Show more</span>
                      </div>
                      <span className={cx("quantity")}>
                        <span
                          className={cx("reduce")}
                          onClick={() => {
                            if (activeTicket === true && selectedQuantity > 0) {
                              setSelectedQuantity(Number(selectedQuantity) - 1);
                              setTotalPricePre(
                                Number(totalPricePre) -
                                  Number(item.pricePre || item.pricePremium)
                              );
                            } else if (selectedQuantity - 1 === 0) {
                              alert(
                                "Chưa select ticket or đã hết số lượng vé vui lòng quay trở lại sau "
                              );
                              setTotalPricePre(0);
                            }
                          }}
                        >
                          -
                        </span>
                        <span className={cx("value")}>{selectedQuantity}</span>

                        <span
                          className={cx("increase")}
                          onClick={() => {
                            if (
                              activeTicket &&
                              selectedQuantity <
                                (item.remainEventPre ||
                                  item.remainingTicketsPremium)
                            ) {
                              setSelectedQuantity(selectedQuantity + 1);
                              setTotalPricePre(
                                Number(totalPricePre) +
                                  Number(item.pricePre || item.pricePremium)
                              );
                            } else {
                              alert(
                                "Chưa select ticket or đã hết số lượng vé vui lòng quay trở lại sau "
                              );
                            }
                          }}
                        >
                          +
                        </span>
                      </span>
                    </div>
                  </div>

                  {/*ticket regular */}

                  <div className={cx("ticket", { active: activeTicketRe })}>
                    <div className={cx("header-ticket")}>
                      <h3 className={cx("style-ticket")}>
                        {item.type_regular}
                      </h3>
                      <span className={cx("input-checkbox")}>
                        <input type="checkbox" checked={activeTicketRe}></input>
                      </span>
                    </div>

                    <div
                      className={cx("body-ticket")}
                      onClick={() => {
                        if (activeTicketRe === false) {
                          setActiveTicketRe(true);
                          localStorage.setItem(
                            "selectedTicketType",
                            item.type_regular
                          );
                        } else {
                          setActiveTicketRe(false);
                          localStorage.removeItem("selectedTicketType");
                        }
                        setTotalPrice(0);
                        setTotalPricePre(0);
                        setSelectedQuantity(0);
                        setSelectedQuantityRe(0);
                        setActiveTicket(false);
                      }}
                    >
                      <div className={cx("item-left")}>
                        <Image
                          className={cx("img-ticket")}
                          src={item.imageDay || item.imageTicket}
                          alt=""
                        />
                      </div>
                      <div className={cx("item-right")}>
                        <h2 className={cx("title-ticket")}>
                          {item.titleEvent || item.title}
                        </h2>
                        <div className={cx("desc-ticket")}>
                          <span className={cx("remain")}>
                            {item.remainEventRe || item.remainingTickets} spot
                            left
                          </span>
                          <h4 className={cx("price")}>
                            ${item.priceRe || item.price}.00
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className={cx("footer-ticket")}>
                      <div className={cx("more")}>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="icon-more"
                        />
                        <span>Show more</span>
                      </div>
                      <span className={cx("quantity")}>
                        <span
                          className={cx("reduce")}
                          onClick={() => {
                            if (selectedQuantityRe > 0) {
                              setSelectedQuantityRe(
                                activeTicketRe && selectedQuantityRe - 1
                              );
                              setTotalPrice(
                                totalPrice - (item.priceRe || item.price)
                              );
                            } else {
                              alert(
                                "Chưa select ticket or đã hết số lượng vé vui lòng quay trở lại sau "
                              );
                            }
                          }}
                        >
                          -
                        </span>
                        <span className={cx("value")}>
                          {selectedQuantityRe}
                        </span>
                        <span
                          className={cx("increase")}
                          onClick={() => {
                            if (
                              activeTicketRe &&
                              selectedQuantityRe <
                                (item.remainEventRe || item.remainingTickets)
                            ) {
                              setSelectedQuantityRe(selectedQuantityRe + 1);
                              setTotalPrice(
                                totalPrice + (item.priceRe || item.price)
                              );
                            } else {
                              alert(
                                "Chưa select ticket or đã hết số lượng vé vui lòng quay trở lại sau "
                              );
                            }
                          }}
                        >
                          +
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className={cx("continue")}>
                    <div className={cx("total-price")}>
                      <h3 className={cx("total")}>
                        ${totalPrice || totalPricePre}.00
                      </h3>
                      <p className={cx("desc")}>
                        You're going to +{" "}
                        {selectedQuantityRe || selectedQuantity}
                      </p>
                    </div>
                    <Button warning medium onClick={handleGetDetailOrder}>
                      Continue
                    </Button>
                  </div>
                </div>
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetTicket;
