//reference http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple

$(document).ready(function() {

    $("#canvasDiv").hide();

    $("#noteAccess").button().click(function() {
        $("#canvasDiv").toggle("slide", 500);
    });
    
//    $("#noteBox").position({
//        of: $("#book"),
//        my: "left center",
//        at: "right center"
//    });

    $("#clearCanvas").button().click(function() {
        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        redraw();
    });
    
    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;
    var canvasWidth = $("#canvasDiv").css("width");//490;
    var canvasHeight = $("#canvasDiv").css("height");//220;
    var context;
    var canvas;

    var canvasDiv = document.getElementById('canvasDiv');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");
    

    $('#canvas').mousedown(function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    $('#canvas').mousemove(function(e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    $('#canvas').mouseup(function(e) {
        paint = false;
    });

    $('#canvas').mouseleave(function(e) {
        paint = false;
    });

    function addClick(x, y, dragging)
    {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

    function redraw() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

        context.strokeStyle = "#aaaaaa";
        context.lineJoin = "round";
        context.lineWidth = 5;

        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.stroke();
        }
    }
});