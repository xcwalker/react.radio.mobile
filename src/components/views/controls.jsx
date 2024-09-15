import { useSearchParams } from "react-router-dom";
import LowerBarNowPlaying from "../nowPlaying/lowerBar";
import Timetable from "../timetable/timetable";

export default function ControlView(props) {
  const [_params, setParams] = useSearchParams();

  return (
    <section id="controls">
      <div className="container">
        <Timetable apiTimetableUrl={props.apiTimetableUrl} />
        <LowerBarNowPlaying
          nowPlaying={props.nowPlaying}
          onClick={(e) => {
            e.preventDefault();
            setParams({});
          }}
        />
      </div>
    </section>
  );
}
