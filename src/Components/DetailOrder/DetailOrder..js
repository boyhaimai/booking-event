import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

import styles from "./DetailOrder.module.scss";
import Image from "../Images/Image";
import paypal from "~/assets/images/paypal-social-media-svgrepo-com.svg";
import Button from "../Buttons/Button";
import * as getEventTicket from "~/service/getEventDetailService";
import success from "~/assets/images/successOrder.png";
import * as paymnetService from "~/service/setPaymentService";

const cx = classNames.bind(styles);

function DetailOrder() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const [ticketInfo, setTicketInfo] = useState([]);
  const [filteredDay, setFilteredDay] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedTicketType, setSelectedTicketType] = useState("");
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const storedQuantity = localStorage.getItem("selectedQuantity");
    const storedTicketType = localStorage.getItem("selectedTicketType");

    if (storedQuantity) setSelectedQuantity(parseInt(storedQuantity, 10));
    if (storedTicketType) setSelectedTicketType(storedTicketType);

    const fetchApi = async () => {
      const result = await getEventTicket.getEventDetailService(id);
      // console.log(result, " result-API");
      if (result.success && Array.isArray(result.dataEvents[0]?.days)) {
        setTicketInfo(result.dataEvents);

        const getDays = localStorage.getItem("getDay");

        if (getDays) {
          const dayMatch = result.dataEvents[0].days.find(
            (day) => day.date === parseInt(getDays, 10)
          );
          setFilteredDay(dayMatch);
        }
      }
    };
    fetchApi();
  }, [id]);

  const calcularPrice = () => {
    if (selectedTicketType === "Premium price") {
      return (
        (filteredDay ? filteredDay.pricePre : ticketInfo[0].pricePremium) *
        selectedQuantity
      );
    } else if (selectedTicketType === "Regular price") {
      return (
        (filteredDay ? filteredDay.priceRe : ticketInfo[0].price) *
        selectedQuantity
      );
    }
    return 0;
  };

  const handlePayment = async () => {
    const getDays = localStorage.getItem("getDay");
    const paymentData = {
      userId: localStorage.getItem("userId"),
      ticketId: id,
      selectedDay: parseInt(getDays, 10),
      selectedQuantity: selectedQuantity,
      selectedTicketType: selectedTicketType,
      totalPrice: (calcularPrice() + 2.11).toFixed(2),
    };

    try {
      const result = await paymnetService.paymentRequest(paymentData);
      console.log(result, "result payment");
      if (result.success) {
        alert("payment success", result.message);
        localStorage.removeItem("getDay");
        localStorage.removeItem("selectedQuantity");
        localStorage.removeItem("selectedTicketType");
        setOverlay(true);
      } else {
        console.error("Payment failed", result.message);
      }
    } catch (error) {
      alert("Error creating payment");
      console.error("Error creating payment", error);
    }
  };

  return (
    <div className={cx("wrapper")}>
      {ticketInfo[0] && ticketInfo[0].days && ticketInfo[0].days.length > 0 ? (
        <>
          {filteredDay ? (
            <div className={cx("inner")}>
              <div className={cx("header")}>
                <a href={`/get_ticket?id=${id}`} className={cx("icon-back")}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </a>
                <h2 className={cx("title")}>Detail Order</h2>
              </div>

              <div className={cx("upcoming-event", "ticket-event")}>
                <div className={cx("item-left")}>
                  <Image
                    className={cx("img-ticket")}
                    src={filteredDay.imageDay}
                    alt=""
                  />
                  <div className={cx("calendar")}>
                    <p className={cx("date")}>{filteredDay.date}</p>
                    <p className={cx("month")}>{filteredDay.month}</p>
                  </div>
                </div>

                <div className={cx("item-right")}>
                  <h2 className={cx("title-ticket")}>
                    {filteredDay.titleEvent}
                  </h2>
                  <div className={cx("info")}>
                    <div className={cx("info-date")}>
                      <span className={cx("icon-calendar")}></span>
                      <p className={cx("title-date")}>{filteredDay.dateTime}</p>
                    </div>

                    <div className={cx("info-hour")}>
                      <span className={cx("icon-watch")}></span>
                      <p className={cx("title-watch")}>
                        {filteredDay.hourTime} - {filteredDay.timeEnd}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className={cx("title-order")}>Order summary</h4>

              <div className={cx("info-payment")}>
                <div className={cx("payment")}>
                  <div className={cx("left-payment")}>
                    <p className={cx("title-payment")}>
                      {selectedQuantity} {selectedTicketType}
                    </p>
                    <p className={cx("title-payment")}>Subtotal</p>
                    <p className={cx("title-payment", "fees")}>
                      Fees{" "}
                      <span className={cx("icon-warning")}>
                        <FontAwesomeIcon icon={faCircleExclamation} />
                      </span>
                    </p>
                    <p className={cx("title-payment")}>Total</p>
                  </div>
                  <div className={cx("right-payment")}>
                    <p className={cx("price")}>${calcularPrice()}.00</p>
                    <p className={cx("price")}>${calcularPrice()}.00</p>
                    <p className={cx("price", "fees")}>$02.11</p>
                    <p className={cx("price", "total-payment")}>
                      ${(calcularPrice() + 2.11).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className={cx("payment-method")}>
                  <div className={cx("title-method")}>
                    <h4>Payment method</h4>
                    <p>
                      {" "}
                      Change <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                  </div>

                  <div className={cx("method-paypal")}>
                    <div className={cx("info-method")}>
                      <h5>Paypal</h5>
                      <p>bang@gmail.com</p>
                    </div>
                    <div className={cx("right-paypal")}>
                      <Image className={cx("img-paypal")} src={paypal} alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className={cx("continue")}>
                <div className={cx("total-price")}>
                  <h3 className={cx("total")}>
                    ${(calcularPrice() + 2.11).toFixed(2)}
                  </h3>
                  <p className={cx("desc")}>
                    You're going to + {selectedQuantity}
                  </p>
                </div>
                <Button warning medium onClick={handlePayment}>
                  Order Place
                </Button>
              </div>
            </div>
          ) : (
            <p>No matching day found or loading...</p>
          )}
        </>
      ) : (
        ticketInfo.map((ticket, index) => (
          <div className={cx("inner")} key={id}>
            <div className={cx("header")}>
              <a href={`/get_ticket?id=${id}`} className={cx("icon-back")}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </a>
              <h2 className={cx("title")}>Detail Order</h2>
            </div>

            <div className={cx("upcoming-event", "ticket-event")}>
              <div className={cx("item-left")}>
                <Image
                  className={cx("img-ticket")}
                  src={ticket.imageTicket}
                  alt=""
                />
                <div className={cx("calendar")}>
                  <p className={cx("date")}>{ticket.date}</p>
                  <p className={cx("month")}>{ticket.month}</p>
                </div>
              </div>

              <div className={cx("item-right")}>
                <h2 className={cx("title-ticket")}>{ticket.title}</h2>
                <div className={cx("info")}>
                  <div className={cx("info-date")}>
                    <span className={cx("icon-calendar")}></span>
                    <p className={cx("title-date")}>{ticket.dateTime}</p>
                  </div>

                  <div className={cx("info-hour")}>
                    <span className={cx("icon-watch")}></span>
                    <p className={cx("title-watch")}>
                      {ticket.hourTime} - {ticket.timeEnd}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h4 className={cx("title-order")}>Order summary</h4>

            <div className={cx("info-payment")}>
              <div className={cx("payment")}>
                <div className={cx("left-payment")}>
                  <p className={cx("title-payment")}>
                    {selectedQuantity} {selectedTicketType}
                  </p>
                  <p className={cx("title-payment")}>Subtotal</p>
                  <p className={cx("title-payment", "fees")}>
                    Fees{" "}
                    <span className={cx("icon-warning")}>
                      <FontAwesomeIcon icon={faCircleExclamation} />
                    </span>
                  </p>
                  <p className={cx("title-payment")}>Total</p>
                </div>
                <div className={cx("right-payment")}>
                  <p className={cx("price")}>${calcularPrice()}</p>
                  <p className={cx("price")}>${calcularPrice()}</p>
                  <p className={cx("price", "fees")}>$02.11</p>
                  <p className={cx("price", "total-payment")}>
                    ${(calcularPrice() + 2.11).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className={cx("payment-method")}>
                <div className={cx("title-method")}>
                  <h4>Payment method</h4>
                  <p>
                    {" "}
                    Change <FontAwesomeIcon icon={faArrowRight} />
                  </p>
                </div>

                <div className={cx("method-paypal")}>
                  <div className={cx("info-method")}>
                    <h5>Paypal</h5>
                    <p>bang@gmail.com</p>
                  </div>
                  <div className={cx("right-paypal")}>
                    <Image className={cx("img-paypal")} src={paypal} alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("continue")}>
              <div className={cx("total-price")}>
                <h3 className={cx("total")}>
                  ${(calcularPrice() + 2.11).toFixed(2)}
                </h3>
                <p className={cx("desc")}>
                  You're going to + {selectedQuantity}
                </p>
              </div>
              <Button warning medium onClick={handlePayment}>
                Order Place
              </Button>
            </div>
          </div>
        ))
      )}
      {overlay && (
        <div className={cx("wrapper-overlay")}>
          <div className={cx("overlay-content")}>
            <Image src={success} className={cx("img-success")} alt="" />
            <Button
              large
              warning
              href="/ticket"
              className={cx("btn-view-ticket")}
            >
              View ticket
            </Button>
            <Button large outline href="/" className={cx("btn-view-more")}>
              Discover more events
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailOrder;
