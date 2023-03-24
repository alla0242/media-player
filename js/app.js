
import MEDIA from './media.js'; //the data file import


document.addEventListener('DOMContentLoaded', function() {
  APP.init();
});

const APP = {
  audio: '',
  currentTrack: 0,
  shuffle: false,
  trackArray: [],
  index: '',
  songs: [],
  percentage: 0,
  //temp audio holds an array of the APP.audio for each MEDIA.item
  init: () => {
    // APP.defaults();
    //TODO: Add default
    //TODO: Add looping to first track
    //TODO: Add current time
    //TODO: 
    APP.buildSongs();
    APP.addListeners();
    // APP.convertTimeDisplay();
  },

  defaults: () => {

  },
  addListeners: () => {
document.getElementById('btnPrev').addEventListener('click', APP.previous);
document.getElementById('btnNext').addEventListener('click', APP.next);
document.getElementById('btnShuffle').addEventListener('click', APP.shuffleOnOff);
// APP.audio.addEventListener("onended", () => {APP.next})
//TODO: ADD shuffle button
//TODO: Add event listener audio.end APP.next();

document.getElementById('btnPlay').addEventListener("click", APP.play);
},

buildSongs: () => {
  MEDIA.forEach(item => {
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
        durationString: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      });
      let playlist = document.getElementById('playlist');
      let durationString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

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
    newAudio.addEventListener('canplaythrough', findAudio);
    newAudio.addEventListener('change', (event) => {APP.convertTimeDisplay})
console.log(newAudio)

  });
},
getClickedIndex: () => {

  const trackItems = document.querySelectorAll('.track__item');
  trackItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      APP.pause();
      console.log(`Clicked index: ${index}`);
      document.getElementById("album__art_full").innerHTML = 
              `<div class="album_art__full"><img src="./img/large/${APP.songs[index].album}" alt="full album art" />`;
      APP.currentTrack = index;
      let minutes = APP.songs[index].minutes;
      let seconds = APP.songs[index].seconds;
      let durationString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      APP.audio = new Audio(`./media/${APP.songs[index].track}`);
      document.getElementById('total-time').innerHTML = `${durationString}`;
      document.getElementById('current-time').innerHTML = '0:00';
      APP.play();
    APP.convertTimeDisplay();


    });
  });
},
  play: () => {
    if(document.getElementById('btnPlay').innerHTML == '<i class="material-symbols-rounded">play_arrow</i>'){document.getElementById('btnPlay').innerHTML = `<i class="material-symbols-rounded">pause</i>`;APP.audio.play()}
    else{document.getElementById('btnPlay').innerHTML = `<i class="material-symbols-rounded">play_arrow</i>`;APP.audio.pause()};
  clearInterval(APP.convertTimeDisplay);
    APP.convertTimeDisplay();
  },
  pause: () => {
    if(document.getElementById('btnPlay').innerHTML == '<i class="material-symbols-rounded">pause</i>'){document.getElementById('btnPlay').innerHTML = `<i class="material-symbols-rounded">play_arrow</i>`;APP.audio.pause()};
  },
  previous: () => {
      APP.pause();
      console.log();
      APP.currentTrack--;
      console.log(APP.songs)
      document.getElementById("album__art_full").innerHTML = 
              `<div class="album_art__full"><img src="./img/large/${APP.songs[APP.currentTrack].album}" alt="full album art" />`;
      document.getElementById('total-time').innerHTML = `${APP.songs[APP.currentTrack].durationString}`;
      APP.audio =  new Audio(`./media/${APP.songs[APP.currentTrack].track}`);
  },
  next: () => {
          APP.pause();
          if(APP.currentTrack == 6){
            APP.currentTrack = 0;
    document.getElementById("album__art_full").innerHTML = 
              `<div class="album_art__full"><img src="./img/large/${APP.songs[APP.currentTrack].album}" alt="full album art" />`;
      document.getElementById('total-time').innerHTML = `${APP.songs[APP.currentTrack].durationString}`;
      APP.audio =  new Audio(`./media/${APP.songs[APP.currentTrack].track}`);
          }
          if(APP.shuffle == false){
      APP.currentTrack++;
    document.getElementById("album__art_full").innerHTML = 
              `<div class="album_art__full"><img src="./img/large/${APP.songs[APP.currentTrack].album}" alt="full album art" />`;
      document.getElementById('total-time').innerHTML = `${APP.songs[APP.currentTrack].durationString}`;
      APP.audio =  new Audio(`./media/${APP.songs[APP.currentTrack].track}`);
    }else if(APP.shuffle == true){
        let shuffleSong = Math.floor(Math.random() * 8);
        APP.currentTrack = APP.currentTrack[shuffleSong];
        document.getElementById("album__art_full").innerHTML = 
              `<div class="album_art__full"><img src="./img/large/${APP.songs[APP.currentTrack].album}" alt="full album art" />`;
      document.getElementById('total-time').innerHTML = `${APP.songs[APP.currentTrack].durationString}`;
      APP.audio =  new Audio(`./media/${APP.songs[APP.currentTrack].track}`);
      }
      console.log(APP.songs)
  },autoNext: () => {
    if(APP.shuffle == false && APP.audio.currentTime == APP.audio.duration){APP.next()}
  else if(APP.shuffle == true &&  APP.audio.currentTime == APP.audio.duration
    ){//math.random the next track
      function callRandomly(func, maxCalls) {
  const randomCalls = Math.floor(Math.random() * maxCalls);
  for (let i = 0; i < randomCalls; i++) {
    func();
  }
}
callRandomly(APP.next(), i);

    }
  },
  convertTimeDisplay: () => {
setInterval(() => {
let prePercentage = (APP.audio.currentTime / APP.audio.duration);
APP.percentage = Math.round(prePercentage * 100)
            let minutes = Math.floor(APP.audio.currentTime / 60);
      let seconds = Math.ceil(APP.audio.currentTime % 60);
      let durationString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
console.log((APP.percentage));
      document.getElementById('current-time').innerHTML = durationString;
          document.getElementById("played").style.width = `${APP.percentage}%`
}, 1000);


if(APP.audio.currentTime == APP.audio.duration){APP.next()}
  },
  shuffleOnOff: () => {
    if(APP.shuffle == false){APP.shuffle = true}
    else{APP.shuffle = false}
  }
  ,progressBar: () =>
 {
  document.getElementById('progress').addEventListener
 }
};