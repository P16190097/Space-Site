let navOpen = false;

window.onresize = setNav();

const getWidth = () => {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth,
    );
}

const getHeight = () => {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight,
    );
}

function toggelNavbar() {
    var x = document.getElementById("topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
        //x.style.maxHeight('198px');
    } else {
        x.className = "topnav";
        //x.style.maxHeight('0px');
    }
}

const setNav = () => {
    x = document.getElementById("topnav");
    if (getWidth() >= 768 && x.className === 'topnav responsive') {
        x.className = 'topnav';
    }
}

const ajaxGetRequest = (url, setContent) => {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                alert('Request success');
                //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
                setContent(JSON.parse(xmlhttp.responseText));
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}