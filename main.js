// visualization of a random fractal tree

// setup
const angle_slider = document.querySelector("#angle");
const randomize = document.querySelector("#random");
const w = 1000;
const h = 600;

// canvas setup
const canvas = document.querySelector("#canvas");
canvas.width = w;
canvas.height = h;
const ctx = canvas.getContext("2d");

// vars for drawing
let angle = Math.PI * 0.25; // 45 deg
let size = 100;
let size_down = 0.65;
let max_iterations = 10;
let sides = 3;
let branches = 1;

angle_slider.addEventListener("input", ()=>{
    angle_slider.nextElementSibling.innerHTML = angle_slider.value;
    angle = angle_slider.value * Math.PI / 180;
});

randomize.addEventListener("click", ()=>{
    angle = random(0, 360) * Math.PI / 180;
    angle_slider.nextElementSibling.innerHTML = Math.floor(angle * 180 / Math.PI);
    angle_slider.value = Math.floor(angle * 180 / Math.PI);
    sides = random(1, 10);
    size = random(80, 100);
    max_iterations = random(3, 12);
    sides = random(1, 10);
});

ctx.strokeStyle = "#ccc";
ctx.lineWidth = 1;

function draw(){
    // ctx.fillRect(0,0,w,h);
    ctx.clearRect(0, 0, w, h);
    
    ctx.save();
    ctx.translate(w*0.5, h*0.5);
    for(let i = 0; i < sides; i++){
        ctx.rotate(Math.PI * 2 / sides);
        drawFractal(0, size);
    }
    ctx.restore();
    
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

function drawFractal(iteration, size){
    if(iteration >= max_iterations) return;
    line(0, 0, size, 0);

    for(let i = 0; i < branches; i++){
        ctx.save();
        ctx.translate(size - i * size / branches, 0);
        ctx.rotate(angle);
        drawFractal(iteration + 1, size * size_down);
        ctx.restore();
    
        ctx.save();
        ctx.translate(size - i * size / branches, 0);
        ctx.rotate(-angle);
        drawFractal(iteration + 1, size * size_down);
        ctx.restore();
    }
}

function line(startX, startY, endX, endY){
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}