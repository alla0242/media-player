
import MEDIA from './media.js'; //the data file import


document.addEventListener('DOMContentLoaded', function() {
  APP.init();
});

const APP = {
  audio: '',
  index: '',
  songs: [],
  //temp audio holds an array of the APP.audio for each MEDIA.item
  init: () => {
    // APP.defaults();
    // APP.buildTrackDurationArray();
    APP.buildSongs();
    APP.addListeners();
    // APP.buildPlaylist();
    // APP.addListeners();
    // APP.convertTimeDisplay();
  },

  defaults: () => {

  },
  addListeners: () => {
document.querySelectorAll('li').forEach(li => li.addEventListener('click', console.log(`fdsaklfhdsa`)));
    // document.querySelectorAll("track__item").addEventListener('click', APP.loadCurrentTrack)
// document.querySelectorAll('li').forEach(li => li.addEventListener('click', APP.loadCurrentTrack));
document.getElementById('btnPlay').addEventListener("click", APP.play);
// document.querySelectorAll("#playlist li").addEventListener('click', APP.loadCurrentTrack);
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
        seconds: seconds
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


      let minutes = APP.songs[index].minutes;
      let seconds = APP.songs[index].seconds;
      let durationString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      APP.audio = new Audio(`./media/${APP.songs[index].track}`);
      document.getElementById('total-time').innerHTML = `${durationString}`;





    });
  });
},
  play: () => {
    if(document.getElementById('btnPlay').innerHTML == '<i class="material-symbols-rounded">play_arrow</i>'){document.getElementById('btnPlay').innerHTML = `<i class="material-symbols-rounded">pause</i>`;APP.audio.play()}
    else{document.getElementById('btnPlay').innerHTML = `<i class="material-symbols-rounded">play_arrow</i>`;APP.audio.pause()}
    //start the track loaded into APP.audio playing
  },
  pause: () => {
    //pause the track loaded into APP.audio playing
    if(document.getElementById('btnPlay').innerHTML == '<i class="material-symbols-rounded">pause</i>'){document.getElementById('btnPlay').innerHTML = `<i class="material-symbols-rounded">play_arrow</i>`;APP.audio.pause()};
  },
  previous: () => {
    document.getElementById('btnPrev').addEventListener('click', ()=>{
      APP.pause;

    })
  },
  next: () => {
    
  },
  convertTimeDisplay: () => {
    
    
    let playlist = document.querySelectorAll("#playlist li");playlist.forEach(element => {console.log(APP.tempAudio[index].duration)})
// document.getElementById("playlistItem").setAttribute("datetime", 'test')
          // console.log(APP.audio.duration);

    //convert the seconds parameter to `00:00` style display
  },
};