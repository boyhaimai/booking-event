import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { faClose, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./SearchAdress.module.scss";
import Avatar from "~/Components/Images/Avatar/Avatar";
import { Wrapper as PopperWrapper } from "~/Components/Popper";
import { useDebounce } from "~/hooks";

const cx = classNames.bind(styles);

function SearchAdress() {
  const navigate = useNavigate();
  const refInput = useRef();

  // const [locations, setLocations] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const debounced = useDebounce(searchValue, 500);

  // API thật
  useEffect(() => {
    if (!debounced) {
      setSearchResult([]);
      return;
    }
    fetch(`http://localhost:3000/api/tickets/search?q=${encodeURIComponent(debounced)}&type=location`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {          
          setSearchResult(res.data);
        }else{
          setSearchResult([]);
        }
      })
      .catch((err) =>{
        console.error('Error fetching', err);
        setSearchResult([]);
      })
  }, [debounced]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    refInput.current.focus();
  };

  const handleLocationSelect = (location) => {
    navigate("/", { state: { selectedLocation: location.location } });
  };

  const hanleHideResult = () => {
    setShowResult(false);
  };

  return (
    <div>
      <Tippy
        interactive={true}
        placement="bottom-start"
        visible={showResult && searchValue && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <div className={cx("wrapper-local")}>
                {/*API thật*/}
                {searchResult.map((result) => (
                  <div
                    className={cx("inner-local")}
                    key={result.id}
                    onClick={() => handleLocationSelect(result)}
                  >
                    <div className="left">
                      <h2 className={cx("title-local")}>{result.location}</h2>
                      <p className={cx("desc-local")}>{result.descLocation}</p>
                    </div>
                    <div className="right">
                      <Avatar src={result.iconLocation} />
                    </div>
                  </div>
                ))}
              </div>
            </PopperWrapper>
          </div>
        )}
        onClickOutside={hanleHideResult}
      >
        <div className={cx("input-data")}>
          <span className={cx("icon-location")}>
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
          <input
            ref={refInput}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.trimStart())}
            type="text"
            placeholder="Search event in..."
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && (
            <span className={cx("icon-clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faClose} />
            </span>
          )}
        </div>
      </Tippy>
    </div>
  );
}
export default SearchAdress;
