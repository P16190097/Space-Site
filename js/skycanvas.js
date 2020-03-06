/***********************************************/
/*             HTML5 canvas script             */
/***********************************************/

canvas = document.getElementById('star-canvas');
ctx = canvas.getContext("2d");

const canvasWrapper = document.getElementById('star-canvas-wrapper');
const positionInfo = canvasWrapper.getBoundingClientRect();

canvas.width = positionInfo.width;
canvas.height = positionInfo.height;

var estrelas = [];

const createStars = () => {
    estrelas = [];
    for (i = 0; i < canvas.width; i++) {
        estrelas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            raio: Math.random(),
        })
    }
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    for (i = 0; i < estrelas.length; i++) {
        var e = estrelas[i];
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.raio, 0, 2 * Math.PI);
        ctx.fill();
    }
}

const update = () => {
    for (i = 0; i < estrelas.length; i++) {
        var e = estrelas[i];
        e.raio = Math.random();
    }
}

createStars();

const pulse = () => {
    update();
    draw();
    requestAnimationFrame(pulse);
}

pulse();

const resizeCanvasContainer = () => {
    const x = document.getElementById('star-canvas-wrapper');
    const positionInfo = x.getBoundingClientRect();
    canvas.width = positionInfo.width;
    canvas.height = positionInfo.height;
};

window.onresize = () => {
    resizeCanvasContainer();
    createStars();
}         
