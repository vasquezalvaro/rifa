
var audiotag3;
var WW;
var WH; 
var ll;

var MAXNJ=20;     // *******  Maximo hasta 20  ****************
var numj;
var losnumeros = [] ;
var losangulos = [] ;
var hansalido = [] ;
var aborrar = [] ; 
var longn = [] ; 
var cxn = [] ; 
var cyn = [] ; 
var longab;
var g;      // indice de numero ganador
var angulog;
var factang;
var numvueltas=0;
var unavez=0;
var angb;
var dosseg;

function preload() {

  audiotag3=loadSound("beep1.wav");
}

function setup() { 
	//createCanvas(displayWH, displayWW); 
	WW = window.innerWidth;
    WH = window.innerHeight;
    	//WW = displayWW;
        //WH = displayWH;
	createCanvas(WW, WH);

	//frameRate(10); 
myurl=location.href; 
//var url_string = location.href;
//var url = new URL(url_string);
 //numj = url.searchParams.get("numj");
ll=WW*0.25;
// *****************************************************************************************
//ll=WW*0.27;
// *****************************************************************************************

numj=0; 
background(51,51,51);
fill(151);
textSize(18);
textAlign(LEFT, BOTTOM);
text("Seleccione el número de participantes en la rifa (3-20):", 25,45);

var xnj=60;
var ynj=100;

    fill(51);
    noStroke();
    rectMode(CORNER);   
    rect(25, 60, 925, 100);
for (var i = 0; i < MAXNJ-2; i++) {
    textSize(36);
    xnj=i*50+50
    noFill();
    stroke(201);
    rectMode(CENTER);
    rect(xnj,ynj,44,44);
    
    fill(151);    
    textAlign(CENTER, CENTER);
    noStroke();
    text(i+3, xnj, ynj);
 } 

strokeWeight(2); 
}  // end of setup


function draw() {
var ya=hour()*3600+minute()*60+second();
if (numvueltas > numj-1 && numj>0) {
    mostrarganador();
    return;
  }
  
    if (ya >= dosseg) 
    {
      dosseg=hour()*3600+minute()*60+second()+2;
      //text("nv:"+numvueltas, 30, numvueltas*30+30);
      //borrar(aborrar[numvueltas]); 
      borrar(numvueltas); 
      numvueltas=numvueltas+1;      
    }  

}  // end draw


function continuar() {
//MAXNJ=36;     // *******  Maximo hasta 20  ****************
//numj=36;
background(51,51,51);
noLoop();
//frameRate(5*numj); 
mx=0;
my=0;

dosseg=hour()*3600+minute()*60+second()+2;
numvueltas=0;
unavez=0;
// Selecciona un numero ganador
for (var i = 0; i < MAXNJ; i++) {
      losnumeros[i] = 0;
      hansalido[i] = 0;
 }
seleccnumeros();
g = indganador();

// generar arreglo para eliminar numeros al azar
for (var i = 0; i < MAXNJ; i++) {
      aborrar[i] = 0;
      hansalido[i] = 0;
 }
seleccaborrar();
// Muestra los numeros en juego al azar en forma de reloj
mostrarlosnumeros();
      
} // end of continuar
	 

function mouseDragged()
{
  // code that happens when the mouse moves
  // with the button down
}

function mousePressed()
{

}

function mouseMoved() {
var xnj=60;
var ynj=100;
var mx;
var my; 
var tnumj;
mx=mouseX;
my=mouseY;

 if (numj == 0 && my > 70 && my < 130 && mx > 25 && mx < 925) {  // rectangulo  de numeros a jugar para definir numj
    setup(); 
    tnumj=int((mx-25)/50) + 3;
    
    ellipseMode(CENTER);
    fill(255,102,0);      
    ellipse((tnumj-3)*50+50, 65, 10, 10);    

    xnj=(tnumj-3)*50+50; 
    text(tnumj, xnj, ynj);
  }
}
function mouseReleased()
{
  // code that happens when the mouse button is released 
var mx;
var my; 
loop();
unavez=0;  
mx=mouseX;
my=mouseY;
if (my > 70 && my < 130 && mx > 25 && mx < 925) {  // rectangulo  de numeros a jugar para definir numj  
      noLoop();
      numj=int((mx-25)/50) + 3;
      continuar();
      
    //text(mx,mx,150);
    //text(int((mx-147)/55) + 3, mx , 200);
      return;  
      //text(numj, mx , 200);
      //text(mx, mx , 400);
 }

 if (mx > 10 && mx < 110 && my < 30) {  // rectangulo  REINICIAR 
    window.location.href = myurl; 
    return;
 }
// click en cualquier parte de la pantalla


}

