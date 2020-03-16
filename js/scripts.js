
/*****************************************************************/
/*  generic functions for getting current page dimensions in px  */
/*****************************************************************/

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

const performHttpGet = async (url, processResp, onFail) => {
    let response = await fetch(url)

    if (response.ok) {
        const result = await response.json()
        console.log(result);
        processResp(result);
    }
    else {
        console.log('An error has occured');
        onFail(response);
    }
};

/***********************************************/
/*     html5 canvas header drawing script      */
/***********************************************/

const resizeReset = () => {
    const canvas = document.getElementById('mesh-canvas');
    w = canvasBody.width = canvas.offsetWidth;
    h = canvasBody.height = canvas.offsetHeight;
};

const opts = {
    particleColor: "rgb(200,200,200)",
    lineColor: "rgb(200,200,200)",
    particleAmount: 10,
    defaultSpeed: 1,
    variantSpeed: 1,
    defaultRadius: 2,
    variantRadius: 2,
    linkRadius: 200,
};

window.addEventListener("resize", () => {
    deBouncer();
});

const deBouncer = () => {
    clearTimeout(tid);
    tid = setTimeout(() => {
        resizeReset();
    }, delay);
};

const checkDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const linkPoints = (point1, hubs) => {
    for (let i = 0; i < hubs.length; i++) {
        let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
        let opacity = 1 - distance / opts.linkRadius;
        if (opacity > 0) {
            drawArea.lineWidth = 0.5;
            drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
            drawArea.beginPath();
            drawArea.moveTo(point1.x, point1.y);
            drawArea.lineTo(hubs[i].x, hubs[i].y);
            drawArea.closePath();
            drawArea.stroke();
        }
    }
}

Particle = function (xPos, yPos) {
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

const setup = () => {
    particles = [];
    resizeReset();
    for (let i = 0; i < opts.particleAmount; i++) {
        particles.push(new Particle());
    }
    window.requestAnimationFrame(loop);
}

const loop = () => {
    window.requestAnimationFrame(loop);
    drawArea.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    for (let i = 0; i < particles.length; i++) {
        linkPoints(particles[i], particles);
    }
}

const canvasBody = document.getElementById('mesh-canvas'),
    drawArea = canvasBody.getContext("2d");
let delay = 200, tid,
    rgb = opts.lineColor.match(/\d+/g);
resizeReset();
setup();
