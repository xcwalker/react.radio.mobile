import CrossfadeImage from "react-crossfade-image";
import { useSearchParams } from "react-router-dom";
import DJBar from "../dj";

export default function MobileNowPlaying(props) {
  const [params, setParams] = useSearchParams();
  return (
    <div className="item" id="live">
      {props?.nowPlaying?.art && (
        <CrossfadeImage
          src={props?.nowPlaying?.art}
          alt={
            "The artwork of " +
            props?.nowPlaying?.title +
            " by " +
            props?.nowPlaying?.artists
          }
          containerClass="background"
          style={{ width: "100%", height: "100%" }}
        />
      )}
      <div className="backdrop">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135.47 135.47">
          <path d="m0 0 45.155 45.155h45.156V90.31h45.155V45.155L90.311 0zm90.311 90.311L45.155 45.156v45.155l45.156 45.156h45.155zm-45.156 0L0 45.156v90.311h45.155z" />
        </svg>
      </div>
      {/* No Data */}
      {!(
        props?.nowPlaying?.title ||
        props?.nowPlaying?.artists ||
        props?.nowPlaying?.art
      ) && <span className="ident">{props.station}</span>}
      {/* Data */}
      {(props?.nowPlaying?.title ||
        props?.nowPlaying?.artists ||
        props?.nowPlaying?.art) && (
        <div className="info">
          <button
            onClick={(e) => {
              e.preventDefault();
              params.get("view") === "artView"
                ? setParams({})
                : setParams({ view: "artView" });
            }}
          >
            {props?.nowPlaying?.art && (
              <CrossfadeImage
                src={props?.nowPlaying?.art}
                alt={
                  "The artwork of " +
                  props.nowPlaying.title +
                  " by " +
                  props.nowPlaying.artists
                }
                containerClass="fix"
              />
            )}
          </button>
          {(props?.nowPlaying?.title || props?.nowPlaying?.artists) && (
            <div className="text">
              <span className="title">{props?.nowPlaying?.title}</span>
              <span className="subTitle">{props?.nowPlaying?.artists}</span>
            </div>
          )}
        </div>
      )}
      {(props.djCount === 0 ? props.oldDJ : props.dj) && (
        <DJBar
          avatar={props.djCount === 0 ? props.oldDJ.avatar : props.dj.avatar}
          displayName={
            props.djCount === 0 ? props.oldDJ.displayname : props.dj.displayname
          }
          details={props.djCount === 0 ? props.oldDJ.details : props.dj.details}
          djCount={props.djCount === 0 ? 1 : 0}
        />
      )}
      {(props.djCount === 0 ? props.dj : props.oldDJ) && (
        <DJBar
          avatar={props.djCount === 0 ? props.dj.avatar : props.oldDJ.avatar}
          displayName={
            props.djCount === 0 ? props.dj.displayname : props.oldDJ.displayname
          }
          details={props.djCount === 0 ? props.dj.details : props.oldDJ.details}
          djCount={props.djCount === 0 ? 0 : 1}
        />
      )}
    </div>
  );
}
