import { useSearchParams } from "react-router-dom";
import css from "../../style/components/navigation/lowerBar.module.css";

export default function LowerBarNavigation(props) {
  const [_params, setParams] = useSearchParams();
  return (
    <header className={css.lowerBar}>
      <nav className={css.container}>
        <ul>
          <button
            className={css.button}
            onClick={() => changePage("home", setParams)}
          >
            <svg viewBox="0 -960 960 960">
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
          </button>
          <button
            className={css.button}
            onClick={() => changePage("artview", setParams)}
          >
            <svg viewBox="0 -960 960 960">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
            </svg>
          </button>
          <button
            className={css.button}
            onClick={() => changePage("controls", setParams)}
          >
            <svg
              viewBox="0 -960 960 960"
            >
              <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
            </svg>
          </button>
          <button
            className={css.button}
            onClick={() => changePage("home", setParams)}
          ></button>
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

  if (page === "home") {
    setParams({});
  } else if (page === "home") {
    setParams({});
  } else if (page === "artview") {
    setParams({ artView: true });
  } else if (page === "controls") {
    setParams({ controls: true });
  } else {
    console.error("No page matching " + page);
  }
}
