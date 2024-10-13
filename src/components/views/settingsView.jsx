import { useAtom } from "jotai";
import { settingsAtom } from "../../App";
import "../../style/pages/settings.css";

export default function SettingsView(props) {
  const [_settings, setSettings] = useAtom(settingsAtom);

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
          <div className="selection">
            <button
              onClick={() => {
                setSetting("forceNavigationBarStyle", undefined);
              }}
            >
              Default
            </button>
            <button
              onClick={() => {
                setSetting("forceNavigationBarStyle", "DefaultLeft");
              }}
            >
              Default With Left
            </button>
            <button
              onClick={() => {
                setSetting("forceNavigationBarStyle", "Below");
              }}
            >
              Always Below
            </button>
            <button
              onClick={() => {
                setSetting("forceNavigationBarStyle", "Above");
              }}
            >
              Always Above
            </button>
            <button
              onClick={() => {
                setSetting("forceNavigationBarStyle", "Left");
              }}
            >
              Always Left
            </button>
            <button
              onClick={() => {
                setSetting("forceNavigationBarStyle", "Right");
              }}
            >
              Always Right
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
