import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import {
  faClose,
  faLocationDot,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./SearchEvent.module.scss";
import * as searchEventService from "~/service/searchEventService";

import { useDebounce } from "~/hooks";
import { Wrapper as PopperWrapper } from "~/Components/Popper";
import Image from "~/Components/Images/Image";
import Button from "~/Components/Buttons/Button";

const cx = classNames.bind(styles);

function SearchEvent() {
  const refInput = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounced) {
      return;
    }
    const fetchAPI = async () => {
      const resultEvent = await searchEventService.searchEventService(
        debounced
      );
      
      console.log(resultEvent,"search result ");
      if (resultEvent.success && resultEvent.data) {
        setSearchResult(resultEvent.data);
        
      } else {
        setSearchResult([]);
      }
    };

    fetchAPI();
  }, [debounced]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    refInput.current.focus();
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
                {searchResult.map((result) => (
                  <div className={cx("upcoming-event")} key={result.id}>
                    <div className={cx("item-left")}>
                      <Image
                        className={cx("img-ticket")}
                        src={result.imageTicket}
                        alt=""
                      />
                      <div className={cx("calendar")}>
                        <p className={cx("date")}>{result.date}</p>
                        <p className={cx("month")}>{result.month}</p>
                      </div>
                    </div>
                    <div className={cx("item-right")}>
                      <h2 className={cx("title-ticket")}>{result.title}</h2>
                      <div className={cx("desc-ticket")}>
                        <span className={cx("place")}>
                          <span className={cx("icon-place")}>
                            <FontAwesomeIcon icon={faLocationDot} />
                          </span>
                          <span className={cx("title-place")}>
                            {result.location}
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
            </PopperWrapper>
          </div>
        )}
        onClickOutside={hanleHideResult}
      >
        <div className={cx("input-data")}>
          <span className={cx("icon-location")}>
            <FontAwesomeIcon icon={faSearch} />
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
export default SearchEvent;
