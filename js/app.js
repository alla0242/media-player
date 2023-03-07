
import MEDIA from './media.js'; //the data file import


document.addEventListener('DOMContentLoaded', function() {
  APP.init();
});

const APP = {
  audio: new Audio(), //the Audio Element that will play every track
  currentTrack: 0, //the integer representing the index in the MEDIA array
  init: () => {
    APP.buildPlaylist();
    APP.addListeners();
    APP.loadCurrentTrack;
    APP.play;

  },
  addListeners: () => {
document.querySelectorAll('li').forEach(li => li.addEventListener('click', APP.loadCurrentTrack));
document.getElementById('btnPlay').addEventListener("click", APP.play);
document.querySelectorAll("#playlist li").addEventListener('click', APP.loadCurrentTrack);
}
  ,
  buildPlaylist: () => { MEDIA.forEach(item => {document.getElementById('playlist').innerHTML += `<li class="track__item" id="track__item">
                <div class="track__thumb">
                    <img src="./img/small/${item.thumbnail}" alt="artist album art thumbnail" />
                </div>
                <div class="track__details">
                    <p class="track__title">${item.title}</p>
                    <p class="track__artist">${item.artist}</p>
                </div>
                <div class="track__time">
                    <time datetime="">00:00</time>
                </div>
            </li>`;
            let items = document.querySelectorAll("#playlist li"),
                tab = [], index;
                for(var i = 0; i < items.length; i++){
           tab.push(items[i].innerHTML);
         }
          for(var i = 0; i < items.length; i++)
        {
            items[i].onclick = function(){
              
              index = tab.indexOf(this.innerHTML);
              //  console.log(this.innerHTML + " Index = " + index);
              APP.currentTrack = index;
          console.log(`${APP.currentTrack}`)

            };};
          
          })
    //read the contents of MEDIA and create the playlist
  },
  loadCurrentTrack: () => { document.getElementById("album__art_full").innerHTML = 
`<div class="album_art__full"><img src="./img/large/${MEDIA[APP.currentTrack].large}" alt="full album art" />`;
      APP.audio = new Audio(`./media/${MEDIA[APP.currentTrack].track}`);
      APP.convertTimeDisplay();

    //use the currentTrack value to set the src of the APP.audio element
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
  convertTimeDisplay: () => {

    //convert the seconds parameter to `00:00` style display
  },
};