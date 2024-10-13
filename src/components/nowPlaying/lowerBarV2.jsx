import LowerBarNowPlaying from "./lowerBar";

export default function LowerBarNowPlayingV2(props) {
  return (
    <section id="lowerBarNowPlaying">
      <LowerBarNowPlaying
        nowPlaying={props.nowPlaying}
        state={props.state}
        setState={props.setState}
        noSleep={props.noSleep}
        showStations={props.showStations}
        audioUrl={props.audioUrl}
        setAudioUrlState={props.setAudioUrlState}
      />
    </section>
  );
}