# CTEC3905 Assignment

This is very basic boilerplate code for you to get started with.

## index.html

The `index.html` file includes a basic template with a link to the `css/styles.css` file and a script tag after the main content which links to the `js/scripts.js` file.

```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>P-Number</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  
  <h1>Hello World</h1>

  <script src="js/scripts.js"></script>
</body>
</html>
```

## css/styles.css

The `css/styles.css` file contains a basic starting template for a responsive page.

```
/* MOBILE AND GLOBAL STYLES */

/* applies to screens smaller than 500px (first breakpoint) */
/* and above unless overwritten below */

body {
  background: #fcc;
} 



/* TABLET STYLES */

@media screen and (min-width: 500px) {

  /* applies to screens wider than 499px */
  
  body {
    background: #cfc;
  } 
}



/* DESKTOP STYLES */

@media screen and (min-width: 1000px) {

  /* applies to screens wider than 999px */

  body {
    background: #ccf;
  } 
}

```

## js/scripts.js

The `js/scripts.js` file contains a simple console.log statement to confirm that it is being executed.

```
console.log("hello");
```

## References

Information references are as follows:

### Content

https://www.nasa.gov/mission_pages/station/research/experiments_category
https://www.issnationallab.org/about/iss-timeline/
https://wheretheiss.at/w/developer
http://thenewcode.com/1159/Create-a-Dynamic-Point-Mesh-Animation-with-HTML5-Canvas

### Code

https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
https://www.w3schools.com/howto/howto_css_timeline.asp
https://leafletjs.com/examples/quick-start/
http://open-notify.org/Open-Notify-API/

### Images

https://starwarsblog.starwars.com/wp-content/uploads/sites/6/2017/09/casis-final-patch.jpg
https://i.pinimg.com/originals/3d/9a/34/3d9a34e26a24d68df0972adef47c9855.jpg
https://spaceflight.nasa.gov/gallery/images/station/assembly/html/sts101-714-028.html
https://github.com/nasa/nasapress/blob/master/dist/images/favicons/favicon.ico
https://i.redd.it/gnvrehb4tva41.jpg
https://www.scienceabc.com/wp-content/uploads/2019/05/Astronauts-wear-oxygen-mask-on-iss-weaer.jpg
https://www.nanonics.co.il/images/Client_Logos/nasa-logo-min.png
http://open-notify.org/Open-Notify-API/map/ISSIcon.png
