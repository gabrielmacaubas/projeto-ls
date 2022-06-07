const playlistsDeck = document.querySelector('#playlists');
const songsDeck = document.querySelector('#songs');
const playlistsOptions = document.querySelector('#dselect');
const btnCanvas = document.querySelectorAll('#btnNewCard');
const submitPlay = document.querySelector('#submitPlay');
const formPlaylist = document.querySelector('#formPlaylist');
const formSong = document.querySelector('#formSong');
const songsTitle = document.querySelector('#songsTitle');

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

const api = 'https://json-server.gabrielmacaubas.repl.co';

async function readAll() {
    const res = await fetch(`${api}/data`);
    
    return await res.json();
}

const alldata = await readAll();


for (const playlist of alldata){

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
    
    for (const playlist of alldata){
        const nameOfPlaylist = playlist.name;
        const idOfPlaylist = playlist.id;

        const playlistOption = `<option id="${idOfPlaylist}">${nameOfPlaylist}</option>`

        playlistsOptions.insertAdjacentHTML('beforeend', playlistOption);
    }
}


btnCanvas.forEach((btn) => {btn.onclick=function(){updatePlaylistOptions()}})
submitPlay.onclick = function(){ updatePlaylistOptions() }

formPlaylist.onsubmit = async function(e){ 

    e.preventDefault();

    const offCanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));

    offCanvas.show();

    const inputPlaylist = document.querySelector('#inputPlaylist');

    const temp = {
        "name": inputPlaylist.value,
        "songs": []
    }

    const newPlaylist = createPlaylistView(temp);

    playlistsDeck.insertAdjacentHTML('beforeend', newPlaylist);

    const res = await fetch(`${api}/data`, {
        method: 'post',
        body: JSON.stringify(temp),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
         },
    });
    

    formPlaylist.reset();
    offCanvas.hide();
    updatePlaylistOptions();
    addClickableEvent();
    updateSongs(temp.id-1);

    return await res.json();

}

formSong.onsubmit = async function(e){ 

    e.preventDefault();

    const offCanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));

    offCanvas.show();

    const inputSong = document.querySelector('#inputSong');
    
    const newSong = inputSong.value;
    
    const newSongId = playlistsOptions.options[playlistsOptions.selectedIndex].id;
    console.log(newSongId, newSong)

    const temp = {
        "name": alldata[newSongId-1].name,
        "songs": [...alldata[newSongId-1].songs, newSong]
    }

    e.preventDefault();
    const res = await fetch(`${api}/data/${newSongId}`, {
        method: 'put',
        body: JSON.stringify(temp),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
    
    data[newSongId-1].songs.push(newSong)

    offCanvas.hide();
    formSong.reset();
    updatePlaylistOptions();

    updateSongs(newSongId-1);

    return await res.json();
}

function updateSongs(id){
    reset("songs");
    
    const songs = alldata[id].songs;

    document.querySelector('.songs-title').innerHTML = `${alldata[id].name}
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
        const songs = alldata[id].songs;

        songsTitle.innerHTML = `${alldata[id].name}`

        for (const song of songs){
            const playlistCard = `<li class="list-group-item" id="data">${song}</li>`;
            
            songsDeck.insertAdjacentHTML('beforeend', playlistCard);
        }
    })})

}

addClickableEvent();