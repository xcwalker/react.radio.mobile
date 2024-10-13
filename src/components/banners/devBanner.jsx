import css from "../../style/components/banner/developmentBanner.module.css"

export default function DevBanner(props) {
  return (
    <>
      {process.env.REACT_APP_IS_DEVELOPMENT_BUILD === "true" && (
        <div
          className={props.css.banner + " " + css.developmentBanner}
          style={{ "--banner-color": "#ff8f00" }}
        >
          Development Build
        </div>
      )}
    </>
  );
}