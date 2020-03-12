/***********************************************/
/*   script to setup map and initialise plots  */
/***********************************************/

const map = L.map('mapid').setView([0, 0], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoibWF5b2UiLCJhIjoiY2s3Z2VxZXM1MDQwMTNnbnVyYTg0MTlleCJ9.bFoFArF7FLimIxUBMjYZkA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
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
isscirc.setRadius(700000);

/******************************************************************/
/*               perform HTTP GET requests via AJAX               */
/******************************************************************/

const performHttpGet = (url, processResp) => {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                processResp(xmlhttp.responseText);
            }
            else if (xmlhttp.status == 400) {
                console.log('There was an error 400');
            }
            else {
                console.log('An error has occured');
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};

/******************************************************************/
/*    perform HTTP GET requests via AJAX and update map plots    */
/******************************************************************/

// API docs: https://wheretheiss.at/w/developer
const positionUrl = 'https://api.wheretheiss.at/v1/satellites/25544';

const updateMap = (resp) => {
    const { latitude, longitude } = JSON.parse(resp);

    iss.setLatLng([latitude, longitude]);
    isscirc.setLatLng([latitude, longitude]);
    map.panTo([latitude, longitude], animate = true);

    setTimeout(() => performHttpGet(positionUrl, updateMap), 5000);
}

performHttpGet(positionUrl, updateMap)
