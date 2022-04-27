import data from './dados/data.js';

const playlistsDeck = document.querySelector('#playlists');
const songsDeck = document.querySelector('#songs');
const playlistsOptions = document.querySelector('#dselect');
const btnCanvas = document.querySelector('#btnNewCard');
const submitPlay = document.querySelector('#submitPlay')
const formPlaylist = document.querySelector('#formPlaylist')
const formSong = document.querySelector('#formSong')


for (const playlist of data){

    const play = createPlaylistView(playlist);

    playlistsDeck.insertAdjacentHTML('beforeend', play);

}

function createPlaylistView(playlist) {
    const nameOfPlaylist = playlist.name
    const idOfPlaylist = playlist.id
    const playlistCard = `<li class="list-group-item ${idOfPlaylist}" id="play">${nameOfPlaylist}</li>`;

    return playlistCard;
 
}

function reset(id) {
    document.getElementById(id).innerHTML = "";
}

function showSongs(id) {
    reset("songs");

    const songs = data[id].songs;

    document.querySelector('.songs-title').innerText = `${data[id].name}`;


    for (const song of songs){
        const playlistCard = `<li class="list-group-item" id="song">${song}</li>`;
        
        songsDeck.insertAdjacentHTML('beforeend', playlistCard)

    }
}

function updatePlaylistOptions(){
    reset("dselect");

    for (const playlist of data){
        const nameOfPlaylist = playlist.name;
        const idOfPlaylist = playlist.id;

        const playlistOption = `<option id="${idOfPlaylist}">${nameOfPlaylist}</option>`

        playlistsOptions.insertAdjacentHTML('beforeend', playlistOption);
    }
}



btnCanvas.onclick = function(){ updatePlaylistOptions() }
submitPlay.onclick = function(){ updatePlaylistOptions() }

formPlaylist.onsubmit = function(e){ 

    e.preventDefault();

    const offCanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));

    offCanvas.show();

    const inputPlaylist = document.querySelector('#inputPlaylist');

    const temp = {
        id: data.length+1,
        name: inputPlaylist.value,
        songs: []
    }

    const newPlaylist = createPlaylistView(temp);

    playlistsDeck.insertAdjacentHTML('beforeend', newPlaylist);

    data.push(temp);
    
    updatePlaylistOptions();

    console.log(data);

    offCanvas.hide();
}

formSong.onsubmit = function(e){ 

    e.preventDefault();

    const offCanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));

    offCanvas.show();

    const inputSong = document.querySelector('#inputSong');
    
    const newSong = inputSong.value;
    
    const newSongId = playlistsOptions.options[playlistsOptions.selectedIndex].id;
    
    data[newSongId-1].songs.push(newSong)

    console.log(data);

    offCanvas.hide();

    updatePlaylistOptions();
}

const button = document.querySelectorAll('#play');

button.forEach((btn) => {btn.addEventListener("click", function(){
    showSongs(btn.classList[1]-1)
})});
