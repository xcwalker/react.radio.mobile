export default function HistoryItem(props) {
  return (
    <li>
      <img src={props.slot.art} alt="" />
      <div className={props.css.info}>
        <span className={props.css.title}>{props.slot.title}</span>
        <span className={props.css.subTitle}>{props.slot.artists}</span>
      </div>
      <span className={props.css.playedBy}>{props.slot.by}</span>
    </li>
  );
}
