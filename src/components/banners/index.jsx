import { Link } from "react-router-dom";

import css from "../../style/components/banners.module.css";
import TestBanner from "./testBanner";
import BigTop30Banner from "./bigTop30Banner";
import UpNextBanner from "./upNextBanner";

export default function Banners(props) {
  return (
    <div className={css.container}>
      <BigTop30Banner css={css} djSr={props.djSr} />
      <UpNextBanner css={css} date={props.date} djNext={props.djNext} />
      <TestBanner css={css} />
    </div>
  );
}
