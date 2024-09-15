import { Link } from "react-router-dom";

export default function BigTop30Banner(props) {
  return (
    <>
      {(props.djSr?.displayname === "BigTop30" ||
        process.env.REACT_APP_IS_DEBUG_ALL_BANNERS === "true") &&
        props.station !== "Simulator Radio" && (
          <Link to={"/station/simulator-radio"} className={props.css.banner} style={{"--banner-color": "darkblue"}}>
            BigTop30 Now Live On Simulator Radio
          </Link>
        )}
    </>
  );
}
