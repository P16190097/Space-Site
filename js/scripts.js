console.log("hello");

let navOpen = false;

function toggleNav() {
    if ((getWidth()) >= 768) {
        if (navOpen) {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
            document.getElementById("navController").innerHTML = '<i class="fa fa-angle-right"></i>';
            navOpen = false;
        }
        else {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
            document.getElementById("navController").innerHTML = '<i class="fa fa-angle-left"></i>';
            navOpen = true;
        }
    }
    else {
        if (navOpen) {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementsByTagName("main").style.marginLeft = "0";
            document.getElementById("navController").innerHTML = '<i class="fa fa-angle-right"></i>';
            navOpen = false;
        }
        else {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementsByTagName("main").style.marginLeft = "250px";
            document.getElementById("navController").innerHTML = '<i class="fa fa-angle-left"></i>';
            navOpen = true;
        }
    }

}

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}
