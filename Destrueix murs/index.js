const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d") 

canvas.height = 512;
canvas.width = 448; 


const murs = [];
const ESTAT_MUR = {
DESTRUIT : 0 ,
MOSTRA : 1
}

const tenis = document.getElementById("tenis")

const sprites = document.getElementById ("sprites")
const m = document.getElementById ("m")
const corazones = document.getElementById("corazones")

let colors = ["#ff5733","#ff8a33","#f0ff33","#33beff","#1d6d92","#0336f2","#1e2b5b","#5407ef","#39275b","#66448c","#f105cd","#872a79","#eab1d3","#6d1549"]


let vides = 3
//variables pilota
let radiPilota = 7;

let x = canvas.width / 2
let y = canvas.height -30

//Velocitat pilota
let dx = 4
let dy = -4

//Variables pilota tenis 
let ampleTenis = 20;
let alturaTenis = 10;

//Variables pala 
let amplePala = 70;
let alturaPala = 8;

//Variables dels mexicans 
const filas = 6 ;
const columnes = 12;
const ampleMur = 30;
const alturaMur = 14;
const margeTMur = 80;
const margeEMur = 30;
const sepMur = 2;

var score = 0;


let sensibilitat = 8;
let dreta = false
let esquerra = false 
let palaX =( canvas.width-amplePala)/2
let palaY = canvas.height- alturaPala -10


for (let c = 0; c<columnes; c++){
    murs[c] = [];
    for (let f=0; f<filas; f++){
        color = Math.floor(Math.random()*9)
        const murX = margeEMur+c* (ampleMur + sepMur);
        const murY = margeTMur+f* (ampleMur + sepMur);
        murs [c] [f] = {
            x :murX,
            y: murY,
            status: ESTAT_MUR.SHOW,
            color: color

        }
    }
}


function pintarPala(){

    ctx.drawImage(
        sprites, 
        15, 
        174, 
        amplePala, 
        alturaPala,
        palaX,
        palaY, 
        amplePala,
        alturaPala, 
    )
}

function inicialitzadorEvents (){}
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

        /*if(event.key == 'c')
            let dxNova = dx
            let dyNova = dy;
            
            dx = 0;
            dy = 0;

            setTimeout(() =>{
                dx = dxNova;
                dy = dyNova;
            }, 1000)
        
        }*/

    }

    function soltar (event){
        if (event.key == 'ArrowRight' || event.key == 'd'){
            dreta = false;
        }
        if(event.key == 'ArrowLeft' || event.key == 'a'){
            esquerra = false;
        }
        
    }


function pintarPilota(){
    ctx.beginPath();
    ctx.arc(x,y, radiPilota, 0, Math.PI*2);
    ctx.fillStyle = "#FFFF";
    ctx.fill()
    ctx.closePath();


    ctx.drawImage(
        tenis, 
        0, 
        15,
        512, 
        ampleTenis,
        alturaTenis, 
        tenis.x, 
        tenis.y,
        ampleTenis, 
        alturaTenis, 

        
    )



}

function pintarMurs(){
    for(let c=0; c<columnes; c++){
        for(let f=0; f<filas; f++){
       const murActual = murs[c][f];
        if (murActual.status == ESTAT_MUR.DESTRUIT){
            continue;
        }
       
       // ctx, fillStyle = murActual.color;
       // ctx.rect (murActual.x,murActual.y,ampleMur,alturaMur);
        //ctx.fill();
       
        let clipX = murActual.color*16
        ctx.drawImage(
            m, 
            clipX,
            0,
            15,
            6,
            murActual.x,
            murActual.y,
            ampleMur,
            alturaMur,

             )
        } 
    }

}

function deteccioColisio(){
    for(let c=0; c<columnes; c++){
        for(let f=0; f<filas; f++){
        const murActual = murs[c][f];
        if (murActual.status == ESTAT_MUR.DESTRUIT){
            continue;
        }

        const mateixaXMur =  x > murActual.x && x < murActual.x + ampleMur
        const mateixaYMur = y > murActual.y && y < murActual.y + alturaMur
        if(mateixaXMur && mateixaYMur){
        dy = -dy;
            murActual.status = ESTAT_MUR.DESTRUIT
            score++;
            if(score == 60){
                alert("¡FELICIDADES, HAS GANADO!")
                console.log ("¡FELICIDADES, HAS GANADO!")
                document.location.reload;
            }
        }

    
        
    }


    }
}

function score(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score" + score, 8, 20);
}




function movimentPilota(){
    if (x + dx >= canvas.width - radiPilota || x + dx <= 0 + radiPilota) {
        dx = -dx;
    }
    
    if (y + dx <= 0) {
        dy = -dy;
    }
    
    if (y + dy > palaY && x > palaX && x < palaX + amplePala) {
        dy = -dy;
    }
    
    if (y + dy > canvas.height) {
        vides--;
       document.getElementById("corazon").src =""

    if(vides == 3){
        document.getElementById("corazon").src = "./" 

     if (vides == 2){
        document.getElementById("corazon").src = "./"
     }

     if (vides == 2){
        document.getElementById("corazon").src = "./"
     }

    }
   
 
       
       



    radiPilota = 9;
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    amplePala = 50;
    alturaPala = 10;
    sensibilitat = 8;
    dreta = false;
    esquerra = false;
    palaX = (canvas.width - amplePala) / 2;
    palaY = canvas.height - alturaPala - 10;
       
        if (vides == 0) {
            alert("GAME OVER");
            console.log("GAME OVER");
            document.location.reload();
        }
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

function pintarPilota(){
    ctx.beginPath();
    ctx.arc(x, y, radiPilota, 0, Math.PI * 2)
    ctx.fillStyle = "black"
    ctx.fill();
     ctx.drawImage(
        sprites, 
        15, 
        175, 
        amplePala, 
        alturaPala,
        palaX,
        palaY, 
        amplePala,
        alturaPala, 
    )
    

    ctx.closePath();
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
    ctx.fillText("Vides:" + vides, 30, 30);
    ctx.fillText("Score:" + score, 30, 15);

    window.requestAnimationFrame(pintarCanvas);
}

pintarCanvas();
inicialitzadorEvents();


























































