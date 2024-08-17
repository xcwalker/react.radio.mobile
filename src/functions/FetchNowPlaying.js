export default function fetchNowPlaying(
  fetching,
  setFetching,
  fetchCount,
  setFetchCount,
  count,
  apiUrl,
  apiLive,
  setDJ,
  setDJCount,
  setOldDJ,
setNowPlaying
) {
  if (fetching || fetchCount === count) return;
  setFetching(true);
  fetch(apiUrl)
    .then(
      (data) => {
        data.json().then((res) => {
          let outNow = {};
          let outDJ = {};

          if (res?.now_playing?.title) {
            outNow.title = res?.now_playing?.title;
          } else if (res?.title) {
            outNow.title = res.title;
          } else if (res?.data?.title) {
            outNow.title = res.data.title;
          } else {
            outNow.title = "";
          }

          if (res?.now_playing?.artists) {
            outNow.artists = res?.now_playing?.artists;
          } else if (res?.artist) {
            outNow.artists = res.artist;
          } else if (res?.data?.artist) {
            outNow.artists = res.data.artist;
          } else {
            outNow.artists = "";
          }

          if (res?.now_playing?.art) {
            outNow.art = res?.now_playing?.art;
          } else if (res?.art?.large) {
            outNow.art = res.art.large;
          } else if (res?.data?.album_art) {
            outNow.art = res.data.album_art;
          } else {
            outNow.art = "";
          }

          if (!apiLive) {
            if (res?.djs?.now?.displayname) {
              outDJ.displayname = res.djs.now.displayname;
            }

            if (res?.djs?.now?.avatar) {
              outDJ.avatar =
                "https://simulatorradio.com/processor/avatar?size=256&name=" +
                res.djs.now.avatar;
            }

            if (res?.djs?.now?.details) {
              outDJ.details = res.djs.now.details;
            }

            setDJ((dj) => {
              if (
                dj &&
                (dj.displayname !== outDJ.displayname ||
                  dj.avatar !== outDJ.avatar ||
                  dj.details !== outDJ.details)
              ) {
                setDJCount((count) => (count === 0 ? 1 : 0));
                setOldDJ(dj);
              }
              return outDJ;
            });
          } else {
            fetch(apiLive).then((data) => {
              data.json().then((res) => {
                if (res?.data?.user?.name) {
                  outDJ.displayname = res.data.user.name;
                }

                if (res?.data?.image) {
                  outDJ.avatar = res.data.image;
                }

                if (res?.data?.description) {
                  outDJ.details = res.data.description;
                }

                setDJ((dj) => {
                  if (
                    dj &&
                    (dj.displayname !== outDJ.displayname ||
                      dj.avatar !== outDJ.avatar ||
                      dj.details !== outDJ.details)
                  ) {
                    setDJCount((count) => (count === 0 ? 1 : 0));
                    setOldDJ(dj);
                  }
                  return outDJ;
                });
              });
            });
          }

          setNowPlaying(outNow);
        });
      },
      (error) => {
        console.error(error);
      }
    )
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setFetching(false);
      setFetchCount(count);
    });
}
