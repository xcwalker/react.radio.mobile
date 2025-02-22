import CrossfadeImage from "react-crossfade-image";
import { useSearchParams } from "react-router-dom";
import LiveButton from "../nowPlaying/controls/liveButton";
import StopButton from "../nowPlaying/controls/stopButton";
import DJBar from "../dj";

export default function ArtView(props) {
  const [params, setParams] = useSearchParams();
  return (
    <section id="artView">
      <div className="container">
        <div className="image item">
          <button
            tabIndex={params.get("artView") === "true" ? 0 : -1}
            onClick={(e) => {
              e.preventDefault();
              params.get("view") === "artView"
                ? setParams({})
                : setParams({ view: "artView" });
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
        <div className="column">
          {props.dj && (
            <DJBar
              avatar={props.dj.avatar}
              displayName={props.dj.displayname}
              details={props.dj.details}
              djCount={0}
              className="item"
            />
          )}
          <div className="content item">
            {(props.nowPlaying?.title || props.nowPlaying?.artists) && (
              <>
                <span className="title">{props.nowPlaying?.title}</span>
                <span className="subTitle">{props.nowPlaying?.artists}</span>
              </>
            )}
          </div>
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
