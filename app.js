import { Album } from "./Album.js";
import { Artist } from "./Artist.js";
import { Track } from "./Track.js";
import { AlbumRenderer } from "./AlbumRenderer.js";
import { ArtistRenderer } from "./ArtistRenderer.js";
import { TrackRenderer } from "./TrackRenderer.js";
import { getArtists, getAlbums, getTracks, searchAlbum, searchArtist, searchTracks } from "./rest-service.js";

async function fetchArtists() {
  const artistsData = await getArtists();
  return artistsData.map((data) => new Artist(data.artist_name));
}

async function fetchAlbums() {
  const albumsData = await getAlbums();
  return albumsData.map((data) => new Album(data.album_name));
}

async function fetchTracks() {
  const tracksData = await getTracks();
  return tracksData.map((data) => new Track(data.track_name));
}

async function displayData() {
  const artists = await fetchArtists();
  const albums = await fetchAlbums();
  const tracks = await fetchTracks();

  artists.forEach((artist) => {
    document.querySelector("#artist-list").innerHTML += ArtistRenderer.render(artist);
  });

  albums.forEach((album) => {
    document.querySelector("#album-list").innerHTML += AlbumRenderer.render(album);
  });

  tracks.forEach((track) => {
    document.querySelector("#track-list").innerHTML += TrackRenderer.render(track);
  });
}

// Call the displayData function when the page loads
window.addEventListener("load", displayData);
