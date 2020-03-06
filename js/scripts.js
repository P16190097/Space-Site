
/***********************************************/
/* generic functions for getting current page dimensions in px  */
/***********************************************/

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

/***********************************************/
/*   toggle responsive navbar for mobile view  */
/***********************************************/

const toggelNavbar = () => {
    var x = document.getElementById("topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
        //x.style.maxHeight('198px');
    } else {
        x.className = "topnav";
        //x.style.maxHeight('0px');
    }
}

document.getElementById("navToggle").addEventListener("click", toggelNavbar);

/***********************************************/
/* reset the responsive navbar on page resize  */
/***********************************************/

const setNav = () => {
    x = document.getElementById("topnav");
    if (getWidth() >= 768 && x.className === 'topnav responsive') {
        x.className = 'topnav';
    }
}

window.onresize = setNav();

/***********************************************/
/*     perform HTTP GET requests via AJAX      */
/***********************************************/

const ajaxGetRequest = (url, setContent) => {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                console.log(JSON.parse(xmlhttp.responseText));
                setContent(JSON.parse(xmlhttp.responseText));
            }
            else if (xmlhttp.status == 400) {
                console.log('There was an error 400');
            }
            else {
                console.log('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

const demoUrl = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`
const setImg = (img) => {
    document.getElementById("main").innerHTML = `<img src="${img.url}" class="logo-img" />`;
    document.getElementById("loader").className += ' hidden';
}

ajaxGetRequest(demoUrl, setImg);

/***********************************************/
/*             HTML5 canvas script             */
/***********************************************/

