import { useSearchParams } from "react-router-dom";
import Button from "./button";
import ReactMarkdown from "react-markdown";

export default function DJBar(props) {
  const [params, setParams] = useSearchParams();

  return (
    <Button
      notItem={true}
      className="dj"
      dataCount={props.djCount === 0 ? 1 : 0}
      onClick={(e) => {
        e.preventDefault();

        params.get("view") === "settings"
          ? setParams({})
          : setParams({ view: "settings" });
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
