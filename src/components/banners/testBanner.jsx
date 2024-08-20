export default function TestBanner(props) {
  return <>{process.env.REACT_APP_IS_DEBUG_BANNER && <div className={props.css.banner} style={{"--banner-color": "#fec224"}}>Test Banner</div>}</>;
}