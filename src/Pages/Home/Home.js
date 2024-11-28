import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./Home.module.scss";
import Button from "~/Components/Buttons/Button";
import Image from "~/Components/Images/Image";
import SearchEvent from "~/Layouts/Search/SearchEvent/SearchEvent";
import imgpopular from "~/assets/images/img-popular-home.png";
import Notification from "~/Components/Notification";
import * as filterEventService from "~/service/filterEventService";

const cx = classNames.bind(styles);

function Home() {
  const location = useLocation();
  const currLocal = location.state?.selectedLocation;
  const navigate = useNavigate();
  const [upcomingEvent, setUpcomingEvent] = useState([]);
  const [popularEvent, setPopularEvent] = useState([]);
  const [suggessEvent, setSuggestEvent] = useState([]);

  const setting = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // eslint-disable-next-line no-dupe-keys
    infinite: false,
    autoplay: false,
    dots: false,
  };

  if (currLocal) {
    localStorage.setItem("selectedLocation", currLocal);
  }

  const selectedLocation =
    currLocal ||
    localStorage.getItem("selectedLocation", currLocal) ||
    "No Local";

  useEffect(() => {
    const fetchAPI = async () => {
      const result = await filterEventService.filterEventService("upcoming");

      if (result.success) {
        setUpcomingEvent(result.ticket);
      } else {
        console.error("Error fetching events or no events found");
      }
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchPopularEvents = async () => {
      const result = await filterEventService.filterEventService("popular");

      if (result.success) {
        setPopularEvent(result.ticket);
      } else {
        console.error("Error fetching events or no events found");
      }
    };
    fetchPopularEvents();
  }, []);

  useEffect(() => {
    const fetchSuggestEvents = async () => {
      const result = await filterEventService.filterEventService("suggest");

      if (result.success) {
        setSuggestEvent(result.ticket);
      } else {
        console.error("Error fetching events or no events found");
      }
    };
    fetchSuggestEvents();
  }, []);

  const handleTakeCode = (id) => {
    navigate(`/detail_ticket?id=${id}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("header")}>
          <div className={cx("place")}>
            <p className={cx("desc")}>Find event near you</p>
            <h2 className={cx("title")}>
              <a href="/selectlocal">{selectedLocation}</a>
            </h2>
          </div>

          <Notification />
        </div>
        <SearchEvent />

        <h3 className={cx("title-upcoming")}>Upcoming Events</h3>

        {upcomingEvent.map((resultUpcoming) => (
          <div
            className={cx("upcoming-event")}
            key={resultUpcoming.id}
            onClick={() => handleTakeCode(resultUpcoming.id)}
          >
            <div className={cx("item-left")}>
              <Image
                className={cx("img-ticket")}
                src={resultUpcoming.imageTicket}
                alt=""
              />
              <div className={cx("calendar")}>
                {resultUpcoming.days && resultUpcoming.days.length > 0 ? (
                  <>
                    <p className={cx("date")}>{resultUpcoming.days[0].date}</p>
                    <p className={cx("month")}>
                      {resultUpcoming.days[0].month}
                    </p>
                  </>
                ) : (
                  <>
                    <p className={cx("date")}>{resultUpcoming.date}</p>
                    <p className={cx("month")}>{resultUpcoming.month}</p>
                  </>
                )}
              </div>
            </div>
            <div className={cx("item-right")}>
              <h2 className={cx("title-ticket")}>{resultUpcoming.title}</h2>
              <div className={cx("desc-ticket")}>
                <span className={cx("place")}>
                  <span className={cx("icon-place")}>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </span>
                  <span className={cx("title-place")}>
                    {resultUpcoming.location}
                  </span>
                </span>
                <Button small warning className={cx("btn-join")}>
                  Join
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className={cx("title-popular-now")}>
          <h2> Popolar Now</h2>
          <span>See All</span>
        </div>

        <div className={cx("popular-now-wrapper")}>
          <Slider {...setting} className={cx("slick-slider")}>
            {popularEvent.map((resultPopular) => (
              <div
                className={cx("event-popular")}
                key={resultPopular.id}
                onClick={() => handleTakeCode(resultPopular.id)}
              >
                <Image
                  className={cx("img-popular")}
                  src={resultPopular.imageEvent}
                  alt=""
                />
                <div className={cx("info-popular")}>
                  {resultPopular.days && resultPopular.days.length > 0 ? (
                    <>
                      <div className={cx("date-popular")}>
                        {resultPopular.days.dateTime}
                      </div>
                      <span className={cx("house-popular")}>
                        {"-"} {resultPopular.days.hourTime}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className={cx("date-popular")}>
                        {resultPopular.dateTime}
                      </div>
                      <span className={cx("house-popular")}>
                        {"-"} {resultPopular.hourTime}
                      </span>
                    </>
                  )}
                </div>

                <h2 className={cx("title-event-popular")}>
                  {resultPopular.title}
                </h2>

                <div className={cx("desc-event-popular")}>
                  <span className={cx("place")}>
                    <span className={cx("icon-place")}>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    <span className={cx("title-place")}>
                      {resultPopular.location}
                    </span>
                  </span>
                  <Button className={cx("btn-price")} medium lightwarning>
                    ${resultPopular.price}
                  </Button>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className={cx("title-popular-now")}>
          <h2> Suggestion for you</h2>
          <span>See All</span>
        </div>

        <div className={cx("suggestion")}>
          {suggessEvent.map((suggestResult) => (
            <div className={cx("upcoming-event")} key={suggestResult.id} onClick={() => handleTakeCode(suggestResult.id)}>
              <div className={cx("item-left")}>
                <Image
                  className={cx("img-ticket")}
                  src={suggestResult.imageTicket}
                  alt=""
                />
                <div className={cx("calendar")}>
                  {suggestResult.days && suggestResult.days.length > 0 ? (
                    <>
                      <p className={cx("date")}>{suggestResult.days[0].date}</p>
                      <p className={cx("month")}>
                        {suggestResult.days[0].month}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className={cx("date")}>{suggestResult.date}</p>
                      <p className={cx("month")}>{suggestResult.month}</p>
                    </>
                  )}
                </div>
              </div>
              <div className={cx("item-right")}>
                <h2 className={cx("title-ticket")}>{suggestResult.title}</h2>
                <div className={cx("desc-ticket")}>
                  <span className={cx("place")}>
                    <span className={cx("icon-place")}>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    <span className={cx("title-place")}>
                      {suggestResult.location}
                    </span>
                  </span>
                  <Button small warning className={cx("btn-join")}>
                    Join
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={cx("title-popular-now")}>
          <h2> Who to follow</h2>
          <span>See All</span>
        </div>

        <div className={cx("popular-now-wrapper", "who-follow")}>
          <Slider {...setting} className={cx("slick-slider")}>
            <div className={cx("event-popular")}>
              <Image className={cx("img-popular")} src={imgpopular} alt="" />
              <div className={cx("info-popular")}>
                <div className={cx("date-popular")}>Mar 29, 2022 </div>
                <span className={cx("house-popular")}>{"-"} 10:00 PM</span>
              </div>

              <h2 className={cx("title-event-popular")}>
                Battles of Dance Party 20s
              </h2>

              <div className={cx("desc-event-popular")}>
                <span className={cx("place")}>
                  <span className={cx("icon-place")}>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </span>
                  <span className={cx("title-place")}>California, CA</span>
                </span>
                <Button className={cx("btn-price")} medium lightwarning>
                  $27.99
                </Button>
              </div>
            </div>

            <div className={cx("event-popular")}>
              <Image className={cx("img-popular")} src={imgpopular} alt="" />
              <div className={cx("info-popular")}>
                <div className={cx("date-popular")}>Mar 29, 2022 </div>
                <span className={cx("house-popular")}>{"-"} 10:00 PM</span>
              </div>

              <h2 className={cx("title-event-popular")}>
                Battles of Dance Party 20s
              </h2>

              <div className={cx("desc-event-popular")}>
                <span className={cx("place")}>
                  <span className={cx("icon-place")}>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </span>
                  <span className={cx("title-place")}>California, CA</span>
                </span>
                <Button className={cx("btn-price")} medium lightwarning>
                  $27.99
                </Button>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Home;
