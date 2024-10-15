import css from "../../style/components/banners.module.css";
import TestBanner from "./testBanner";
import BigTop30Banner from "./bigTop30Banner";
import UpNextBanner from "./upNextBanner";
import DevBanner from "./devBanner";
import ReloadingBanner from "./reloadingBanner";

export default function Banners(props) {
  return (
    <div className={css.container}>
      <BigTop30Banner css={css} djSr={props.djSr} station={props.station} />
      <UpNextBanner css={css} date={props.date} djNext={props.djNext} />
      <TestBanner css={css} />
      <DevBanner css={css} />
      <ReloadingBanner css={css} isReloading={props.isReloading} />
    </div>
  );
}
