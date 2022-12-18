let canvas =document.getElementById("canvas"); //canvas object
let ctx = canvas.getContext("2d"); //2d drawing object for canvas
let radius = canvas.height /2; //calculate clock radius
ctx.translate(radius,radius); //center of the canvas
radius=radius*0.80; 
setInterval(drawClock,1000); //draw clock will be called for every second 

// function to draw clock
function drawClock() {
    drawFace(ctx,radius);
    drawNumber(ctx,radius);
    drawTime(ctx,radius);
}
function drawFace(ctx,radius){
    let grad;
    //outer circle of clock
    ctx.beginPath();
    ctx.arc(0,0,radius,0,2*Math.PI);  //create outer circle of clock
    ctx.fillStyle ="rgb(245, 241, 111)";
    ctx.fill();
    //gradient for clock border
    grad=ctx.createRadialGradient(0,0,radius*0.95,0,0,radius*1.05);
    grad.addColorStop(0,'black'); //inner edge of clock
    grad.addColorStop(0.5,'blue'); //middle edge of clock
    grad.addColorStop(1,'black'); //outer edge of clock
    ctx.strokeStyle =grad; 
    ctx.lineWidth =radius*0.1; //width of clock border
    ctx.stroke();
    //clock center point
    ctx.beginPath();
    ctx.arc(0,0,radius*0.07,0,2*Math.PI); // center circle
    ctx.fillStyle ="#333";
    ctx.fill();   
}

function drawNumber(ctx,radius){
    let ang;
    let num;
    //font size of number is 15% of radius
    ctx.font=radius*0.15 +"px arial";
    //set text alignment to center and middle
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    //calculate print position for 12 numbers to 85% of radius
    for(num=1;num<13;num++){
        ang=num*Math.PI/6; //calculate angle
        ctx.rotate(ang);  
        ctx.translate(0,-radius*0.85);
        ctx.rotate(-ang);  
        ctx.fillText(num.toString(),0,0); //text on clock
        ctx.rotate(ang);
        ctx.translate(0,radius*0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx,radius){
    let now=new Date(); //date
    let hour=now.getHours(); //hour
    let minute=now.getMinutes(); //minute
    let second=now.getSeconds(); //second
    //calculate angle of hour hand, length is 50% of radius and 7% width
    hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx,hour,radius*0.5,radius*0.07);
    //calculate angle of minute hand, length is 8% of radius and 7% width
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx,minute,radius*0.8,radius*0.07);
    //calculate angle of second hand, length is 9% of radius and 7% width
    second=(second*Math.PI/30);
    drawHand(ctx,second,radius*0.9,radius*0.02);
}

function drawHand(ctx,pos,length,width){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round'; //style of end of line
    ctx.moveTo(0,0); //how hand will move
    ctx.rotate(pos); 
    ctx.lineTo(0,-length); //adds a new point and creates a line to that point from last specified point in that canvas 
    ctx.stroke(); //draws the path on the canvas
    ctx.rotate(-pos); 
}