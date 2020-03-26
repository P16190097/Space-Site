"use strict";
/***********************************************/
/*   script to setup map and initialise plots  */
/***********************************************/

const map = L.map('mapid').setView([0, 0], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoibWF5b2UiLCJhIjoiY2s3Z2VxZXM1MDQwMTNnbnVyYTg0MTlleCJ9.bFoFArF7FLimIxUBMjYZkA', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  minZoom: 1,
  maxZoom: 10,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'sk.eyJ1IjoibWF5b2UiLCJhIjoiY2s3Z2VxZXM1MDQwMTNnbnVyYTg0MTlleCJ9.bFoFArF7FLimIxUBMjYZkA'
}).addTo(map);

const ISSIcon = L.icon({
  iconUrl: '../2019-20-P16190097/img/ISSIcon.png',
  iconSize: [50, 30],
  iconAnchor: [25, 15],
  popupAnchor: [50, 25],
});

const iss = L.marker([0, 0], { icon: ISSIcon }).addTo(map);
const isscirc = L.circle([0, 0], 2200e3, { color: "#c22", opacity: 0.3, weight: 1, fillColor: "#c22", fillOpacity: 0.1 }).addTo(map);
isscirc.setRadius(500000);

/******************************************************************/
/*    perform HTTP GET requests via AJAX and update map plots     */
/******************************************************************/

// API docs: https://wheretheiss.at/w/developer

const protocol = window.location.protocol !== 'file:' ? window.location.protocol : 'https:';

const positionUrl = `${protocol}//api.wheretheiss.at/v1/satellites/25544`;

const updateMap = (resp) => {
  const { latitude, longitude, altitude, velocity } = resp;

  iss.setLatLng([latitude, longitude]);
  isscirc.setLatLng([latitude, longitude]);
  map.panTo([latitude, longitude], { animate: true });

  document.getElementById('iss-info').innerHTML = `Latitude: ${latitude}</br>Longitude: ${longitude}</br>Altitude: ${altitude}km</br>Velocity: ${velocity}km/h`;

  setTimeout(() => performHttpGet(positionUrl, updateMap), 5000);
};

const showError = () => {
  map.removeLayer(iss);
  map.removeLayer(isscirc);
  document.getElementById('iss-info').innerHTML = `Tracker details could not be fetched`;
};

performHttpGet(positionUrl, updateMap, showError);
