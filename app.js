
const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`
    // load data
    fetch(url)
        .then(res => res.json())
        .then(data => displaysongs(data.data))
        .catch(error => errormass('404 not found'))

}
const displaysongs = songs => {
    const songContainer = document.getElementById('song-container')
    songContainer.innerHTML = "";
    songs.forEach(song => {
        const songsDiv = document.createElement('div')
        songsDiv.className = "single-result row align-items-center my-3 p-3"
        songsDiv.innerHTML = `
        <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
  <source src="${song.preview}" type="">
  
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
const errormass = error => {
    const errortag = document.getElementById('error-message');
    errortag.innerText = error
};


