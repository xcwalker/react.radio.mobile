export default function fetchSRHistory(station, limit, setHistory) {
  if (station === "Simulator Radio") return;

  fetch(
    "https://apiv2.simulatorradio.com/metadata/history?limit=" + limit
  ).then(
    (data) => {
      data.json().then((res) => {
        if (res.length) {
          setHistory(res);
        } else if (res?.data) {
          setHistory(res.data);
        }
      });
    },
    (error) => {
      console.error(error);
    }
  );
}
