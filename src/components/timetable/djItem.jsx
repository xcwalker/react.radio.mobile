import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function TimetableDJItem(props) {
  const [date, setDate] = useState();

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  useEffect(() => {
    if (!props.slot.slotstamp) return;

    setDate(new Date(props.slot.slotstamp * 1000));
  }, [props.slot]);

  return (
    <li>
      <img
        src={
          "https://simulatorradio.com/processor/avatar?size=256&name=" +
          props.slot.dj.avatar
        }
        alt=""
      />
      <div className={props.css.info}>
        <div className={props.css.inline}>
          <span className={props.css.title}>{props.slot.dj.display_name}</span>
          {date && (
            <span className={props.css.date}>
              {addZero(date.getHours())}:{addZero(date.getMinutes())} -{" "}
              {addZero(date.getHours() + 1)}:{addZero(date.getMinutes())}
            </span>
          )}
        </div>
        <ReactMarkdown className={props.css.subTitle}>
          {props.slot.details.toString()}
        </ReactMarkdown>
      </div>
    </li>
  );
}
