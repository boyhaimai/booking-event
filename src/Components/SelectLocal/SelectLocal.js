import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import styles from "./SelectLocal.module.scss";
import Button from "../Buttons/Button";
import Avatar from "../Images/Avatar/Avatar";
import SearchAdress from "~/Layouts/Search/SearchAdress/SearchAdress";
import { AuthContext } from "../AuthProvider/AuthProvider";

const cx = classNames.bind(styles);

function SelectLocal() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/tickets`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setEvents(data.data);
        console.log(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      // setLoading(false);
    };
    fetchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut();

    localStorage.removeItem("selectedLocation");
    localStorage.removeItem("tokens");
    navigate("/menulogin");
  };
  const handleLocationSelect = (location) => {
    navigate("/", { state: { selectedLocation: location.location } });
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = `Vĩ Độ: ${position.coords.latitude} , Kinh Độ: ${position.coords.longitude}`;
          navigate("/", { state: { selectedLocation: currentLocation } });
        },
        (error) => {
          console.log("Eror", error);
          alert("Error. Please try again!");
        }
      );
    } else {
      alert("Your browser does not support geolocation!");
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("back")} onClick={handleLogout}>
          <a href="/menulogin">
            <FontAwesomeIcon icon={faArrowLeft} />
          </a>
        </div>
        <h2 className={cx("title")}>Let's Get Started</h2>
        <p className={cx("desc")}>
          Sign up or log in to what happening <br /> near you
        </p>

        <SearchAdress />

        <Button
          className={cx("select-local")}
          white_outline
          large
          lefticon={<FontAwesomeIcon icon={faLocationCrosshairs} />}
          onClick={handleUseCurrentLocation}
        >
          Use my current location
        </Button>
        <p className={cx("popular")}>Popular location</p>

        <div className={cx("wrapper-local")}>
          {events.map((event) => (
            <div
              className={cx("inner-local")}
              key={event.id}
              onClick={() => handleLocationSelect(event)}
            >
              <div className="left">
                <h2 className={cx("title-local")}>{event.location}</h2>
                <p className={cx("desc-local")}>{event.descLocation}</p>
              </div>
              <div className="right">
                <Avatar src={event.iconLocation} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectLocal;
