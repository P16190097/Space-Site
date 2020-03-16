
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
    const x = document.getElementById("topnav");
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
    const x = document.getElementById("topnav");
    if (getWidth() >= 768 && x.className === 'topnav responsive') {
        x.className = 'topnav';
    }
}

window.onresize = setNav();

/***********************************************/
/*     perform HTTP GET requests via AJAX      */
/***********************************************/

const performHttpGet = async (url, processResp) => {
    let response = await fetch(url)

    if (response.ok) {
        const result = await response.json()
        console.log(result);
        processResp(result);
    }
    else {
        console.log('An error has occured');
    }
};

/***********************************************/
/*     nasa API url and response function      */
/***********************************************/

const demoUrl = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`
const setImg = (resp) => {
    const { url } = resp;
    document.getElementById("img").innerHTML = `<img src="${url}" class="logo-img" />`;
}

//performHttpGet(demoUrl, setImg);

