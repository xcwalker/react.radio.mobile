import CrossfadeImage from "react-crossfade-image";

import css from "../../style/components/nowPlaying/lowerBar.module.css";

export default function LowerBarNowPlaying(props) {
  return (
    <>
      {!props.onClick && <div className={css.lowerBar + " mainTransition"}>
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
      </div>}
      {props.onClick && <button className={css.lowerBar + " mainTransition"} onClick={props.onClick}>
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
      </button>}
    </>
  );
}
