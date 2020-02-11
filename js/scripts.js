let navOpen = false;

function toggleNav() {
    if ((getWidth()) >= 768) {
        if (navOpen) {
            document.querySelector("nav").style.left = "-250px";
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
    else {
        if (navOpen) {
            document.querySelector("nav").style.width = "0";
            document.querySelector("main").style.marginLeft = "0";
            document.getElementById("navController").innerHTML = '<i class="fa fa-angle-right"></i>';
            navOpen = false;
        }
        else {
            document.querySelector("nav").style.width = "250px";
            document.querySelector("main").style.marginLeft = "250px";
            document.getElementById("navController").innerHTML = '<i class="fa fa-angle-left"></i>';
            navOpen = true;
        }
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