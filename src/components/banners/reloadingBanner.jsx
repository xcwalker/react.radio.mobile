export default function ReloadingBanner(props) {
  return (
    <>
      {(props.isReloading ||
        process.env.REACT_APP_IS_DEBUG_ALL_BANNERS !== "false") && (
        <div className={props.css.banner} style={{ "--banner-color": "red" }}>
          Reloading
        </div>
      )}
    </>
  );
}
