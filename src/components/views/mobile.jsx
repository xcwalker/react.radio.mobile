import CrossfadeImage from "react-crossfade-image";
import { Link } from "react-router-dom";
import LiveButton from "../buttons/live";
import StopButton from "../buttons/stop";
import SwitcherButton from "../buttons/switcher";
import MobileNowPlaying from "../nowPlaying/mobile";

export default function MobileView(props) {

  return (
    <section id="mobile" onLoad={() => props.setTicking(true)}>
      {props.djSr?.displayname === "BigTop30" &&
        props.station !== "Simulator Radio" && (
          <Link to={"/station/simulator-radio"} className="banner">
            BigTop30 Now Live On Simulator Radio
          </Link>
        )}
      {props.nowPlaying?.art && (
        <CrossfadeImage
          src={props.nowPlaying?.art}
          alt={
            "The artwork of " +
            props.nowPlaying?.title +
            " by " +
            props.nowPlaying?.artists
          }
          containerClass="background animated"
          style={{ width: "100%", height: "100%" }}
        />
      )}
      <ul className="container">
        <MobileNowPlaying
          nowPlaying={props.nowPlaying}
          djCount={props.djCount}
          oldDJ={props.oldDJ}
          dj={props.dj}
        />
        <LiveButton
          state={props.state}
          setState={props.setState}
          noSleep={props.noSleep}
          showStations={props.showStations}
          audioUrl={props.audioUrl}
          setAudioUrlState={props.setAudioUrlState}
        />
        <StopButton
          setAudioUrlState={props.setAudioUrlState}
          state={props.state}
          setState={props.setState}
          noSleep={props.noSleep}
          showStations={props.showStations}
        />
        <SwitcherButton
          setShowStations={props.setShowStations}
          showStations={props.showStations}
          station={props.station}
        />
      </ul>
    </section>
  );
}
