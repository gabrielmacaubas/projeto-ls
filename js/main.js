import data from './dados/data.js';

for (const playlist of data){
    const playlistDeck = document.querySelector('#playlists');

    const play = createPlaylistView(playlist);

    playlistDeck.insertAdjacentHTML('beforeend', play);

}


function createPlaylistView(playlist) {
    const playlistName = `<li class="list-group-item" id="play">${playlist.name}</li>`;
    return playlistName;
 
}

function showSongs(){
    const songslistDeck = document.querySelector('#songs');

    const song = createPlaylistView(song);
    const songName = `<li class="list-group-item" id="play">${playlist.name}</li>`;
    songlistDeck.insertAdjacentHTML('beforeend', song);
}

const a = document.querySelector('#play');

a.onclick = function () {
    showSongs();
};
