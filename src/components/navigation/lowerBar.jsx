import { useSearchParams } from "react-router-dom";
import css from "../../style/components/navigation/lowerBar.module.css";
import { useAtomValue } from "jotai";
import { settingsAtom } from "../../App";

export default function LowerBarNavigation(props) {
  const [params, setParams] = useSearchParams();

  const settings = useAtomValue(settingsAtom);

  return (
    <header
      className={
        css.lowerBar + " SettingsIs" + settings?.forceNavigationBarStyle
      }
    >
      <nav className={css.container}>
        <ul>
          <button
            className={css.button + " " + !params.has("view")}
            onClick={() => changePage("home", setParams)}
          >
            <svg viewBox="0 -960 960 960">
              <path d="M160-80q-33 0-56.5-23.5T80-160v-480q0-25 13.5-45t36.5-29l506-206 26 66-330 134h468q33 0 56.5 23.5T880-640v480q0 33-23.5 56.5T800-80H160Zm0-80h640v-280H160v280Zm160-40q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29ZM160-520h480v-80h80v80h80v-120H160v120Zm0 360v-280 280Z" />
            </svg>
          </button>
          <button
            className={css.button + " " + params.has("view", "artView")}
            onClick={() => changePage("artview", setParams)}
          >
            <svg viewBox="0 -960 960 960">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
            </svg>
          </button>
          <button
            className={css.button + " " + params.has("view", "clockView")}
            onClick={() => changePage("clock", setParams)}
          >
            <svg viewBox="0 -960 960 960">
              <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
            </svg>
          </button>
          {props.station === "Simulator Radio" && (
            <>
              <button
                className={css.button + " " + params.has("view", "timetable")}
                onClick={() => changePage("timetable", setParams)}
              >
                <svg viewBox="0 -960 960 960">
                  <path d="M120-240q-33 0-56.5-23.5T40-320q0-33 23.5-56.5T120-400h10.5q4.5 0 9.5 2l182-182q-2-5-2-9.5V-600q0-33 23.5-56.5T400-680q33 0 56.5 23.5T480-600q0 2-2 20l102 102q5-2 9.5-2h21q4.5 0 9.5 2l142-142q-2-5-2-9.5V-640q0-33 23.5-56.5T840-720q33 0 56.5 23.5T920-640q0 33-23.5 56.5T840-560h-10.5q-4.5 0-9.5-2L678-420q2 5 2 9.5v10.5q0 33-23.5 56.5T600-320q-33 0-56.5-23.5T520-400v-10.5q0-4.5 2-9.5L420-522q-5 2-9.5 2H400q-2 0-20-2L198-340q2 5 2 9.5v10.5q0 33-23.5 56.5T120-240Z" />
                </svg>
              </button>
              <button
                className={css.button + " " + params.has("view", "history")}
                onClick={() => changePage("history", setParams)}
              >
                <svg viewBox="0 -960 960 960">
                  <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
                </svg>
              </button>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

function changePage(page, setParams) {
  if (!page) {
    console.error("No page provided");
    return;
  }

  switch (page) {
    case "home":
      setParams({});
      break;
    case "artview":
      setParams({ view: "artView" });
      break;
    case "clock":
      setParams({ view: "clockView" });
      break;
    case "timetable":
      setParams({ view: "timetable" });
      break;
    case "history":
      setParams({ view: "history" });
      break;
    default:
      console.error("No page matching " + page);
      break;
  }
}
