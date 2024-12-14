import { Fragment, useEffect, useState } from "react";
import TimetableDJItem from "./historyItem";

import css from "../../style/components/history.module.css";
import fetchSRHistory from "../../functions/FetchSRHistory";

export default function History(props) {
  const [history, setHistory] = useState();
  const [ticking, _setTicking] = useState(true);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchSRHistory(props.station, limit, setHistory, signal);

    return () => {
      controller.abort();
    }
  }, [props.station, count, limit]);

  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 20000);
    return () => clearTimeout(timer);
  }, [count, ticking]);

  return (
    <div className={css.container + " mainTransition"}>
      <div className={css.inline}>
        <button
          onClick={() => {
            setLimit((v) => Math.max(v - 5, 5));
          }}
          className="material-symbols-outlined"
        >
          remove
        </button>
        <h3>History • {limit}</h3>
        <button
          onClick={() => {
            setLimit((v) => Math.min(v + 5, 100));
          }}
          className="material-symbols-outlined"
        >
          add
        </button>
      </div>
      <ul>
        {history &&
          history.map((slot, index) => {
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
