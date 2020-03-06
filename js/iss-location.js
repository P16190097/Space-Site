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

let iss = L.marker([0, 0], { icon: ISSIcon }).addTo(map);
let isscirc = L.circle([0, 0], 2200e3, { color: "#c22", opacity: 0.3, weight: 1, fillColor: "#c22", fillOpacity: 0.1, radius: 200 }).addTo(map);

/***********************************************/
/*     perform HTTP GET requests via AJAX      */
/***********************************************/

const getISSLocation = () => {
    let xmlhttp = new XMLHttpRequest();

    document.getElementById("loader").className = 'loader-wrapper';

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                const { iss_position } = JSON.parse(xmlhttp.responseText);
                // console.log(iss_position);
                iss.setLatLng([iss_position.latitude, iss_position.longitude]);
                isscirc.setLatLng([iss_position.latitude, iss_position.longitude]);
                map.panTo([iss_position.latitude, iss_position.longitude], animate = true);
            }
            else if (xmlhttp.status == 400) {
                console.log('There was an error 400');
            }
            else {
                console.log('something else other than 200 was returned');
            }
            document.getElementById("loader").className += ' hidden';
        }
    };

    xmlhttp.open("GET", 'http://api.open-notify.org/iss-now.json', true);
    xmlhttp.send();

    setTimeout(getISSLocation, 5000);
};

getISSLocation();
