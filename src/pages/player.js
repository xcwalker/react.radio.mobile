import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import "../style/pages/mobile.css";
import "../style/pages/switcher.css";

import { stations } from "../App";
import NoSleep from "nosleep.js";

var noSleep = new NoSleep();

export function Player(propsIn) {
  const [props, setProps] = useState({});
  const [params, setParams] = useSearchParams();
  const [dj, setDJ] = useState();
  const [oldDJ, setOldDJ] = useState();
  const [nowPlaying, setNowPlaying] = useState();
  const [ticking, setTicking] = useState(true);
  const [count, setCount] = useState(0);
  const [audioUrlState, setAudioUrlState] = useState("");
  const [state, setState] = useState("paused");
  const [showStations, setShowStations] = useState(false);
  const [stationIndex, setStationIndex] = useState();
  const [djCount, setDJCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (showStations === false) document.body.classList.remove("noscroll");
    if (showStations === true) document.body.classList.add("noscroll");
  }, [showStations]);

  useEffect(() => {
    setProps(propsIn);
    if (props !== propsIn) {
      setNowPlaying();
      setDJ();
    }
  }, [props, propsIn]);

  useEffect(() => {
    if (params.get("oled") !== null) {
      document.body.classList.add("oled");
    } else if (document.body.classList.contains("oled")) {
      document.body.classList.remove("oled");
    }
  }, [params]);

  useEffect(() => {
    fetch(props.apiUrl)
      .then(
        (data) => {
          data.json().then((res) => {
            let outNow = {};
            let outDJ = {};

            if (res?.now_playing?.title) {
              outNow.title = res?.now_playing?.title;
            } else if (res?.title) {
              outNow.title = res.title;
            } else if (res?.data?.title) {
              outNow.title = res.data.title;
            } else {
              outNow.title = "";
            }

            if (res?.now_playing?.artists) {
              outNow.artists = res?.now_playing?.artists;
            } else if (res?.artist) {
              outNow.artists = res.artist;
            } else if (res?.data?.artist) {
              outNow.artists = res.data.artist;
            } else {
              outNow.artists = "";
            }

            if (res?.now_playing?.art) {
              outNow.art = res?.now_playing?.art;
            } else if (res?.art?.large) {
              outNow.art = res.art.large;
            } else if (res?.data?.album_art) {
              outNow.art = res.data.album_art;
            } else {
              outNow.art = "";
            }

            if (!props.apiLive) {
              if (res?.djs?.now?.displayname) {
                outDJ.displayname = res.djs.now.displayname;
              }

              if (res?.djs?.now?.avatar) {
                outDJ.avatar = res.djs.now.avatar;
              }

              if (res?.djs?.now?.details) {
                outDJ.details = res.djs.now.details;
              }

              setDJ((dj) => {
                if (dj && (dj.displayname !== outDJ.displayname || dj.avatar !== outDJ.avatar || dj.details !== outDJ.details)) {
                  setDJCount((count) => (count === 0 ? 1 : 0));
                  setOldDJ(dj);
                }
                return outDJ;
              });
            } else {
              fetch(props.apiLive).then((data) => {
                data.json().then((res) => {
                  if (res?.data?.user?.name) {
                    outDJ.displayname = res.data.user.name;
                  }

                  if (res?.data?.image) {
                    outDJ.avatar = res.data.image;
                  }

                  if (res?.data?.description) {
                    outDJ.details = res.data.description;
                  }

                  setDJ((dj) => {
                    if (dj && (dj.displayname !== outDJ.displayname || dj.avatar !== outDJ.avatar || dj.details !== outDJ.details)) {
                      setDJCount((count) => (count === 0 ? 1 : 0));
                      setOldDJ(dj);
                    }
                    return outDJ;
                  });
                });
              });
            }

            setNowPlaying(outNow);
          });
        },
        (error) => {
          console.error(error);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }, [count, props]);

  useEffect(() => {
    const timer = setTimeout(() => ticking && setCount(count + 1), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [count, ticking]);

  function stop() {
    setAudioUrlState("");
    setState("paused");
    noSleep.disable();
    return;
  }

  useEffect(() => {
    if (state === "play") {
      setAudioUrlState(props.audioUrl);
    }
    stations.forEach((station, index) => {
      if (station.station === props.station) {
        setStationIndex(index);
      }
    });
    return;
  }, [state, props.audioUrl, props.station]);

  async function live() {
    var player = document.querySelector("#audioPlayer");

    if (audioUrlState === "") {
      setAudioUrlState(props.audioUrl);
    }

    setState("play");
    await player.load();
    player.play();
    noSleep.enable();
  }

  useEffect(() => {
    if (nowPlaying === undefined || audioUrlState === "") return;

    if ("mediaSession" in navigator) {
      if (count % 3 === 0 || (count - 1) % 3 === 0) {
        if (navigator.mediaSession.metadata?.title === dj?.details) return;
        navigator.mediaSession.metadata = new MediaMetadata({
          title: dj?.details ? dj?.details : props.station,
          artist: dj?.displayname ? dj?.displayname : "ReactRadio",
          album: props.station + " | ReactRadio",
          artwork: dj.avatar
            ? [{ src: !props.apiLive ? "https://simulatorradio.com/processor/avatar?size=256&name=" + dj.avatar : dj.avatar }]
            : [{ src: "http://mobile.reactradio.dev/apple-touch-icon.png?v=3" }],
        });
      } else {
        if (navigator.mediaSession.metadata?.title === nowPlaying.title) return;
        navigator.mediaSession.metadata = new MediaMetadata({
          title: nowPlaying.title ? nowPlaying.title : props.station,
          artist: nowPlaying.artists ? nowPlaying.artists : "ReactRadio",
          album: props.station + " | ReactRadio",
          artwork: nowPlaying.art ? [{ src: nowPlaying.art }] : [{ src: "http://mobile.reactradio.dev/apple-touch-icon.png?v=3" }],
        });
      }

      navigator.mediaSession.setActionHandler("play", async () => {
        var player = document.querySelector("#audioPlayer");

        if (audioUrlState === "") {
          setAudioUrlState(props.audioUrl);
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
  }, [nowPlaying, audioUrlState, props.audioUrl, navigate, props.station, stationIndex, count, dj]);

  return (
    <>
      <Helmet defer={false}>
        <meta name="twitter:title" content={props.station + " | ReactRadio"} />
        {state === "paused" && audioUrlState === "" && <title>{props.station + " | ReactRadio"}</title>}
        {state === "paused" && audioUrlState !== "" && (nowPlaying?.title || nowPlaying?.artists) && (
          <title>{nowPlaying?.title + " - " + nowPlaying?.artists + " | " + props.station + " | ReactRadio"}</title>
        )}
        {state === "play" && audioUrlState !== "" && (nowPlaying?.title || nowPlaying?.artists) && (
          <title>{nowPlaying?.title + " - " + nowPlaying?.artists + " | " + props.station + " | ReactRadio"}</title>
        )}
        <meta name="description" content={props.station + " on ReactRadio | A lightweight react based website for streaming radio."} />
        <meta name="twitter:description" content={props.station + " on ReactRadio | A lightweight react based website for streaming radio."} />
      </Helmet>
      <section id="mobile" onLoad={() => setTicking(true)}>
        {nowPlaying?.art && <img src={nowPlaying?.art} alt={"The artwork of " + nowPlaying?.title + " by " + nowPlaying?.artists} className="background" />}
        <ul className="container">
          <div className="item" id="live">
            {nowPlaying?.art && <img src={nowPlaying?.art} alt={"The artwork of " + nowPlaying?.title + " by " + nowPlaying?.artists} className="background" />}
            <div className="backdrop">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135.47 135.47">
                <path d="m0 0 45.155 45.155h45.156V90.31h45.155V45.155L90.311 0zm90.311 90.311L45.155 45.156v45.155l45.156 45.156h45.155zm-45.156 0L0 45.156v90.311h45.155z" />
              </svg>
            </div>
            {!(nowPlaying?.title || nowPlaying?.artists || nowPlaying?.art) && <span className="ident">{props.station}</span>}
            {(nowPlaying?.title || nowPlaying?.artists || nowPlaying?.art) && (
              <div className="info">
                {nowPlaying?.art && (
                  <img
                    src={nowPlaying?.art}
                    alt={"The artwork of " + nowPlaying?.title + " by " + nowPlaying?.artists}
                    onClick={() => {
                      params.get("oled") !== null ? setParams({}) : setParams({ oled: undefined });
                    }}
                  />
                )}
                {(nowPlaying?.title || nowPlaying?.artists) && (
                  <div className="text">
                    <span className="title">{nowPlaying?.title}</span>
                    <span className="subTitle">{nowPlaying?.artists}</span>
                  </div>
                )}
              </div>
            )}
            {(djCount === 0 ? oldDJ : dj) && (djCount === 0 ? oldDJ?.avatar : dj?.avatar) && (
              <div className="dj" data-count={djCount === 0 ? 0 : 1}>
                {(djCount === 0 ? oldDJ?.avatar : dj?.avatar) && !props.apiLive && (
                  <img
                    src={"https://simulatorradio.com/processor/avatar?size=256&name=" + (djCount === 0 ? oldDJ?.avatar : dj?.avatar)}
                    alt={(djCount === 0 ? oldDJ?.avatar : dj?.avatar) + "'s avatar"}
                    className="profilePicture"
                  />
                )}
                {(djCount === 0 ? oldDJ?.avatar : dj?.avatar) && props.apiLive && (
                  <img
                    src={djCount === 0 ? oldDJ?.avatar : dj?.avatar}
                    alt={(djCount === 0 ? oldDJ?.avatar : dj?.avatar) + "'s avatar"}
                    className="profilePicture"
                  />
                )}
                <div className="about">
                  <span className="title">{djCount === 0 ? oldDJ?.displayname : dj?.displayname}</span>
                  <ReactMarkdown className="subTitle">{djCount === 0 ? oldDJ?.details : dj?.details}</ReactMarkdown>
                </div>
              </div>
            )}
            {(djCount === 0 ? dj : oldDJ) && (djCount === 0 ? dj?.avatar : oldDJ?.avatar) && (
              <div className="dj" data-count={djCount === 0 ? 1 : 0}>
                {(djCount === 0 ? dj?.avatar : oldDJ?.avatar) && !props.apiLive && (
                  <img
                    src={"https://simulatorradio.com/processor/avatar?size=256&name=" + (djCount === 0 ? dj?.avatar : oldDJ?.avatar)}
                    alt={(djCount === 0 ? dj?.avatar : oldDJ?.avatar) + "'s avatar"}
                    className="profilePicture"
                  />
                )}
                {(djCount === 0 ? dj?.avatar : oldDJ?.avatar) && props.apiLive && (
                  <img
                    src={djCount === 0 ? dj?.avatar : oldDJ?.avatar}
                    alt={(djCount === 0 ? dj?.avatar : oldDJ?.avatar) + "'s avatar"}
                    className="profilePicture"
                  />
                )}
                <div className="about">
                  <span className="title">{djCount === 0 ? dj?.displayname : oldDJ?.displayname}</span>
                  <ReactMarkdown className="subTitle">{djCount === 0 ? dj?.details : oldDJ?.details}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
          <button className={"item " + state} onClick={() => live()} title="Live" id="liveBtn" tabIndex={showStations ? -1 : 0}>
            {state === "play" && (
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <circle cx="20" cy="12" r="2" />
                <circle cx="4" cy="12" r="2" />
                <circle cx="12" cy="20" r="2" />
                <path d="M10.05 8.59L6.03 4.55h-.01l-.31-.32-1.42 1.41 4.02 4.05.01-.01.31.32zm3.893.027l4.405-4.392L19.76 5.64l-4.405 4.393zM10.01 15.36l-1.42-1.41-4.03 4.01-.32.33 1.41 1.41 4.03-4.02zm9.75 2.94l-3.99-4.01-.36-.35L14 15.35l3.99 4.01.35.35z" />
                <circle cx="12" cy="4" r="2" />
              </svg>
            )}
            {state === "paused" && (
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
              </svg>
            )}
          </button>
          {state === "play" && (
            <button className="item" onClick={() => stop()} title="Stop" id="stopBtn" tabIndex={showStations ? -1 : 0}>
              <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24">
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
            </button>
          )}
          <button className="item" id="station" onClick={() => setShowStations(true)} tabIndex={showStations ? -1 : 0}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M20 6H8.3l8.26-3.34L15.88 1 3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.11-.89-2-2-2zm0 2v3h-2V9h-2v2H4V8h16zM4 20v-7h16v7H4z" />
              <circle cx="8" cy="16.48" r="2.5" />
            </svg>
            <div className="info">
              <span className="title">{props.station}</span>
              <span className="subTitle">Current Station</span>
            </div>
          </button>
          {/* <button
            onClick={() => {
              setDJCount((count) => (count === 0 ? 1 : 0));
            }}
          >
            test
          </button> */}
        </ul>
      </section>
      {showStations && <Switcher station={props.station} setShowStations={setShowStations} />}
      <audio src={audioUrlState} id="audioPlayer" autoPlay="autoplay" crossOrigin="anonymous" />
    </>
  );
}

function Switcher(props) {
  return (
    <section id="switcher" tabIndex={-1}>
      <div className="container" tabIndex={-1}>
        <ul>
          {stations &&
            stations.map((item, index) => {
              if (item.station === props.station)
                return (
                  <li key={index}>
                    <button
                      className="current"
                      title="Current Station"
                      onClick={() => {
                        props.setShowStations(false);
                      }}
                    >
                      <span className="indicator">Current Station</span>
                      <span>{item.station}</span>
                    </button>
                  </li>
                );
              return (
                <li key={index}>
                  <Link
                    to={item.url + (document.body.classList.contains("oled") ? "?oled" : "")}
                    onClick={() => {
                      props.setShowStations(false);
                    }}
                  >
                    {item.station}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
