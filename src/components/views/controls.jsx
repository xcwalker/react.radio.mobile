import { useSearchParams } from "react-router-dom";
import LowerBarNowPlaying from "../nowPlaying/lowerBar";
import Timetable from "../timetable/timetable";

export default function ControlView(props) {
  const [_params, setParams] = useSearchParams();

  return (
    <section id="controls">
      <div className="container">
        <Timetable apiTimetableUrl={props.apiTimetableUrl} />
        <button
          className="playing"
          onClick={(e) => {
            e.preventDefault();
            setParams({});
          }}
        >
          <LowerBarNowPlaying nowPlaying={props.nowPlaying} />
        </button>
      </div>
    </section>
  );
}
