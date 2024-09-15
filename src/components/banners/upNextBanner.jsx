
export default function UpNextBanner(props) {
  return (
    <>
      {props.djNext &&
        (props.date.getMinutes() >= 50 ||
          process.env.REACT_APP_IS_DEBUG_ALL_BANNERS !== "false") && (
          <div className={props.css.banner} style={{ "--banner-color": "red" }}>
            Up next • {props.djNext.details.replace(".", "")} •{" "}
            {props.djNext.displayname}
          </div>
        )}
    </>
  );
}
