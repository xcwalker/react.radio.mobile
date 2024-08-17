import Button from "../button";

export default function LiveButton(props) {
  async function live() {
    var player = document.querySelector("#audioPlayer");

    if (props.audioUrlState === "") {
      props.setAudioUrlState(props.audioUrl);
    }

    if (!player.paused) {
      await player.load();
    }
    props.setState("play");
    player.play();

    props.noSleep.enable();
  }

  return (
    <Button
      className={props.state}
      onClick={() => live()}
      title="Live"
      id="liveBtn"
      showStations={props.showStations}
    >
      {props.state === "play" && (
        <svg viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <circle cx="20" cy="12" r="2" />
          <circle cx="4" cy="12" r="2" />
          <circle cx="12" cy="20" r="2" />
          <path d="M10.05 8.59L6.03 4.55h-.01l-.31-.32-1.42 1.41 4.02 4.05.01-.01.31.32zm3.893.027l4.405-4.392L19.76 5.64l-4.405 4.393zM10.01 15.36l-1.42-1.41-4.03 4.01-.32.33 1.41 1.41 4.03-4.02zm9.75 2.94l-3.99-4.01-.36-.35L14 15.35l3.99 4.01.35.35z" />
          <circle cx="12" cy="4" r="2" />
        </svg>
      )}
      {props.state === "paused" && (
        <svg viewBox="0 0 24 24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
        </svg>
      )}
    </Button>
  );
}
