
// document.addEventListener("DOMContentLoaded")


function displayArt(){
    let text = event.currentTarget.innerHTML;
    let newText = text.match(/<img(.*?)>/g);
    let newnewText = newText.toString().replace(/small/g,'large');
    let albumLarge = `${newnewText}`;
    let newAlbum = document.querySelector('.album_art__full');
    newAlbum.innerHTML = albumLarge;
}