window.addEventListener("load", initApp);

function initApp() {
  document.querySelector("#add-album-button").addEventListener("click", openAlbumDialog);
  document.querySelector("#add-track-button-album").addEventListener("click", addTrackInputField);
  document.querySelector("#add-artist-button-album").addEventListener("click", addArtistInputField);
  document.querySelector("#close-album-dialog").addEventListener("click", closeAlbumDialog);
}

function openAlbumDialog() {
  const albumDialog = document.querySelector("#album-dialog");
  albumDialog.showModal();
}

function addTrackInputField() {
  const trackList = document.querySelector("#track-list");
  const newTrackInput = document.createElement("input");
  newTrackInput.type = "text";
  newTrackInput.className = "track-input";
  newTrackInput.name = "track-title";
  trackList.appendChild(newTrackInput);
}
function addArtistInputField() {
  const artistList = document.querySelector("#artist-list");
  const newArtistInput = document.createElement("input");
  newArtistInput.type = "text";
  newArtistInput.className = "artist-input";
  newArtistInput.name = "artist-name";
  artistList.appendChild(newArtistInput);
}
function closeAlbumDialog() {
  const albumDialog = document.querySelector("#album-dialog");
  const albumTitleInput = document.querySelector("#album-input");
  const artistInputs = document.querySelectorAll(".artist-input");
  const trackInputs = document.querySelectorAll(".track-input");

  albumTitleInput.value = "";
  artistInputs.forEach(function (input) {
    input.value = "";
  });
  trackInputs.forEach(function (input) {
    input.value = "";
  });

  trackInputs.forEach(function (input) {
    input.parentNode.removeChild(input);
  });

  artistInputs.forEach(function (input) {
    input.parentNode.removeChild(input);
  });

  addArtistInputField();
  addTrackInputField();

  albumDialog.close();
}
