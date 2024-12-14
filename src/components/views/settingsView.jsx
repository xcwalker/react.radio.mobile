import { useAtom } from "jotai";
import { settingsAtom } from "../../App";
import "../../style/pages/settings.css";

export default function SettingsView(props) {
  const [settings, setSettings] = useAtom(settingsAtom);

  function setSetting(setting, newValue) {
    setSettings((prev) => {
      const item = { ...prev };
      item[setting] = newValue;
      return item;
    });
  }

  return (
    <section id="settings">
      <div className="container">
        <h1 className="mainTransition">Settings</h1>
        <div className="setting mainTransition">
          <span>Force Navigation Bar Position</span>
          <div className="navigationSelection">
            <div />
            <div
              className={
                "top indicator " +
                ((settings.forceNavigationBarStyle === "TopLeft" ||
                  settings.forceNavigationBarStyle === "Above" ||
                  settings.forceNavigationBarStyle === "TopRight") &&
                  "active")
              }
            />
            <div />
            <div
              className={
                "left indicator " +
                ((settings.forceNavigationBarStyle === "TopLeft" ||
                  settings.forceNavigationBarStyle === "Left" ||
                  settings.forceNavigationBarStyle === "DefaultLeft") &&
                  "active")
              }
            />
            <div className="center">
              <button
                onClick={() => {
                  setSetting("forceNavigationBarStyle", "TopLeft");
                }}
              >
                {/* Top & Left */}
              </button>
              <button
                onClick={() => {
                  setSetting("forceNavigationBarStyle", "Above");
                }}
              >
                {/* Above */}
              </button>
              <button
                onClick={() => {
                  setSetting("forceNavigationBarStyle", "TopRight");
                }}
              >
                {/* Top & Right */}
              </button>
              <button
                onClick={() => {
                  setSetting("forceNavigationBarStyle", "Left");
                }}
              >
                {/* Left */}
              </button>
              <div />
              <button
                onClick={() => {
                  setSetting("forceNavigationBarStyle", "Right");
                }}
              >
                {/* Right */}
              </button>
              <button
                onClick={() => {
                  setSetting("forceNavigationBarStyle", "DefaultLeft");
                }}
              >
                {/* Bottom & Left */}
              </button>
              <button
                onClick={() => {
                  setSetting("forceNavigationBarStyle", "Below");
                }}
              >
                {/* Below */}
              </button>
              <button
                onClick={() => {
                  setSetting("forceNavigationBarStyle", undefined);
                }}
              >
                {/* Bottom & Right */}
              </button>
            </div>
            <div
              className={
                "right indicator " +
                ((settings.forceNavigationBarStyle === "TopRight" ||
                  settings.forceNavigationBarStyle === "Right" ||
                  settings.forceNavigationBarStyle === undefined) &&
                  "active")
              }
            />
            <div />
            <div
              className={
                "bottom indicator " +
                ((settings.forceNavigationBarStyle === "DefaultLeft" ||
                  settings.forceNavigationBarStyle === "Below" ||
                  settings.forceNavigationBarStyle === undefined) &&
                  "active")
              }
            />
            <div />
          </div>
        </div>
      </div>
    </section>
  );
}
