# CTEC3905 Assignment

This is very basic boilerplate code for you to get started with.

## Issues faced

I ran into a number of issus whilest developing aspects of the site including when designing and building the basic site layout, ensuring all aspects of the site was reponsive and fully mobile compatible and writing the scripts which control the more dynamic features of the site such as the canvas header and the ISS live tracker.  

### Layout 

One of the most difficult problems encountered whilest building the site base layout was the structuring of the canvas header. This is because canvases cannot wrap around HTML content and so in order to have it fit the dimensions of the header it had to be absolutely positioned which created overlay issues with the header logo and responsive navigation bar button both in mobile and desktop views. To overcome this I set the the following canvas styles:

```
#mesh-canvas {
  position: absolute;
  width: 100%;
  height: 66px;
}
```
And for desktop resolutions:
```
#mesh-canvas {
  height: 137px;
}
```

As a result of this positioning however any drawings made on the canvas would display over the top of the logo and mobile nav button and so the container wrapping these elements needed to be positioned relatively as well as setting a fixed height to the header as not to unintendedly collapse down smaller than canvas height overlaying page content. This was accomplished by setting the position and height manually for both mobile and desktop using the following styles:

```
.header-height {
  position: relative;
  height: 66px;
}
```
And the following for desktop:
```
.header-height {
    height: 138px;
  }
```

I also had trouble making the footer stick to the bottom of the page in situations where the page content does not fill the view height whilest ensuring it does not overlap page content in the event that the page content does fill the view height. In the end this was acheived utilising flexbox to create the following styles:

```
body {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

main {
  flex: 1 0 auto;
}

footer {
  flex-shrink: 0;
}
```

### Styling



### Javascript

Initially when creating the ISS location tracker I used an API which communicated using HTTP (Hypertext Transfer Protocol). The problem with this came when I attempted to deploy a live instance of the site using Github pages which serves the site via HTTPS (Hypertext Transfer Protocol Secure), an extension of HTTP which utilises TLS (Transport Layer Security) to encrypt communication between the server and the client. This however meant that the site hosted on the server could not request 3rd party resources which are transfered in a non secure manor such as HTTP and so I had to instead had to switch to a different API which communicated via HTTPS as shown below using javascript string interpolation to insert the protocol is given otherwise use HTTPS. 

```
const protocol = window.location.protocol !== 'file:' ? window.location.protocol : 'https:';

const positionUrl = `${protocol}//api.wheretheiss.at/v1/satellites/25544`;
```

I also ran into issues when setting the correct classes to the navbar container should the screen dimensions switch between desktop and mobile views using code derived from the responsive navigation bar from w3schools. Previously the navbar would break the constraints of its parent container sliding to the far left of the page as well as fail to open the navbar should the user click the link to open the sliding nav bar in mobile view for the first time however the nav bar would still open should the user click the link a subsequent time. Neither of these behaviours were intended and so had to be remedied using the following logic:

```
const toggelNavbar = () => {
    const x = document.getElementById("topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

document.getElementById("navToggle").addEventListener("click", toggelNavbar);

const setNav = () => {
    const x = document.getElementById("topnav");
    if (getWidth() >= 768) {
        x.className = 'content-width topnav';
    }
    else {
        x.className = 'topnav';
    }
}

setNav();
window.onresize = () => setNav();
``` 

getWidth() is a function for returning the current width of the view window as shown below:

```
const getWidth = () => {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth,
    );
}
```


## References

Information references are as follows:

### Content

- ISS research content can be found [here](https://www.nasa.gov/mission_pages/station/research/experiments_category). 
- Information on the history of the ISS came from [here](https://www.issnationallab.org/about/iss-timeline/). 
- Data on the location of the ISS used in the tracker came from [this API](https://wheretheiss.at/w/developer). 

### Code

- Unmodified responsive navigation bar came from [here](https://www.w3schools.com/howto/howto_js_topnav_responsive.asp). 
- Unmodified styles and markup for the ISS timeline used can be found [here](https://www.w3schools.com/howto/howto_css_timeline.asp). 
- Documentation for how the map was created as well as as some demo code can be found [here](https://leafletjs.com/examples/quick-start/). 
- Initial tracker map API code used can be found [here](http://open-notify.org/Open-Notify-API/). 
- Unmodified script for drawing the canvas animation can be found [here](http://thenewcode.com/1159/Create-a-Dynamic-Point-Mesh-Animation-with-HTML5-Canvas). 

### Images

- Image of the 2017 CASIS star wars patch used on the research page, can be found [here](https://starwarsblog.starwars.com/wp-content/uploads/sites/6/2017/09/casis-final-patch.jpg). 
- Image of the ISS interior used on the home page grid, can be found [here](https://i.pinimg.com/originals/3d/9a/34/3d9a34e26a24d68df0972adef47c9855.jpg). 
- Imgae of the ISS from the year 2000 used on the home grid, can be found [here](https://spaceflight.nasa.gov/gallery/images/station/assembly/html/sts101-714-028.html). 
- NASA Favicon used can be found [here](https://github.com/nasa/nasapress/blob/master/dist/images/favicons/favicon.ico). 
- Lego astronaut image used in the hero header can be found [here](https://i.redd.it/gnvrehb4tva41.jpg). 
- Image of waving astronaut used in the home page grid, can be found [here](https://www.scienceabc.com/wp-content/uploads/2019/05/Astronauts-wear-oxygen-mask-on-iss-weaer.jpg). 
- Imgae of NASA logo used in the page header can be found [here](https://www.nanonics.co.il/images/Client_Logos/nasa-logo-min.png). 
- Icon used for ISS tracker location can be found [here](http://open-notify.org/Open-Notify-API/map/ISSIcon.png). 
