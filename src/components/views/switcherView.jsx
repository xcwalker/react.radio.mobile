import { Fragment } from "react";
import { stations } from "../../App";
import { Link, useSearchParams } from "react-router-dom";

export default function SwitcherView(props) {
  const [_params, setParams] = useSearchParams();

  return (
    <section id="switcher" tabIndex={-1}>
      <div className="container" tabIndex={-1}>
        <ul>
          {stations &&
            stations.map((item, index) => {
              const date = new Date();
              if (
                item.season &&
                item.season === "christmas" &&
                date.getMonth() < 10
              )
                return <Fragment key={index} />;

              if (item.station === props.station)
                return (
                  <li key={index} className="mainTransition">
                    <button
                      className="current"
                      title="Current Station"
                      onClick={() => {
                        setParams({});
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
                <li key={index} className="mainTransition">
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
