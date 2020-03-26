# CTEC3905 Assignment

This website functions as a record of the history and purpose of the International Space Station (ISS) as well as providing the user with an accurate real life representation of the International Space Stations current location above the earth. I chose this subject as it provided an interesting base to demonstrate my knowledge of front end web design as well as push the limits of what can be accomplished using only HTML5, CSS3 and Javascript (ES6). 

## Design Considerations

I designed to the web site to be modular in nature where every page shared a base layout where the main content of the page was easily swappable between any page. This design methodology would make maintneance, modification and development much more manageable as any changes to the script or styles would imact each page in the same way. I also took a similar approach when writing the sites Javascript by refacotring generic reusable functions into the main site script available from any page then calling them when needed from page specific scripts. A good example of this would be how the function I wrote to fetch from 3rd party APIs works. The main script contains the function below: 

```
const performHttpGet = (url, processResp, onFail) => {
  fetch(url).then((response) => {
    if (!response.ok) {
      onFail(response);
      return;
    };
    response.json().then((data) => processResp(data));
  }).catch((error) => onFail(error));
};
```

Which can then be called from any other script embedded on the site which is then done by a seperate script present only on the tracker page as shown below:

```
const protocol = window.location.protocol !== 'file:' ? window.location.protocol : 'https:';

const positionUrl = `${protocol}//api.wheretheiss.at/v1/satellites/25544`;

const updateMap = (resp) => {
  const { latitude, longitude, altitude, velocity } = resp;

  iss.setLatLng([latitude, longitude]);
  isscirc.setLatLng([latitude, longitude]);
  map.panTo([latitude, longitude], animate = true);

  document.getElementById('iss-info').innerHTML = `Latitude: ${latitude}</br>Longitude: ${longitude}</br>Altitude: ${altitude}km</br>Velocity: ${velocity}km/h`;

  setTimeout(() => performHttpGet(positionUrl, updateMap), 5000);
};

const showError = () => {
  document.getElementById('iss-info').innerHTML = `Tracker details could not be fetched`;
};

performHttpGet(positionUrl, updateMap, showError);
```

This methodology also made it much more managable to to style the site as I could take advantage of HTML5s semantic tags to style portions of the site directly rather than having a multitude of classes specific to each page instead which inherently becomes much more difficult to maintain. 

Consideration was also taken to convert any code taken from a 3rd party source into its current format (ES5 to ES6 etc). This includes modifying CSS to use CSS3 styles such as flexbox if appropriate and markup to use semantic tags is applicable. A good example of this can be found in the canvas script as the tutorial supplied used outdated ES5 syntax including ES5 function and class syntax and older style for loops instead of 'for in' iterators. A small excerpt of the refactored code can be seen below:

```
class Particle {
  constructor(xPos, yPos) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = opts.particleColor;
    this.radius = opts.defaultRadius + Math.random() * opts.variantRadius;
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed
    };
    this.update = () => {
      this.border();
      this.x += this.vector.x;
      this.y += this.vector.y;
    };
    this.border = () => {
      if (this.x >= w || this.x <= 0) {
        this.vector.x *= -1;
      }
      if (this.y >= h || this.y <= 0) {
        this.vector.y *= -1;
      }
      if (this.x > w) this.x = w;
      if (this.y > h) this.y = h;
      if (this.x < 0) this.x = 0;
      if (this.y < 0) this.y = 0;
    };
    this.draw = () => {
      drawArea.beginPath();
      drawArea.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      drawArea.closePath();
      drawArea.fillStyle = this.color;
      drawArea.fill();
    };
  };
};

const loop = () => {
  window.requestAnimationFrame(loop);
  drawArea.clearRect(0, 0, w, h);
  for (particle of particles) {
    particle.update();
    particle.draw();
  }
  for (particle of particles) {
    linkPoints(particle, particles);
  }
}
```

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
};
```

### Styling 

The CSS validaion service flags `.lvml	Property behavior doesn't exist : url(#default#VML)` as an error however this is coming from a 3rd party [leaflet stylesheet](https://unpkg.com/leaflet@1.6.0/dist/leaflet.css) which I do not have any control over however is necessary in order for the tracker map to function properly and so I believe this error should be ignored.

## Code Validation

All HTML and CSS is validated using w3.orgs validation service. All HTML validates successfully with no errors however some pages such as the ISS history page return the warning `Warning: Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections`. Given the context of the page however this is unnecessary to do given the content and format of the section and falls under the main page header. The CSS validates successfully for all pages aside from the ISS tracker page which returns the error mentioned above which is unfortunately out of my control.

All pages do however pass web accessibility tests without error using the WAVE accessibility evaluation tool found [here](https://wave.webaim.org/).

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
- Flexbox styles used for positioning the footer can be found [here](https://css-tricks.com/couple-takes-sticky-footer/). 
- getHeight() and getWidth() functions can be found [here](https://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code).

### Images

- Image of the 2017 CASIS star wars patch used on the research page, can be found [here](https://starwarsblog.starwars.com/wp-content/uploads/sites/6/2017/09/casis-final-patch.jpg). 
- Image of the ISS interior used on the home page grid, can be found [here](https://i.pinimg.com/originals/3d/9a/34/3d9a34e26a24d68df0972adef47c9855.jpg). 
- Imgae of the ISS from the year 2000 used on the home grid, can be found [here](https://spaceflight.nasa.gov/gallery/images/station/assembly/html/sts101-714-028.html). 
- NASA Favicon used can be found [here](https://github.com/nasa/nasapress/blob/master/dist/images/favicons/favicon.ico). 
- Lego astronaut image used in the hero header can be found [here](https://i.redd.it/gnvrehb4tva41.jpg). 
- Image of waving astronaut used in the home page grid, can be found [here](https://www.scienceabc.com/wp-content/uploads/2019/05/Astronauts-wear-oxygen-mask-on-iss-weaer.jpg). 
- Imgae of NASA logo used in the page header can be found [here](https://www.nanonics.co.il/images/Client_Logos/nasa-logo-min.png). 
- Icon used for ISS tracker location can be found [here](http://open-notify.org/Open-Notify-API/map/ISSIcon.png). 

## Module Conclusions

I found the module to be very informative and in depth covering a number of web development elements which either self taught or those with only a basic understanding would not have come across before, including the use of semantic tags,  modern methods of layout styling (eg. flexbox, grid) and how pure javascript can be used to interact with the dom without the use of common frameworks (eg. JQuery). 

As someone who was already fairly competent with front end technologies however I feel that it could have been interesting to investigate HTML5 canvases in a bit more depth as a new form of web animation in lectures or labs. 

I found the assessment to be very enjoyable and worthwhile not only for having the opportunity to put use the skills and knowledge gained from the module in a practical sense but also to create a high quality artifact for use in my own personal portfolio of projects which demonstrates my creativity and knowledge of common front end technologies and professional practice. 

I also think the use of GIT and GitHub for version control and repository management is extremely worthwhile as it's been such a big part of my own experience as a student and as a web developer in industry which other modules tend to miss.

These factors together come to create an assessment which mimics an actual industry development project to some extent. 