import CrossfadeImage from "react-crossfade-image";

import css from "../../style/components/nowPlaying/lowerBar.module.css";
import LiveButton from "./controls/liveButton";
import StopButton from "../buttons/stop";

export default function LowerBarNowPlaying(props) {
  return (
    <>
      <div className={css.lowerBar + " mainTransition"}>
        <CrossfadeImage
          src={props.nowPlaying?.art}
          alt={
            "The artwork of " +
            props.nowPlaying?.title +
            " by " +
            props.nowPlaying?.artists
          }
          containerClass={css.image}
        />
        {(props.nowPlaying?.title || props.nowPlaying?.artists) && (
          <div className={css.text}>
            <span className={css.title}>{props.nowPlaying?.title}</span>
            <span className={css.subTitle}>{props.nowPlaying?.artists}</span>
          </div>
        )}
        <LiveButton
          state={props.state}
          setState={props.setState}
          noSleep={props.noSleep}
          showStations={props.showStations}
          audioUrl={props.audioUrl}
          setAudioUrlState={props.setAudioUrlState}
          placeholder={true}
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
    </>
  );
}
