import CrossfadeImage from "react-crossfade-image";
import { useSearchParams } from "react-router-dom";
import LiveButton from "../nowPlaying/controls/liveButton";
import StopButton from "../nowPlaying/controls/stopButton";

export default function ArtView(props) {
  const [params, setParams] = useSearchParams();
  return (
    <section id="artView">
      <div className="container">
        <div className="fix">
          <button
            tabIndex={params.get("artView") === "true" ? 0 : -1}
            onClick={(e) => {
              e.preventDefault();
              params.get("artView") !== null
                ? setParams({})
                : setParams({ artView: true });
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
    </section>
  );
}
