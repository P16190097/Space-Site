let navOpen = false;

function toggleNav() {
    if (navOpen) {
        document.querySelector("nav").style.left = "-220px";
        //document.querySelector("main").style.marginLeft = "0";
        document.getElementById("navController").innerHTML = '<i class="fa fa-angle-right"></i>';
        navOpen = false;
    }
    else {
        document.querySelector("nav").style.left = "0";
        //document.querySelector("main").style.marginLeft = "250px";
        document.getElementById("navController").innerHTML = '<i class="fa fa-angle-left"></i>';
        navOpen = true;
    }

}

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

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}