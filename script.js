const input = document.getElementById("search");
const searchBtn = document.getElementById("search__btn");
const videoBox = document.querySelector(".video__download");
const title = document.getElementById("title");
const videoDownload = document.getElementById("download");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "X-RapidAPI-Host": "youtube-video-download-info.p.rapidapi.com",
  },
};
let videoUrl;

//get video id of a video using this function
let getVideoId = (url) => {
  url.toLocaleLowerCase();
  return url.slice(url.indexOf("?v=") + 3, url.length);
};

searchBtn.addEventListener("click", searchVideo);
function searchVideo() {
  videoUrl = input.value;
  fetch(
    `https://youtube-video-download-info.p.rapidapi.com/dl?id=${getVideoId(
      videoUrl
    )}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("first", data);
      title.innerText = data.title;
      data.title;
      for (const key in data.link) {
        if (data.link.hasOwnProperty.call(data.link, key)) {
          const file = data.link[key];
          videoDownload.innerHTML += `<a href=${file[0]} target="_blank">Download<span>${file[3]}</span></a>`;
        }
      }
    })
    .catch((err) => console.error(err));
}
