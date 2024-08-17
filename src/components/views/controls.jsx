import CrossfadeImage from "react-crossfade-image";

export default function ControlView(props) {
  return (
    <section id="controls">
      <div className="container">
        <div className="playing">
          <CrossfadeImage
            src={props.nowPlaying?.art}
            alt={
              "The artwork of " +
              props.nowPlaying?.title +
              " by " +
              props.nowPlaying?.artists
            }
            containerClass="image"
          />
          {(props.nowPlaying?.title || props.nowPlaying?.artists) && (
            <div className="text">
              <span className="title">{props.nowPlaying?.title}</span>
              <span className="subTitle">{props.nowPlaying?.artists}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}