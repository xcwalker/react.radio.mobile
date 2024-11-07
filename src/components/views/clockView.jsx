import CrossfadeImage from "react-crossfade-image";
import { useSearchParams } from "react-router-dom";
import LiveButton from "../nowPlaying/controls/liveButton";
import StopButton from "../nowPlaying/controls/stopButton";
import { useEffect, useState } from "react";

export default function ClockView(props) {
  const [params, setParams] = useSearchParams();
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const date = new Date();

    setDate(date);

    return () => {};
  }, [count]);

  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  return (
    <section id="clockView">
      <div className="container">
        <div className="clock">
          <span id="hour" className="time">
            {date.getHours().toString().padStart(2, "0")}
          </span>
          <div className="divider">:</div>
          <span id="minute" className="time">
            {date.getMinutes().toString().padStart(2, "0")}
          </span>
        </div>
        <div className="playing">
          <div className="fix">
            <button
              tabIndex={params.get("clockView") === "true" ? 0 : -1}
              onClick={(e) => {
                e.preventDefault();
                params.get("view") === "clockView"
                  ? setParams({})
                  : setParams({ view: "clockView" });
              }}
            >
              <CrossfadeImage
                src={props.nowPlaying?.art}
                alt={
                  "The artwork of " +
                  props.nowPlaying?.title +
                  " by " +
                  props.nowPlaying?.artists
                }
                containerClass="image"
                style={{ width: "100%", height: "100%" }}
              />
            </button>
          </div>
          <div className="content">
            {(props.nowPlaying?.title || props.nowPlaying?.artists) && (
              <div className="text">
                <span className="title">{props.nowPlaying?.title}</span>
                <span className="subTitle">{props.nowPlaying?.artists}</span>
              </div>
            )}
            <div className="controls">
              <LiveButton
                state={props.state}
                setState={props.setState}
                noSleep={props.noSleep}
                showStations={props.showStations}
                audioUrl={props.audioUrl}
                setAudioUrlState={props.setAudioUrlState}
              />
              <StopButton
                state={props.state}
                setState={props.setState}
                noSleep={props.noSleep}
                showStations={props.showStations}
                audioUrl={props.audioUrl}
                setAudioUrlState={props.setAudioUrlState}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
