const input = document.getElementById("search-field");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("enter").click();
  }
});
const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    // load data
    fetch(url)
        .then(res => res.json())
        .then(data => displaysongs(data.data))
        .catch(error => errormass("Sorry, song not found"))

}
const errormass = error => {
    const errortag = document.getElementById('error-message');
    errortag.innerText = error
};

const displaysongs = songs => {
    const songContainer = document.getElementById('song-container')
    songContainer.innerHTML = "";
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = ""
    songs.forEach(song => {
        const songsDiv = document.createElement('div')
        songsDiv.className = "single-result row align-items-center my-3 p-3"
        songsDiv.innerHTML = `
        <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                     <source src="${song.preview}" type="audio/ogg">
                     <source src="${song.preview}" type="audio/mpeg">
                </audio>

        </div>
        <div class="col-md-3 text-md-right text-center">
                <img src="${song.album.cover}">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')"class="btn btn-success">Get Lyrics</button>
        </div>`;

        songContainer.appendChild(songsDiv)
    });
}
const getLyric = (artist, title) => {
    
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
        
}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    
    lyricsDiv.innerText = lyrics
    
}


