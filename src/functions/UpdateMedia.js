import { stations } from "../App";

export default function updateMedia(
  nowPlaying,
  dj,
  count,
  audioUrlState,
  setAudioUrlState,
  setState,
  station,
  noSleep,
  audioUrl,
  stationIndex,
  navigate
) {

  if (nowPlaying === undefined || audioUrlState === "") return;

  if ("mediaSession" in navigator) {
    if (count % 5 === 0 || (count - 1) % 5 === 0) {
      if (navigator.mediaSession.metadata?.title === dj?.details) return;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: dj?.details ? dj?.details : station,
        artist: dj?.displayname ? dj?.displayname : "ReactRadio",
        album: station + " | ReactRadio",
        artwork: dj.avatar
          ? [
              {
                src: dj.avatar,
              },
            ]
          : [
              {
                src: "http://mobile.reactradio.dev/apple-touch-icon.png?v=3",
              },
            ],
        duration: Infinity,
      });
    } else {
      if (navigator.mediaSession.metadata?.title === nowPlaying.title) return;
      navigator.mediaSession.metadata = new MediaMetadata({
        title: nowPlaying.title ? nowPlaying.title : station,
        artist: nowPlaying.artists ? nowPlaying.artists : "ReactRadio",
        album: station + " | ReactRadio",
        artwork: nowPlaying.art
          ? [{ src: nowPlaying.art }]
          : [
              {
                src: "http://mobile.reactradio.dev/apple-touch-icon.png?v=3",
              },
            ],
        duration: Infinity,
      });
    }

    navigator.mediaSession.setActionHandler("play", async () => {
      var player = document.querySelector("#audioPlayer");

      if (audioUrlState === "") {
        setAudioUrlState(audioUrl);
      }

      setState("play");
      await player.load();
      player.play();
      noSleep.enable();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      setState("paused");
      document.querySelector("#audioPlayer").pause();
      noSleep.disable();
    });

    navigator.mediaSession.setActionHandler("previoustrack", async () => {
      if (stationIndex - 1 < 0) {
        navigate(stations[stations.length - 1].url);
      } else {
        navigate(stations[stationIndex - 1].url);
      }
    });

    navigator.mediaSession.setActionHandler("nexttrack", async () => {
      if (stationIndex + 1 > stations.length - 1) {
        navigate(stations[0].url);
      } else {
        navigate(stations[stationIndex + 1].url);
      }
    });
  }
}
