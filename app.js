import { getArtists, getAlbums, getTracks, searchAlbum, searchArtist, searchTracks } from "./rest-service.js";
import * as ListRenderer from "./ListRenderer.js";
import { ArtistRenderer } from "./ArtistRenderer.js";
import { TrackRenderer } from "./TrackRenderer.js";
import { AlbumRenderer } from "./AlbumRenderer.js";

window.addEventListener("load", initApp);

let tracks;
let artists;
let albums;

function initApp() {
  updateTracksList();
  updateArtistsList();
  updateAlbumsList();

  document.querySelector("#input-search").addEventListener("keyup", submitSearchArtist);
  document.querySelector("#input-search").addEventListener("search", submitSearchArtist);
  document.querySelector("#input-search").addEventListener("keyup", submitSearchAlbum);
  document.querySelector("#input-search").addEventListener("search", submitSearchAlbum);
  document.querySelector("#input-search").addEventListener("keyup", submitSearchTrack);
  document.querySelector("#input-search").addEventListener("search", submitSearchTrack);
}

async function updateArtistsList() {
  artists = await getArtists();
  const artistList = ListRenderer.construct(artists, "#artist-list", ArtistRenderer);
  artistList.render();
}
async function updateTracksList() {
  tracks = await getTracks();
  const trackList = ListRenderer.construct(tracks, "#track-list", TrackRenderer);
  trackList.render();
}
async function updateAlbumsList() {
  albums = await getAlbums();
  const albumList = ListRenderer.construct(albums, "#album-list", AlbumRenderer);
  albumList.render();
}

async function submitSearchArtist(event) {
  event.preventDefault();

  const form = event.target;

  const search = form.value.toLowerCase();

  const searchResult = await searchArtist(search);
  if (searchResult.length === 0) {
    const artistListContainer = document.querySelector("#artist-list");
    artistListContainer.innerHTML = "";
    const errorHTML = /*html*/ `
    <ul>
    <li>No artists found</li>
    </ul>
    `;
    artistListContainer.insertAdjacentHTML("beforeend", errorHTML);
  } else {
    const artistList = ListRenderer.construct(searchResult, "#artist-list", ArtistRenderer);
    artistList.container.innerHTML = "";
    artistList.render();
  }
}

async function submitSearchAlbum(event) {
  event.preventDefault();

  const form = event.target;

  const search = form.value.toLowerCase();

  const searchResult = await searchAlbum(search);

  if (searchResult.length === 0) {
    const albumListContainer = document.querySelector("#album-list");
    albumListContainer.innerHTML = "";
    const errorHTML = /*html*/ `
    <ul>
    <li>No albums found</li>
    </ul>
    `;
    albumListContainer.insertAdjacentHTML("beforeend", errorHTML);
  } else {
    const albumList = ListRenderer.construct(searchResult, "#album-list", AlbumRenderer);
    albumList.container.innerHTML = "";
    albumList.render();
  }
}

async function submitSearchTrack(event) {
  event.preventDefault();

  const form = event.target;

  const search = form.value.toLowerCase();

  const searchResult = await searchTracks(search);

  if (searchResult.length === 0) {
    const trackListContainer = document.querySelector("#track-list");
    trackListContainer.innerHTML = "";
    const errorHTML = /*html*/ `
    <ul>
    <li>No tracks found</li>
    </ul>
    `;
    trackListContainer.insertAdjacentHTML("beforeend", errorHTML);
  } else {
    const trackList = ListRenderer.construct(searchResult, "#track-list", TrackRenderer);
    trackList.container.innerHTML = "";
    trackList.render();
  }
}
