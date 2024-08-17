import { Fragment } from "react";
import { stations } from "../App";
import { Link } from "react-router-dom";

export default function Switcher(props) {
  return (
    <section id="switcher" tabIndex={-1}>
      <div className="container" tabIndex={-1}>
        <ul>
          {stations &&
            stations.map((item, index) => {
              const date = new Date();
              console.log(date.getMonth());
              if (
                item.season &&
                item.season === "christmas" &&
                date.getMonth() < 10
              )
                return <Fragment key={index} />;

              if (item.station === props.station)
                return (
                  <li key={index}>
                    <button
                      className="current"
                      title="Current Station"
                      onClick={() => {
                        props.setShowStations(false);
                      }}
                    >
                      <span className="indicator">Current Station</span>
                      {item.station &&
                        item.season === "christmas" &&
                        date.getMonth() >= 10 && (
                          <span className="indicator seasonal">Seasonal</span>
                        )}
                      <span>{item.station}</span>
                    </button>
                  </li>
                );

              return (
                <li key={index}>
                  <Link
                    to={
                      item.url +
                      (document.body.classList.contains("oled") ? "?oled" : "")
                    }
                    onClick={() => {
                      props.setShowStations(false);
                    }}
                  >
                    <span>{item.station}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
