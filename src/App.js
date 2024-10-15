import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import { Player } from "./pages/player";

import "./style/defaults/variables.css";
import "./style/defaults/page-setup.css";
import "./style/defaults/transitions.css";

import "./style/pages/lowerBar.css";
import { atomWithStorage } from "jotai/utils";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route
            path="/"
            element={<Navigate to="/station/simulator-radio" />}
          />
          <Route
            path="sr"
            element={<Navigate to="/station/simulator-radio" />}
          />
          <Route
            path="srrock"
            element={<Navigate to="/station/simulator-radio-rock" />}
          />
          <Route
            path="sr-rock"
            element={<Navigate to="/station/simulator-radio-rock" />}
          />
          <Route
            path="srdance"
            element={<Navigate to="/station/simulator-radio-dance" />}
          />
          <Route
            path="sr-dance"
            element={<Navigate to="/station/simulator-radio-dance" />}
          />
          <Route
            path="srxmas"
            element={<Navigate to="/station/simulator-radio-xmas" />}
          />
          <Route
            path="sr-xmas"
            element={<Navigate to="/station/simulator-radio-xmas" />}
          />

          <Route path="station">
            <Route
              path="simulator-radio"
              element={
                <Player
                  station="Simulator Radio"
                  audioUrl="https://simulatorradio.stream/320"
                  apiUrl="https://apiv2.simulatorradio.com/metadata/combined"
                  apiHistoryUrl="https://apiv2.simulatorradio.com/metadata/history?limit="
                  apiTimetableUrl="https://apiv2.simulatorradio.com/timetable?day="
                />
              }
            />
            <Route
              path="simulator-radio-rock"
              element={
                <Player
                  station="SR Rock"
                  audioUrl="https://simulatorradio.stream/rock"
                  apiUrl="https://apiv2.simulatorradio.com/rock/nowplaying"
                  apiHistoryUrl="https://apiv2.simulatorradio.com/rock/history?page=1&pagesize="
                />
              }
            />
            <Route
              path="simulator-radio-dance"
              element={
                <Player
                  station="SR Dance"
                  audioUrl="https://simulatorradio.stream/dance"
                  apiUrl="https://apiv2.simulatorradio.com/dance/nowplaying"
                  apiHistoryUrl="https://apiv2.simulatorradio.com/dance/history?page=1&pagesize="
                />
              }
            />
            <Route
              path="simulator-radio-xmas"
              element={
                <Player
                  station="SR Xmas"
                  audioUrl="https://simulatorradio.stream/xmas"
                  apiUrl="https://apiv2.simulatorradio.com/xmas/nowplaying"
                  apiHistoryUrl="https://apiv2.simulatorradio.com/xmas/history?page=1&pagesize="
                  season="christmas"
                  fallback="simulator-radio"
                />
              }
            />
            <Route
              path="truckers-fm"
              element={
                <Player
                  station="Truckers FM"
                  audioUrl="https://live.truckers.fm/"
                  apiUrl="https://radiocloud.pro/api/public/v1/song/current"
                  apiLive="https://radiocloud.pro/api/public/v1/presenter/live"
                  apiHistoryUrl="https://radiocloud.pro/api/public/v1/song/recent?limit="
                  apiDJNext="https://radiocloud.pro/api/public/v1/presenter/summary"
                />
              }
            />
            <Route
              path="srrock"
              element={<Navigate to="../simulator-radio-rock" />}
            />
            <Route
              path="sr-rock"
              element={<Navigate to="../simulator-radio-rock" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const stations = [
  {
    station: "Simulator Radio",
    url: "/station/simulator-radio",
  },
  {
    station: "SR Rock",
    url: "/station/simulator-radio-rock",
  },
  {
    station: "SR Dance",
    url: "/station/simulator-radio-dance",
  },
  {
    station: "SR Xmas",
    url: "/station/simulator-radio-xmas",
    season: "christmas",
  },
  {
    station: "Truckers FM",
    url: "/station/truckers-fm",
  },
];

export const settingsAtom = atomWithStorage("ReactRadioMobileSettings", {
  forceNavigationBarStyle: undefined,
});
