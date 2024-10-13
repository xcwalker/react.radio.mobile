import LowerBarNowPlaying from "../nowPlaying/lowerBar";
import Timetable from "../timetable/timetable";

export default function TimetableView(props) {
  return (
    <section id="timetable">
      {props.station === "Simulator Radio" && (
        <div className="container">
          <Timetable apiTimetableUrl={props.apiTimetableUrl} />
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
          This Station Doesn't Support The Timetable
        </div>
      )}
    </section>
  );
}