function mostrarlosnumeros() {

var ts=48;
// *********************dis1 y d para mostrar #s alrededor de una elipse *****************
// ******************************************************************      
// ***** para circunferencia dis1=0 *********
// ******************************************************************  
var dis1=0;
      if (numj>20) 
      {
         dis1=125;
         ts=36;         
      }
var d;
var difl;
//if (numj > 20) {
    //ts=24;
  //}
background(51,51,51);
factang=2*PI/numj;
angulog=g*factang;
ellipseMode(CENTER);  //      
  
for (var i=0; i < numj; i++) {
      losangulos[i]=i*factang;
// ******************************************************************      
      if (losangulos[i] <= PI) 
         {
          d=abs(losangulos[i]*dis1/(PI/2));
         } else {
          d=abs((losangulos[i]-PI)*dis1/(PI/2));
       }
    difl=d-dis1;
    
      if (losangulos[i] <=2*PI) 
      {
         longn[i]=(ll+difl);
      }
      if (losangulos[i] <=3*PI/2) 
      {
         longn[i]=(ll-difl);
      }
      if (losangulos[i] <=PI) 
      {
         longn[i]=(ll+difl);
      }
      if (losangulos[i] <=PI/2) 
      {
         longn[i]=(ll-difl);
      }
      if (longn[i] == ll && dis1>0) 
      {
         longn[i]=ll + 15;
      }
    //fill(202,202,202);
    //textAlign(LEFT,TOP);
    //textSize(18);
    //text(int(longn[i]), 10, i*30 + 30);
    //text(ll, 10, i*30 + 30);
    
       
      fill(255,102,0);
      textSize(ts);
      //textAlign(LEFT, BOTTOM);
      textAlign(CENTER, CENTER);
      text(losnumeros[i], WW/2+(longn[i])*cos(losangulos[i])  , WH/2+(longn[i])*sin(losangulos[i]));      
 }
// 	Muestra botones para Reiniciar y Continuar
textAlign(LEFT, BOTTOM);
textSize(18);
fill(151); 
text("REINICIAR", 10, 30); 
text("CONTINUAR", WW  - 120, 30);
}

    
function seleccnumeros()
{
var n;
for (var i = 0; i < numj; i++) {
      n = demeuno();
      losnumeros[i] = n; 
 } 
} 

function seleccaborrar()
{
var n;
var temporalg;
  for (var i = 0; i < numj; i++) {
      n = demeuno();
      aborrar[i] = n-1;   // para guardar indice y no valor
  }
  // pone el ganador de ultimo en arreglo aborrar()
  for (var i = 0; i < numj; i++) {
      if (aborrar[i] == g) {
         temporalg = i;
         aborrar[i] = aborrar[numj-1];
         aborrar[numj-1] = g; 
      }
  }

}
          
function demeuno() {
var m = int(numj+1);
var rn = getRandomInt(1, numj+1);
while (hansalido[rn-1] > 0  || rn > numj) {
  rn = getRandomInt(1, numj+1);
}
 hansalido[rn-1]=1;
 return rn;
}

function indganador() {
var m = int(numj+1);
var rn = getRandomInt(1, numj+1);
while (rn > numj) {
  rn = getRandomInt(1, numj+1);
} 
  return rn-1;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function borrelo(p, longp) {
// p indice en aborrar() desde 0 hasta n-1 ....controlado por numvueltas en draw()
// longp 
//var limll = ll - 44;
//var limll = longp - 25;
var cx=longab*cos(angb);
var cy=longab*sin(angb);
var wr=60;
if (numj > 20) {
    wr=30;
  }
push();
translate(WW/2, WH/2);

ellipseMode(CENTER);
noStroke();
fill(151,151,151);   
ellipse(cx, cy, 5, 5);

fill(201);
      textSize(48);
      //textAlign(LEFT, BOTTOM);
      textAlign(CENTER, CENTER);
      text(losnumeros[aborrar[p]], longp*cos(angb), longp*sin(angb));   
      
if (longab>=longp-25) {
    fill(61,61,61);
	ellipseMode(CENTER);  //     
	ellipse((longp)*cos(angb), (longp)*sin(angb), 60, 60);  
}
pop();      
}

function borrar(p) {
// p indice en aborrar() desde 0 hasta n-1 ....controlado por numvueltas en draw()
var abn=aborrar[p];   // indice en  # a borrar
var limll;
for (var i = 0; i < numj; i++) {
      if (aborrar[p] == i) {
         limll = longn[i];
      }
  }
//text(losnumeros[abn], 50, p*30 + 60);
//text(limll, 80, p*30 + 60); 
if (p >= numj-1) {    //  ( p == g || p > numj-1)    ************************************ p>
    //alert(losnumeros[g]);
    return;
}
angb=losangulos[aborrar[p]]; 
longab=0;
var id = setInterval(frame, 75);
  
  function frame() {
    if (longab>limll) {
      clearInterval(id);
      dosseg=hour()*3600+minute()*60+second()+2;
    } else {
      borrelo(p, limll);
      longab=longab+25;
    }  //end if
  }  // end funct frame

}  // end funct mover

function mostrarganador() {

background(51,51,51);
	while ( unavez==0 ) {
		 audiotag3.play();
		 unavez=1;
	 }
	fill(51,51,51);
	stroke(255,102,0);
	ellipseMode(CENTER);  //     
	ellipse(WW/2, WH/2, WH, WH);   
	noStroke();
	fill(255,102,0);   
	ellipse(WW/2, WH/2, 120, 120);   
	fill(51,51,51);
	textAlign(CENTER, CENTER);
	textSize(96);
	text(losnumeros[g],WW/2, WH/2);
	textAlign(LEFT, BOTTOM);
textSize(18);
fill(151); 
text("REINICIAR", 10, 30); 

}