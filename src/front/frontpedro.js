
let albums = [];
let divAlbums$$ = document.querySelector(".albums");

// funcion que recoge los albums
const getAlbums = async () => {
  let response = await fetch("http://127.0.0.1:5001/albums");
  let res = await response.json();
  console.log(res);
  return res;  
};


// funcion que pinta los albums
const drawAlbums = (albums) => {
    divAlbums$$.innerHTML = "";
    for (const album of albums) {
      let albumDiv = document.createElement("div");
      albumDiv.className = "album-card";
  
      let albumTitle = document.createElement("h1");
      albumTitle.textContent = album.title;

      let albumArtist = document.createElement("h2");
      albumArtist.textContent = album.artist;

      let albumYear = document.createElement("h3");
      albumYear.textContent = album.year;

      let albumImg = document.createElement("img");
      albumImg.className = "imgCover";
      albumImg.src = album.imgCover;

      let listSongs$$ = document.createElement("div");
      listSongs$$.className = "listSongs";

      let arraySongs = album.songs;
      for (let index = 0; index < arraySongs.length; index++) {
        const song = arraySongs[index];

        let song$$ = document.createElement("div");
        song$$.className='song';        
        song$$.id = song._id;

        let songTitle=document.createElement("h2");
        songTitle.textContent=song.title;

        let songArtist=document.createElement("h4");
        songArtist.textContent=song.artist;

        let songStyle=document.createElement("h4");
        songStyle.textContent=song.style;

        let songYear=document.createElement("h4");
        songYear.textContent=song.year;

        // añadimos a la canción el titulo, artista, estilo, año.
        song$$.appendChild(songTitle);
        song$$.appendChild(songArtist);
        song$$.appendChild(songStyle);
        song$$.appendChild(songYear);
        // añadimos a la lista la canción
        listSongs$$.appendChild(song$$);
      }
  
      albumDiv.appendChild(albumTitle);
      albumDiv.appendChild(albumArtist);
      albumDiv.appendChild(albumYear);
      albumDiv.appendChild(albumImg);
      albumDiv.appendChild(listSongs$$);

  
      divAlbums$$.appendChild(albumDiv);
    }
  };

// función para dar de alta una canción
  //addNewSongBtn
const createSong = async (event) => {
    event.preventDefault();
    console.log('dar de alta song');
    const title = document.querySelector('#title').value;
    const artist = document.querySelector('#artist').value;
    const style = document.querySelector('#style').value;
    const year = document.querySelector('#year').value;
    const res = await fetch('http://localhost:5001/songs',
    { method : 'POST', body: JSON.stringify({title, artist, style, year}),
    headers: {
  'Content-Type': 'application/json' }});
    newSong = await res.json();
    console.log(newSong);
    document.querySelector('#idsong').textContent = newSong._id;
  };  


const init = async () => {
    albums = await getAlbums();      
    drawAlbums(albums);  
    document.querySelector('#btnnewsong').onclick = createSong;   
  };
  

  window.onload = () => {
    init();
  }

