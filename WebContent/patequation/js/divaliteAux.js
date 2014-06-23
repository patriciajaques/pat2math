function divaLiteAction(resposta) {
    //Estrutura da resposta
    //0 - id da mensagem
    //1 - boolean: true - se o passo desenvolvido esta correto, false - caso contrario
    //2 - boolean: true - operacao aplicada no passo e a que deveria ser aplicada, false - caso contrario
    //3 - boolean: true - o passo dado e a resposta final, false - caso contrario
    //4 - mensagem
    var respSplit = resposta.split(";");

    char1.movementFactory.doMovement({action: respSplit[0], text: respSplit[1]});
    //verifica se terminou!
    //if (respSplit[3] == 'true') {

    //char1.movementFactory.doMovement({action:'dardo',text:respSplit[4]});	

    //} else {

    //if (respSplit[1] == 'true') {
    //char1.movementFactory.doMovement([{action:'aplauso',text:respSplit[4]},{action:'aplauso'}]);	
    //} else {
    //char1.movementFactory.doMovement({action:'triste',text:respSplit[4]});
    //}
    //}
}

function divaLiteTipAction(dica) {

    char1.movementFactory.doMovement({action: 'thinking_help', text: dica, callback: function() {
            setTimeout(function() {
                showHint(dica);
            }, 3000);
        }
    }); //, callback: showHint(dica) 

    //char1.movementFactory.doMovement({action: 'idle_right', text: dica, callback: function(){showHint(dica);}});
}

function divaLiteTipAnswer(dica) {
    char1.movementFactory.doMovement({action: 'idle', text: dica}); //, callback: showHint(dica)
}

function divaLiteActionPointSide(side) {

    if (side === 'left')
        char1.movementFactory.doMovement({action: 'point_top_left'});
    else
        if (side === 'right')
            char1.movementFactory.doMovement({action: 'point_top_right'});
        else
            char1.movementFactory.doMovement({action: 'point_top'});
    
}

function divaLiteActionSideHint(side, hint) {

    if (side === 'left')
        char1.movementFactory.doMovement({action: 'point_top_left', text: hint});
    else
        if (side === 'right')
            char1.movementFactory.doMovement({action: 'point_top_right', text: hint});
        else
            char1.movementFactory.doMovement({action: 'point_top', text: hint});
    
}

function divaLiteActionPointSideHint(side, hint, x, y) {

    if (side === 'left')
        char1.movementFactory.doMovement({action: 'point_top_left', text: hint, x:x, y:y, speed:100, bubblePosition: 'after'});
    else
        if (side === 'right')
            char1.movementFactory.doMovement({action: 'point_top_right', text: hint, x:x, y:y, speed:100, bubblePosition: 'after'});
        else
            if (side === 'idle')
                    char1.movementFactory.doMovement({action: 'idle', text: hint, x:x, y:y, speed:100, bubblePosition: 'after'});
                else
                    char1.movementFactory.doMovement({action: 'point_top', text: hint, x:x, y:y, speed:100, bubblePosition: 'after'});
    
}


function divaLiteActionPointMove(angle, x, y) {
 
    if (angle === 0)
        char1.movementFactory.doMovement({action: 'idle', text: '', x: x, y: y, speed: 97, ignoreDialog: true});
    else
        if (angle === 45)
            char1.movementFactory.doMovement({action: 'point_top_left', text: '', x: x, y: y, speed: 97, ignoreDialog: true});
        else
            if (angle === 135)
                char1.movementFactory.doMovement({action: 'point_top_right', text: '', x: x, y: y, speed: 97, ignoreDialog: true});
            else
                char1.movementFactory.doMovement({action: 'point_top_right', text: '', x: x, y: y, speed: 97, ignoreDialog: true});
    
}


function divaLiteActionPointHint(angle, dica, x, y) {
    
    if (angle === 45)
        char1.movementFactory.doMovement({action: 'point_45_left', text: dica, x: x, y: y, speed: 97, callback: function(){showHint(dica);}});
    else
        if (angle === 135)
            char1.movementFactory.doMovement({action: 'point_45_right', text: dica, x: x, y: y, speed: 97, callback: function(){showHint(dica);}});
        else
            char1.movementFactory.doMovement({action: 'point_top_right', text: dica, x: x, y: y, speed: 97, callback: function(){showHint(dica);}});
   
}

function divaGetBubbleHeight() {
    return char1.getBubbleHeight();
}

function divaGetBubblePosition() {
    return char1.getBubblePosition();
}

function divaGetCurrentPosition() {
    return char1.getPosition();
}

function divaLiteTipActionMove(dica, x, y) {
    char1.goTo(x, y);
    char1.movementFactory.doMovement({action: 'idle_right', text: dica});

}

function divaLiteMoveTo(y) {
    char1.moveTo(50, y, 1000, null);
}

function divaLiteWidth() {
    return char1.getOptions().pictw;
}

function divaLiteMoveTo(x, y) {
    char1.goTo(x, y);
    //char1.moveTo(x, y);
}

var char1;

function init() {

//    var bookPosition = $("#book").css("margin-left");
//    alert(bookPosition);

    //===========================================================
    //Example 1 -> creates a char without a chatterbot
    var conf1 = {
//        charname: 'pat',                
        charname: 'pepe',
        z_index: 1000,
        pictw: 226,
        picth: 295,
        containerWidth: 226,
        speechBubbleWidth: 200,
        speechBubbleFontSize: 18,
        showControls: false,
        scrollable: true,
        framed: 0,
        movieSpeed: 97,
        showSpeed: false,
        posy: 100,
        posx: 20,
        debug: false,
        frameColor: '#cccccc',
        corporalMovements: [
            {action: 'idle', background: true, priority: 90},
            {action: 'idle_left', background: true, priority: 50},
            {action: 'idle_right', background: true, priority: 49},
            {action: 'thinking', background: true, priority: 10},
            {action: 'waist_hand', background: true, priority: 10},
            {action: 'static', background: true, priority: 100}
        ],
        preLoadMovements: [
            {action: 'hello_left', background: true},
            {action: 'hello_right', background: true},
            {action: 'walk_left', background: true},
            {action: 'walk_right', background: true},
            {action: 'point_45_right', background: true}, 
            {action: 'point_45_left', background: true}, 
            {action: 'point_top_right', background: true},
            {action: 'point_top_left', background: true},
            {action: 'idle', background: true},
            {action: 'idle_left', background: true},
            {action: 'idle_right', background: true},
            {action: 'static', background: true}
            
        ],
        mouseover: function() {
            char1.setOption('framed', 1);

//            char1.movementFactory.setEnableTrack(true);
//            char1.movementFactory.doMovement([
//                {action: 'walk_right'},
//                {action: 'walk_left'}, 
//                {action: 'point_top'}, 
//                {action: 'point_top_right'}, 
//                {action: 'point_top_left'}, 
//                {action: 'point_45_right'}, 
//                {action: 'point_45_left'},
//                {action: 'hello_right'}, 
//                {action: 'hello_left'}]);

        },
        mouseout: function() {
            char1.setOption('framed', 0);
        }/*,
        click: function() {
//            char1.movementFactory.doMovement({action: 'walk_right', text: "Olá amigo!"});
        }*/
    };

    char1 = new DIVA_character(conf1);
    char1.create();
    //===========================================================

    $(".divaContainer").position({
        of: $("#book"),
        my: "right top",
        at: "left top",
        collision: "fit fit"
    });
}