const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d") 

canvas.height = 512;
canvas.width = 448; 

//variables pilota
const radiPilota = 7;

let x = canvas.width / 2
let y = canvas.height -30

//Velocitat pilota
let dx = 4
let dy = -4

//Variables pala 
let amplePala = 70;
let alturaPala = 10;

let sensibilitat = 8;
let dreta = false
let esquerra = false 
let palaX =( canvas.width-amplePala)/2
let palaY = canvas.height- alturaPala -10


function pintarPala(){
    ctx.fillStyle = "#FFFF"
    ctx.fillRect(palaX, palaY, amplePala, alturaPala)
}

function inicialitzadorEvents (){
    document.addEventListener('keydown', pulsar);
    document.addEventListener('keyup', soltar);

    function pulsar (event){

        if (event.key == 'ArrowRight' || event.key == 'd'){
            dreta = true 
        }
        if(event.key == 'ArrowLeft' || event.key == 'a'){
            esquerra = true 
        }
        if(event.key == '+'){
            amplePala = 2*amplePala
        }
        if(event.key == '-'){
            amplePala = amplePala /2 
        }

    }

    

    function soltar (event){
        if (event.key == 'ArrowRight' || event.key == 'd'){
            dreta = false;
        }
        if(event.key == 'ArrowLeft' || event.key == 'a'){
            esquerra = false;
        }
        

    }
}

function pintarPilota(){
    ctx.beginPath();
    ctx.arc(x,y, radiPilota, 0, Math.PI*2);
    ctx.fillStyle = "#FFFF";
    ctx.fill()
    ctx.closePath();

}

function pintarMurs(){

}

function deteccioColisio(){

}


function movimentPilota(){
    if(x + dx >= canvas.width || x + dx <=0){
        dx= -dx
    } 

    if(y + dy <= 0){
        dy = -dy 
    }
    if(y + dy > canvas.height ){
        console.log("GAME OVER")
        document.location.reload();
    }
   
    x += dx;
    y += dy;

}

function movimentPala(){
    if(dreta && palaX < canvas.width - amplePala){
        palaX += sensibilitat

    }else if (esquerra && palaX > 0 ){
        palaX -= sensibilitat
    }

}

function borrarPantalla(){
    canvas.height = 512;
    canvas.width = 448;
}

function pintarCanvas(){
    console.log("Hola");
    borrarPantalla();
    pintarPilota();
    pintarPala();
    pintarMurs();
    deteccioColisio();
    movimentPilota();
    movimentPala();
    window.requestAnimationFrame(pintarCanvas);
}

pintarCanvas();
inicialitzadorEvents();