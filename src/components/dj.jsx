import { useSearchParams } from "react-router-dom";
import Button from "./button";
import ReactMarkdown from "react-markdown";

export default function DJBar(props) {
  const [params, setParams] = useSearchParams();

  return (
    <Button
      notItem={true}
      className="dj"
      data-count={props.djCount === 0 ? 1 : 0}
      onClick={(e) => {
        e.preventDefault();
        params.get("controls") !== null
          ? setParams({})
          : setParams({ controls: true });
      }}
    >
      <img
        src={props.avatar}
        alt={props.displayName + "'s avatar"}
        className="profilePicture"
      />
      <div className="about">
        <span className="title">{props.displayName}</span>
        <ReactMarkdown className="subTitle">{props.details}</ReactMarkdown>
      </div>
    </Button>
  );
}
