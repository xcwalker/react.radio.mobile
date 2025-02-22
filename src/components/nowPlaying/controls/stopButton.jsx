import Button from "../../button";

export default function StopButton(props) {
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

  function stop() {
    props.setAudioUrlState("");
    props.setState("paused");
    props.noSleep.disable();
    return;
  }
  return (
    <>
      {props.state === "play" && (
        <Button
          className="stop"
          onClick={() => stop()}
          title="Stop"
          id="stopBtn"
          showStations={props.showStations}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g>
              <rect fill="none" height="24" />
            </g>
            <g>
              <g>
                <rect height="8" width="8" x="8" y="8" />
                <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8c0-4.41,3.59-8,8-8 s8,3.59,8,8C20,16.41,16.41,20,12,20z" />
              </g>
            </g>
          </svg>
        </Button>
      )}
    </>
  );
}
