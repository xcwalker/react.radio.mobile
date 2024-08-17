import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

import "../style/pages/mobile.css";
import "../style/pages/switcher.css";
import "../style/pages/artView.css";
import "../style/pages/controls.css";

import { stations } from "../App";
import NoSleep from "nosleep.js";
import ArtView from "../components/views/artView";
import ControlView from "../components/views/controls";
import MobileView from "../components/views/mobile";
import Switcher from "../components/switcher";
import updateMedia from "../functions/UpdateMedia";
import fetchNowPlaying from "../functions/FetchNowPlaying";
import fetchSRDJ from "../functions/FetchSRDJ";

var noSleep = new NoSleep();

export function Player(propsIn) {
  const [props, setProps] = useState({});
  const [params] = useSearchParams();
  const [dj, setDJ] = useState();
  const [oldDJ, setOldDJ] = useState();
  const [djSr, setDJSr] = useState();
  const [nowPlaying, setNowPlaying] = useState();
  const [ticking, setTicking] = useState(true);
  const [count, setCount] = useState(0);
  const [audioUrlState, setAudioUrlState] = useState("");
  const [state, setState] = useState("paused");
  const [showStations, setShowStations] = useState(false);
  const [stationIndex, setStationIndex] = useState();
  const [djCount, setDJCount] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const navigate = useNavigate();

  // no scroll
  useEffect(() => {
    if (showStations === false) document.body.classList.remove("noscroll");
    if (showStations === true) document.body.classList.add("noscroll");
  }, [showStations]);

  // sets props
  useEffect(() => {
    setProps(propsIn);
    if (props !== propsIn) {
    }
  }, [props, propsIn]);

  // enables different views
  useEffect(() => {
    if (params.get("artView") === "true") {
      document.body.classList.add("artView");
    } else if (document.body.classList.contains("artView")) {
      document.body.classList.remove("artView");
    }

    if (params.get("controls") === "true") {
      document.body.classList.add("controls");
    } else if (document.body.classList.contains("controls")) {
      document.body.classList.remove("controls");
    }
  }, [params]);

  // fetches nowPlaying
  useEffect(() => {
    fetchNowPlaying(
      fetching,
      setFetching,
      fetchCount,
      setFetchCount,
      count,
      props.apiUrl,
      props.apiLive,
      setDJ,
      setDJCount,
      setOldDJ,
      setNowPlaying
    );
  }, [count, props, fetching, fetchCount]);

  useEffect(() => {
    // update timer
    const timer = setTimeout(() => ticking && setCount(count + 1), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [count, ticking]);

  // fetches dj if not on sr - BT30 Check
  useEffect(() => {
    fetchSRDJ(props.station, setDJSr);
  }, [count, props.station]);

  // sets station index
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

  // sets device media information
  useEffect(() => {
    updateMedia(
      nowPlaying,
      dj,
      count,
      audioUrlState,
      setAudioUrlState,
      setState,
      props.station,
      noSleep,
      props.audioUrl,
      stationIndex,
      navigate
    );
  }, [
    nowPlaying,
    audioUrlState,
    props.audioUrl,
    props.apiLive,
    navigate,
    props.station,
    stationIndex,
    count,
    dj,
  ]);

  const date = new Date();

  return (
    <>
      {props.season && props.season === "christmas" && date.getMonth() < 10 && (
        <Navigate to={"/station/" + props.fallback} />
      )}
      <Helmet defer={false}>
        <meta name="twitter:title" content={props.station + " | ReactRadio"} />
        {state === "paused" && audioUrlState === "" && (
          <title>{props.station + " | ReactRadio"}</title>
        )}
        {state === "paused" &&
          audioUrlState !== "" &&
          (nowPlaying?.title || nowPlaying?.artists) && (
            <title>
              {nowPlaying?.title +
                " - " +
                nowPlaying?.artists +
                " | " +
                props.station +
                " | ReactRadio"}
            </title>
          )}
        {state === "play" &&
          audioUrlState !== "" &&
          (nowPlaying?.title || nowPlaying?.artists) && (
            <title>
              {nowPlaying?.title +
                " - " +
                nowPlaying?.artists +
                " | " +
                props.station +
                " | ReactRadio"}
            </title>
          )}
        <meta
          name="description"
          content={
            props.station +
            " on ReactRadio | A lightweight react based website for streaming radio."
          }
        />
        <meta
          name="twitter:description"
          content={
            props.station +
            " on ReactRadio | A lightweight react based website for streaming radio."
          }
        />
      </Helmet>
      <ArtView nowPlaying={nowPlaying} />
      <ControlView nowPlaying={nowPlaying} />

      <MobileView
        nowPlaying={nowPlaying}
        setTicking={setTicking}
        djSr={djSr}
        station={props.station}
        djCount={djCount}
        oldDJ={oldDJ}
        dj={dj}
        apiLive={props.apiLive}
        state={state}
        setState={setState}
        noSleep={noSleep}
        showStations={showStations}
        audioUrl={props.audioUrl}
        setAudioUrlState={setAudioUrlState}
        setShowStations={setShowStations}
      />

      {showStations && (
        <Switcher station={props.station} setShowStations={setShowStations} />
      )}
      <audio
        src={audioUrlState}
        id="audioPlayer"
        autoPlay="autoplay"
        crossOrigin="anonymous"
      />
    </>
  );
}
