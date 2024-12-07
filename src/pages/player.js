import { Fragment, useEffect, useRef } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

import "../style/pages/mobile.css";
import "../style/pages/switcher.css";
import "../style/pages/artView.css";
import "../style/pages/clockView.css";
import "../style/pages/timetable.css";
import "../style/pages/history.css";

import { stations } from "../App";
import NoSleep from "nosleep.js";
import ArtView from "../components/views/artView";
import TimetableView from "../components/views/timetableView";
import MobileView from "../components/views/mobileView";
import updateMedia from "../functions/UpdateMedia";
import fetchNowPlaying from "../functions/FetchNowPlaying";
import fetchSRDJ from "../functions/FetchSRDJ";
import Banners from "../components/banners";
import LowerBarNavigation from "../components/navigation/lowerBar";
import HistoryView from "../components/views/historyView";
import SwitcherView from "../components/views/switcherView";
import LowerBarNowPlayingV2 from "../components/nowPlaying/lowerBarV2";
import SettingsView from "../components/views/settingsView";
import ClockView from "../components/views/clockView";

var noSleep = new NoSleep();

export function Player(propsIn) {
  const [props, setProps] = useState({});
  const [params] = useSearchParams();
  const [dj, setDJ] = useState();
  const [djNext, setDJNext] = useState();
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
  const [date, setDate] = useState(new Date());
  const [isReloading, setIsReloading] = useState(false);
  const navigate = useNavigate();

  const audioRef = useRef(null);

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
    if (params.get("view") !== undefined) {
      document.body.classList.remove(...document.body.classList);
      document.body.classList.add(params.get("view"));
    } else {
      document.body.classList.remove(...document.body.classList);
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
      setNowPlaying,
      setDate,
      setDJNext,
      props.apiDJNext,
      djCount
    );
  }, [count, props, fetching, fetchCount, djCount]);

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

  useEffect(() => {
    if (
      audioRef.current.src === window.location.href ||
      !audioRef.current ||
      !audioRef.current.paused ||
      audioRef.current.paused === false ||
      state === "paused"
    ) {
      clearInterval(reload);
      return;
    }

    setIsReloading(true);

    setInterval(reload, 1500);

    async function reload() {
      if (
        state === "paused" ||
        audioRef.current.src === window.location.href ||
        audioRef.current.src !== audioUrlState ||
        (audioRef.current &&
          audioRef.current.paused === false &&
          audioRef.current.played.length === 1)
      ) {
        clearInterval(reload);
        setIsReloading(false);
        return;
      }

      console.log(audioRef.current);

      setIsReloading(true);
      // console.log("timeout! reload" + isReloading);

      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.src = audioUrlState;
      audioRef.current.play();
    }

    return () => {
      clearInterval(reload);
    };
  }, [audioRef.current?.paused, state, isReloading, audioUrlState]);

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
      <Banners
        djSr={djSr}
        date={date}
        djNext={djNext}
        station={propsIn.station}
        isReloading={isReloading}
      />
      <ArtView
        nowPlaying={nowPlaying}
        state={state}
        setState={setState}
        noSleep={noSleep}
        showStations={showStations}
        audioUrl={props.audioUrl}
        setAudioUrlState={setAudioUrlState}
        station={props.station}
        dj={dj}
      />
      <ClockView
        nowPlaying={nowPlaying}
        state={state}
        setState={setState}
        noSleep={noSleep}
        showStations={showStations}
        audioUrl={props.audioUrl}
        setAudioUrlState={setAudioUrlState}
        station={props.station}
      />
      <TimetableView
        nowPlaying={nowPlaying}
        apiTimetableUrl={props.apiTimetableUrl}
        state={state}
        setState={setState}
        noSleep={noSleep}
        showStations={showStations}
        audioUrl={props.audioUrl}
        setAudioUrlState={setAudioUrlState}
        station={props.station}
      />
      <HistoryView
        nowPlaying={nowPlaying}
        state={state}
        setState={setState}
        noSleep={noSleep}
        showStations={showStations}
        audioUrl={props.audioUrl}
        setAudioUrlState={setAudioUrlState}
        station={props.station}
      />
      <SwitcherView station={props.station} setShowStations={setShowStations} />
      <SettingsView />

      <LowerBarNowPlayingV2
        nowPlaying={nowPlaying}
        state={state}
        setState={setState}
        noSleep={noSleep}
        showStations={showStations}
        audioUrl={props.audioUrl}
        setAudioUrlState={setAudioUrlState}
      />

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
        date={date}
        djNext={djNext}
      />
      <LowerBarNavigation station={props.station} />

      <audio
        src={audioUrlState}
        id="audioPlayer"
        autoPlay="autoplay"
        crossOrigin="anonymous"
        ref={audioRef}
      />
    </>
  );
}
