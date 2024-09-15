import { Fragment, useEffect, useState } from "react";
import TimetableDJItem from "./djItem";

import css from "../../style/components/timetable.module.css"

export default function Timetable(props) {
  const [displayDate, setDisplayDate] = useState(new Date());
  const [timetable, setTimetable] = useState();
  const [ticking, setTicking] = useState(true);
  const [count, setCount] = useState(0);
  const [dayIndex, setDayIndex] = useState(0);

  useEffect(() => {
    fetch(props.apiTimetableUrl + dayIndex).then(
      (data) => {
        data.json().then((res) => {
          setTimetable(res.slots);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, [count, dayIndex, props.apiTimetableUrl]);

  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 20000);
    return () => clearTimeout(timer);
  }, [count, ticking]);

  function addDay() {
    setDisplayDate(new Date(displayDate.setDate(displayDate.getDate() + 1)));
    setDayIndex(dayIndex + 1);
  }

  function removeDay() {
    setDisplayDate(new Date(displayDate.setDate(displayDate.getDate() - 1)));
    setDayIndex(dayIndex - 1);
  }

  return (
    <div className={css.container + " mainTransition"}>
      <div className={css.inline}>
        <button
          onClick={() => {
            removeDay();
          }}
          className="material-symbols-outlined"
        >
          remove
        </button>
        <h3>
          {displayDate.getDate()}{" "}
          {displayDate.toLocaleDateString("en-gb", { month: "short" })}{" "}
          {displayDate.getFullYear()}
        </h3>
        <button
          onClick={() => {
            addDay();
          }}
          className="material-symbols-outlined"
        >
          add
        </button>
      </div>
      <ul>
        {timetable &&
          timetable.map((slot, index) => {
            return (
              <Fragment key={index}>
                <TimetableDJItem slot={slot} css={css} />
              </Fragment>
            );
          })}
      </ul>
    </div>
  );
}
