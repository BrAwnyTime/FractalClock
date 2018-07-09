function init(){

    const canvas = document.getElementById("canvas");
    const setup = {
        canvas: canvas,
        ctx: canvas.getContext("2d"),
        startDepth: 10
    };

    const w = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    const h = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    canvas.width = w;
    canvas.height = h;

    setup.radius = (canvas.height / 2) * 0.90;
    setup.ctx.translate(canvas.width / 2, canvas.height / 2);
    setup.ctx.fillStyle="white";

    setInterval(drawClock, 10, setup);
}

function drawClock(setup) {

    clearClock(setup);
    //drawFace(ctx, radius);
    const now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds() + now.getMilliseconds() / 1000.0;

    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+(min*Math.PI/(6*60))+(sec*Math.PI/(360*60));

    //minute
    min=(min*Math.PI/30)+(sec*Math.PI/(30*60));

    // second
    sec=(sec*Math.PI/30);

    setup.hour = hour;
    setup.min = min;
    setup.sec = sec;

    //drawNumbers(ctx, radius, sec);
    drawTime(setup, setup.startDepth, setup.radius);
}

function clearClock({ctx, canvas}) {
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0, canvas.width,canvas.height);
    ctx.restore();
}

function drawFace({ctx, radius})
{
    ctx.arc(0, 0, radius, 0 , 2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
}

function drawNumbers({ctx, radius, number})
{
    ctx.save();
    ctx.setTransform(1,0,0,1,0.03 * radius, 0.03 * radius);
    ctx.font = radius*0.05 + "px arial";
    ctx.textBaseline="top";
    ctx.textAlign="left";
    ctx.fillText(number.toString(), 0, 0);
    ctx.restore();
}

function drawTime(setup, depth){
    if (depth <= 0) {
        return 1;
    }

    if(depth >= setup.startDepth)
    {
        drawHand(setup, setup.hour, depth, setup.radius*0.125);
    }
    else
    {
        //drawHand(ctx, hour, radius*0.125, hour, min, sec, depth);
    }
    drawHand(setup, setup.min, depth, (setup.radius*0.25)*(depth/setup.startDepth));
    drawHand(setup, setup.sec, depth, (setup.radius*0.25)*(depth/setup.startDepth));

}

function drawHand(setup, pos, depth, length) {
    const ctx = setup.ctx;
    if(depth >= setup.startDepth)
    {
        ctx.lineWidth=1.75;
        ctx.strokeStyle="rgba(255,255,255,1)";
    }
    else
    {
        ctx.lineWidth=1;
        ctx.strokeStyle = 'rgba(255,255,255,' + (depth)/(setup.startDepth * 2) + ')';
    }
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();

    if(pos !== setup.hour){
        ctx.save();
        ctx.translate(0, -length);
        if(depth <= setup.startDepth){
            //ct.rotate(-hour);
        }
        drawTime(setup, depth - 1);
        ctx.restore();
    }

    ctx.rotate(-pos);

}