const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d") 

canvas.height = 512;
canvas.width = 448; 

//variables pilota
let radiPilota = 7;

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

        if (event.key == 'ArrowRight'){
            dreta = true 
        }
        if(event.key == 'ArrowLeft'){
            esquerra = true 
        }
        if(event.key == '+'){
            amplePala = 2*amplePala
        }
        if(event.key == '-'){
            amplePala = amplePala /2 
        }
       
        if(event.key == 'ArrowUp'){
            radiPilota = 2*radiPilota
        }
        if(event.key == 'ArrowDown'){
            radiPilota = radiPilota /2 
        }

        if(event.key == 'a'){
            sensibilitat = 2*sensibilitat
        }
        if(event.key == 'd'){
            sensibilitat = sensibilitat /2 
        }
      
        if(event.key == 'v'){
            dx = 2* dx
            dy = 2* dy 
        }
        if(event.key == 'f'){
            dy = dy /2
            dx = dx /2
        }

        if(event.key == '2'){

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