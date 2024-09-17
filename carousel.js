// Variables initialization
var radius = screen.width < 768 ? 10 : 250;
var autoRotate = true;
var rotateSpeed = -60;
var imgWidth = screen.width < 768 ? 120 : 300;
var imgHeight = screen.width < 768 ? 170 : 400;

setTimeout(init, 1000);

// Select DOM carousel elements
var odrag = document.querySelector('#drag-container');
var ospin = document.querySelector('#spin-container');
var aImg = ospin.getElementsByTagName('img');
var aEle = [...aImg];

// Set image dimensions
ospin.style.width = imgWidth + 'px';
ospin.style.height = imgHeight + 'px';

var ground = document.querySelector('#ground');
ground.style.width = radius * 3 + 'px';
ground.style.height = radius * 3 + 'px';

// Setup initial delay time
function init() {
    for (var i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
        aEle[i].style.transition = 'transform 1s';
        aEle[i].style.transitionDelay = `${i / 4}s`;
    }
}

// set up object transform
function applyTransform(object) {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;
    object.style.transform = 'rotateX(${-tY}deg) rotateY(${tX}deg)'

}

// play object 
function playSpin(yes = true){
    ospin.style.animationPlayState = yes ? 'running' : 'paused';
}

// variables initialization
var sX,
sY,
nX,
nY,
desX = 0;
desY = 0;
tX = 0;
tY = 0;

// enable auto rotating effect
if (autoRotate) {
    var animationName = rotateSpeed > 0 ? 'spin' : 'spinRevert';
    ospin.style.animation = '${animationName} ${Math.abs(rotateSpeed)}s infinite linear';
}

// enable on pointer down effect
odrag.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    var sX = e.clientX,
    sY = e.clientY
    
    // pointer move effect,
    this.onpointermove = function (e) {
        var nX = e.clientX;
        nY = e.clientY;
        desX = nX - sX;
        desY = nX - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTransform(odrag);
        sX = nX;
        sY = nY;
    };

    // pointer up effect 
    this.onpointerup = function (e) {
        odrag.timer = setInterval( () => {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTransform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5){
                clearInterval (odrag.timer);
                playSpin(true);
            }
        } , 17);
        this.onpointermove = this.onpointerup = null;
       
    };
    return false;

};

// enable mouse wheel effect 
odrag.onmousewheel = function (e) {
    e = e|| window. event;
    var d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    init(1);
};