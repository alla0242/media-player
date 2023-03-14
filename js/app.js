
import MEDIA from './media.js'; //the data file import


document.addEventListener('DOMContentLoaded', function() {
  APP.init();
});

const APP = {
  audio: 0, 
  currentTrack: 0, 
  currentTrackDuration: 0,
  tempAudio: [],
  trackArray: [],
  init: () => {
    APP.defaults();
    APP.buildPlaylist();
    APP.addListeners();
    APP.convertTimeDisplay();
  },
  buildTrackDurationArray: () => {MEDIA.forEach(item => {

  })},
  defaults: () => {
  document.getElementById("album__art_full").innerHTML = 
  `<div class="album_art__full"><img src="./img/large/${MEDIA[APP.currentTrack].large}" alt="full album art" />`;
  APP.audio = new Audio(`./media/${MEDIA[APP.currentTrack].track}`);
  },
  addListeners: () => {
// document.querySelectorAll('li').forEach(li => li.addEventListener('click', APP.loadCurrentTrack));
document.getElementById('btnPlay').addEventListener("click", APP.play);
// document.querySelectorAll("#playlist li").addEventListener('click', APP.loadCurrentTrack);
}
  ,
  buildPlaylist: () => { MEDIA.forEach(item => {

    APP.tempAudio.push(new Audio(`./media/${item.track}`));
    // itemLENGTH = document.getElementsByClassName('audio')
    APP.trackArray.push(item.track);
    document.getElementById('playlist').innerHTML += `<li class="track__item" id="track__item">
                <div class="track__thumb">
                    <img src="./img/small/${item.thumbnail}" alt="artist album art thumbnail" />
                </div>
                <div class="track__details">
                    <p class="track__title">${item.title}</p>
                    <p class="track__artist">${item.artist}</p>
                </div>`;

            
            

            let items = document.querySelectorAll("#playlist li"),
                tab = [], index;
                for(var i = 0; i < items.length; i++){
           tab.push(items[i].innerHTML);
          //  APP.audio = new Audio(`./media/${item.track}`);
         
          
         }
          for(var i = 0; i < items.length; i++)
        {   
            items[i].onclick = function(){
              APP.pause();
              index = tab.indexOf(this.innerHTML);
              APP.currentTrack = index
              
              console.log(APP.tempAudio[index].duration)
             this.innerHTML += APP.tempAudio[index].duration
              console.log(index);
              console.log(APP.trackArray)
              console.log(MEDIA[APP.currentTrack].large)
              console.log(`./media/${APP.trackArray[index]}`)
               document.getElementById("album__art_full").innerHTML = 
              `<div class="album_art__full"><img src="./img/large/${MEDIA[APP.currentTrack].large}" alt="full album art" />`;
              APP.audio = new Audio(`./media/${MEDIA[APP.currentTrack].track}`);
              // console.log(APP.audio.duration)
              
            };};
            console.log('test')

          });            document.getElementById('playlist').innerHTML = `
          <div class="track__time">
              <time id="playlistItem" datetime="">${APP.tempAudio[index].duration}</time>
          </div>
      </li>`
  },
  loadCurrentTrack: () => { 
    // APP.audio = new Audio(`./media/${MEDIA[APP.currentTrack].track}`);
//   document.getElementById("playlistItem").innerText = `${APP.audio.duration}`;
//   document.getElementById("album__art_full").innerHTML = 
// `<div class="album_art__full"><img src="./img/large/${MEDIA[APP.currentTrack].large}" alt="full album art" />`;
      
      

      APP.convertTimeDisplay();
  
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
    
    
    let playlist = document.querySelectorAll("#playlist li");playlist.forEach(element => {console.log(APP.tempAudio[index].duration)})
// document.getElementById("playlistItem").setAttribute("datetime", 'test')
          // console.log(APP.audio.duration);

    //convert the seconds parameter to `00:00` style display
  },
};