export default function fetchSRDJ(station, setDJSr) {
  if (station === "Simulator Radio") return;

  fetch("https://apiv2.simulatorradio.com/metadata/combined").then(
    (data) => {
      data.json().then((res) => {
        if (process.env.REACT_APP_IS_DEBUG === "true") console.log(res);

        let outDJ = {};

        if (res?.djs?.now?.displayname) {
          outDJ.displayname = res.djs.now.displayname;
        }

        if (res?.djs?.now?.avatar) {
          outDJ.avatar = res.djs.now.avatar;
        }

        if (res?.djs?.now?.details) {
          outDJ.details = res.djs.now.details;
        }

        setDJSr((dj) => {
          return outDJ;
        });
      });
    },
    (error) => {
      console.error(error);
    }
  );
}
