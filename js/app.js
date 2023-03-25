import MEDIA from "./media.js";

document.addEventListener("DOMContentLoaded", function () {
  APP.init();
});

const APP = {
  audio: "",
  currentTrack: 0,
  shuffle: false,
  index: "",
  songs: [],
  percentage: 0,
  init: () => {
    APP.default();
    APP.buildSongs();
    APP.addListeners();
    APP.autoNext();

  },
  default: () => {document.getElementById(
          "album__art_full"
        ).innerHTML = `<div class="album_art__full"><img src="./img/large/${APP.songs[0]}" alt="full album art" />`;},
  addListeners: () => {
    document.getElementById("btnPrev").addEventListener("click", APP.previous);
    document.getElementById("btnNext").addEventListener("click", APP.next);
    document
      .getElementById("btnShuffle")
      .addEventListener("click", APP.shuffleOnOff);
    document.getElementById("btnPlay").addEventListener("click", APP.play);
  },

  buildSongs: () => {

    MEDIA.forEach((item) => {
      let newAudio = new Audio(`./media/${item.track}`);
      function findAudio() {
        let duration = newAudio.duration;
        let minutes = Math.floor(duration / 60);
        let seconds = Math.ceil(duration % 60);
        APP.songs.push({
          album: `${item.large}`,
          artist: `${item.artist}`,
          title: `${item.title}`,
          thumbnail: `${item.thumbnail}`,
          track: `${item.track}`,
          duration: duration,
          minutes: minutes,
          seconds: seconds,
          durationString: `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
        });

        let playlist = document.getElementById("playlist");
        let durationString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        playlist.innerHTML += `<li class="track__item" id="track__item">
        <div class="track__thumb">
          <img src="./img/small/${item.thumbnail}" alt="artist album art thumbnail" />
        </div>
        <div class="track__details">
          <p class="track__title">${item.title}</p>
          <p class="track__artist">${item.artist}</p>
        </div>
        <div class="track__time">
          <time id="playlistItem" datetime="">${durationString}</time>
        </div>
      </li>`;

        APP.getClickedIndex();
      }
      newAudio.addEventListener("canplaythrough", findAudio);
    });
    document.getElementById(
          "album__art_full"
        ).innerHTML = `<div class="album_art__full"><img src="./img/baby-dancing-baby.gif" alt="full album art" />`;

  },
  getClickedIndex: () => {
    const trackItems = document.querySelectorAll(".track__item");
    trackItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        APP.pause();
        console.log(`Clicked index: ${index}`);
        document.getElementById(
          "album__art_full"
        ).innerHTML = `<div class="album_art__full"><img src="./img/large/${APP.songs[index].album}" alt="full album art" />`;
        APP.currentTrack = index;
        let minutes = APP.songs[index].minutes;
        let seconds = APP.songs[index].seconds;
        let durationString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        APP.audio = new Audio(`./media/${APP.songs[index].track}`);
        document.getElementById("total-time").innerHTML = `${durationString}`;
        document.getElementById("current-time").innerHTML = "0:00";
        APP.play();
      });
    });
  },
  play: () => {
    if (
      document.getElementById("btnPlay").innerHTML ==
      '<i class="material-symbols-rounded">play_arrow</i>'
    ) {
      document.getElementById(
        "btnPlay"
      ).innerHTML = `<i class="material-symbols-rounded">pause</i>`;
      APP.audio.play();
    } else {
      document.getElementById(
        "btnPlay"
      ).innerHTML = `<i class="material-symbols-rounded">play_arrow</i>`;
      APP.audio.pause();
    }
    APP.convertTimeDisplay();
  },
  pause: () => {
    if (
      document.getElementById("btnPlay").innerHTML ==
      '<i class="material-symbols-rounded">pause</i>'
    ) {
      document.getElementById(
        "btnPlay"
      ).innerHTML = `<i class="material-symbols-rounded">play_arrow</i>`;
      APP.audio.pause();
    }
  },
  previous: () => {
    APP.pause();
    console.log();
    APP.currentTrack--;
    console.log(APP.songs);
    document.getElementById(
      "album__art_full"
    ).innerHTML = `<div class="album_art__full"><img src="./img/large/${
      APP.songs[APP.currentTrack].album
    }" alt="full album art" />`;
    document.getElementById("total-time").innerHTML = `${
      APP.songs[APP.currentTrack].durationString
    }`;
    APP.audio = new Audio(`./media/${APP.songs[APP.currentTrack].track}`);
  },
  next: () => {
    APP.pause();
    if (APP.currentTrack == APP.songs.length - 1) {
      // APP.currentTrack = 0;
      document.getElementById(
        "album__art_full"
      ).innerHTML = `<div class="album_art__full"><img src="./img/large/${
        APP.songs[APP.currentTrack].album
      }" alt="full album art" />`;
      document.getElementById("total-time").innerHTML = `${
        APP.songs[APP.currentTrack].durationString
      }`;
      APP.audio = new Audio(`./media/${APP.songs[APP.currentTrack].track}`);
    } else if (APP.shuffle == false) {
      APP.currentTrack++;
      document.getElementById(
        "album__art_full"
      ).innerHTML = `<div class="album_art__full"><img src="./img/large/${
        APP.songs[APP.currentTrack].album
      }" alt="full album art" />`;
      document.getElementById("total-time").innerHTML = `${
        APP.songs[APP.currentTrack].durationString
      }`;
      APP.audio = new Audio(`./media/${APP.songs[APP.currentTrack].track}`);
    } else if (APP.shuffle == true || APP.audio == undefined) {
      function shuffleSong() {
        return Math.floor(Math.random() * APP.songs.length);
      }
      let shuffledSong = shuffleSong();
      //Could add an if to see if CurrentTrack is same as shuffledSong
      APP.currentTrack = shuffledSong;
      console.log(APP.currentTrack);
      document.getElementById(
        "album__art_full"
      ).innerHTML = `<div class="album_art__full"><img src="./img/large/${
        APP.songs[APP.currentTrack].album
      }" alt="full album art" />`;
      document.getElementById("total-time").innerHTML = `${
        APP.songs[APP.currentTrack].durationString
      }`;
      APP.audio = new Audio(`./media/${APP.songs[APP.currentTrack].track}`);
    }

    APP.play();
  },
  autoNext: () => {
    while (APP.audio.currentTime == APP.audio.duration) {
      APP.next();
    }
  },
  convertTimeDisplay: () => {
    clearInterval(APP.timeDisplayInterval);

    APP.timeDisplayInterval = setInterval(() => {
      let prePercentage = APP.audio.currentTime / APP.audio.duration;
      APP.percentage = Math.round(prePercentage * 100);
      let minutes = Math.floor(APP.audio.currentTime / 60);
      let seconds = Math.ceil(APP.audio.currentTime % 60);
      let durationString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      console.log(APP.audio.currentTime == APP.audio.duration);
      document.getElementById("current-time").innerHTML = durationString;
      document.getElementById("played").style.width = `${APP.percentage}%`;
      if (APP.audio.currentTime == APP.audio.duration) {
      document.getElementById("current-time").innerHTML = `00:00`;
        APP.next();
        APP.play();
      }
    }, 1000);
  },
  shuffleOnOff: () => {
    if (APP.shuffle == false) {
      APP.shuffle = true;
      document.getElementById("btnShuffle").style.color = "#008000";
    } else {
      APP.shuffle = false;
      document.getElementById("btnShuffle").style.color = "#000";
    }
  },
};
