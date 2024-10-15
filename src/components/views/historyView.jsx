import History from "../history/history";
import LowerBarNowPlaying from "../nowPlaying/lowerBar";

export default function HistoryView(props) {
  return (
    <section id="history">
      {props.station === "Simulator Radio" && (
        <div className="container">
          <History />
          {/* <LowerBarNowPlaying
            nowPlaying={props.nowPlaying}
            state={props.state}
            setState={props.setState}
            noSleep={props.noSleep}
            showStations={props.showStations}
            audioUrl={props.audioUrl}
            setAudioUrlState={props.setAudioUrlState}
          /> */}
        </div>
      )}
      {props.station !== "Simulator Radio" && (
        <div className="error mainTransition">
          This Station Doesn't Support History
        </div>
      )}
    </section>
  );
}
