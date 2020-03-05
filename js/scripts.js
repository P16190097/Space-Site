let navOpen = false;

window.onresize = setNav();

const getWidth = () => {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

const getHeight = () => {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
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

function setNav() {
    x = document.getElementById("topnav");
    if (getWidth() >= 768 && x.className === 'topnav responsive') {
        x.className = 'topnav';
    }
}