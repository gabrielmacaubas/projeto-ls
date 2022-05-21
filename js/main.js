import data from './dados/data.js';

const playlistsDeck = document.querySelector('#playlists');
const songsDeck = document.querySelector('#songs');
const playlistsOptions = document.querySelector('#dselect');
const btnCanvas = document.querySelectorAll('#btnNewCard');
const submitPlay = document.querySelector('#submitPlay')
const formPlaylist = document.querySelector('#formPlaylist')
const formSong = document.querySelector('#formSong')

const buttonHTML = `<button
                      class="btn btn-light border-2 border-warning fw-bold float-end text-light"
                      type="button"
                      id="btnNewCard"
                      data-bs-toggle="offcanvas" 
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                    >
                    +
                    </button>`

for (const playlist of data){

    const play = createPlaylistView(playlist);

    playlistsDeck.insertAdjacentHTML('beforeend', play);

}

function createPlaylistView(playlist) {
    const nameOfPlaylist = playlist.name
    const idOfPlaylist = playlist.id
    const playlistCard = `<li class="list-group-item ${idOfPlaylist}" id="data">${nameOfPlaylist}</li>`;

    return playlistCard;
 
}

function reset(id) {
    document.getElementById(id).innerHTML = "";
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


btnCanvas.forEach((btn) => {btn.onclick=function(){updatePlaylistOptions()}})
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

    formPlaylist.reset();
    offCanvas.hide();
    updatePlaylistOptions();
    addClickableEvent();
    updateSongs(temp.id-1);

}

formSong.onsubmit = function(e){ 

    e.preventDefault();

    const offCanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));

    offCanvas.show();

    const inputSong = document.querySelector('#inputSong');
    
    const newSong = inputSong.value;
    
    const newSongId = playlistsOptions.options[playlistsOptions.selectedIndex].id;
    
    data[newSongId-1].songs.push(newSong)

    offCanvas.hide();
    formSong.reset();
    updatePlaylistOptions();

    updateSongs(newSongId-1);

}

function updateSongs(id){
    reset("songs");
    
    const songs = data[id].songs;

    document.querySelector('.songs-title').innerHTML = `${data[id].name}
                                                        ${buttonHTML}`

    for (const song of songs){
        const playlistCard = `<li class="list-group-item" id="data">${song}</li>`;
        
        songsDeck.insertAdjacentHTML('beforeend', playlistCard);
    }
}

function addClickableEvent(){
    let button = document.querySelectorAll('#data');

    button.forEach((btn) => {
        var el = btn,
            elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);

    });

    button = document.querySelectorAll('#data');

    button.forEach((btn) => {btn.addEventListener("click", function showSongs() {
        reset("songs");

        const id = btn.classList[1]-1
        const songs = data[id].songs;
    
        document.querySelector('.songs-title').innerHTML = `${data[id].name}
                                                            ${buttonHTML}`

        for (const song of songs){
            const playlistCard = `<li class="list-group-item" id="data">${song}</li>`;
            
            songsDeck.insertAdjacentHTML('beforeend', playlistCard);
        }
    })})

}

addClickableEvent();
