import data from './dados/data.js';

const playlistsDeck = document.querySelector('#playlists');
const songsDeck = document.querySelector('#songs')

for (const playlist of data){

    const play = createPlaylistView(playlist);

    playlistsDeck.insertAdjacentHTML('beforeend', play);

}

function createPlaylistView(playlist) {
    const nameOfPlaylist = playlist.name
    const idOfPlaylist = playlist.id
    const playlistCard = `<li class="list-group-item ${idOfPlaylist}" id="play">${playlist.name}</li>`;
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

const button = document.querySelectorAll('#play');

button.forEach((btn) => {
    btn.addEventListener("click", function(){showSongs(btn.classList[1]-1)});
});
