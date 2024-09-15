export default function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className={(props?.notItem ? "" : "item ") + props.className}
      id={props.id}
      tabIndex={props.showStations ? -1 : 0}
      title={props.title}
      data-count={props.dataCount}
    >
      {props.children}
    </button>
  );
}
