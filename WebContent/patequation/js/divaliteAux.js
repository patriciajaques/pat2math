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
    char1.movementFactory.doMovement({action: 'idle_right', text: dica, callback: function(){showHint(dica);}});
    
/*
    char1.movementFactory.doMovement({action: 'idledir', text: dica, callback: function() { 
            setTimeout(function() {
                showHint(dica);
            }, 3000);
        }
    }); //, callback: showHint(dica) 
    */
}

function divaLiteTipAnswer(dica) {
    
    //aqui tb. char1.setOption('movieSpeed', 97);    
    //char1.movementFactory.doMovement({action: 'resposta', text: dica}); //, callback: showHint(dica)
    char1.movementFactory.doMovement({action: 'idle', text: dica}); //, callback: showHint(dica)
}

function setDefaultSpeed() {
 //   char1.setOption('movieSpeed', 90);
}

function divaLiteActionPointSide(side) {

    //aqui char1.setOption('movieSpeed', 97);
    
    if (side === 'left')
        char1.movementFactory.doMovement({action: 'point_top_left'});
    else
        if (side === 'right')
            char1.movementFactory.doMovement({action: 'point_top_right'});
        else
            char1.movementFactory.doMovement({action: 'point_top'});
    
}

function divaLiteActionPointSideHint(side, hint, x, y) {

    //aqui char1.setOption('movieSpeed', 97);
    
    if (side === 'left')
        char1.movementFactory.doMovement({action: 'point_top_left', text: hint, x:x, y:y, speed:100});
    else
        if (side === 'right')
            char1.movementFactory.doMovement({action: 'point_top_right', text: hint, x:x, y:y, speed:100});
        else
            char1.movementFactory.doMovement({action: 'point_top', text: hint, x:x, y:y, speed:100});
    
}


function divaLiteActionPointMove(angle, x, y, skip) {
 
    //aqui char1.setOption('movieSpeed', 97);

    if (angle === 45)
        char1.movementFactory.doMovement({action: 'point_top_left', text: '', x: x, y: y, speed: 97, ignoreDialog: true});
    else
        if (angle === 135)
            char1.movementFactory.doMovement({action: 'point_top_right', text: '', x: x, y: y, speed: 97, ignoreDialog: true});
        else
            char1.movementFactory.doMovement({action: 'point_top_right', text: '', x: x, y: y, speed: 97, ignoreDialog: true});
    
//    char1.setOption('movieSpeed', 90);
    
}


function divaLiteActionPointHint(angle, dica, x, y) {
    
    //aqui char1.setOption('movieSpeed', 97);

    if (angle === 45)
        char1.movementFactory.doMovement({action: 'point_45_left', text: dica, x: x, y: y, speed: 97, callback: function(){showHint(dica);}});
    else
        if (angle === 135)
            char1.movementFactory.doMovement({action: 'point_45_right', text: dica, x: x, y: y, speed: 97, callback: function(){showHint(dica);}});
        else
            char1.movementFactory.doMovement({action: 'point_top_right', text: dica, x: x, y: y, speed: 97, callback: function(){showHint(dica);}});
    
//    char1.setOption('movieSpeed', 90);
    
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

function divaLiteMoveToAngle(x, y, angle, dica) {
    char1.goTo(x, y);
    //char1.moveTo(x, y);

/*
    char1.moveTo(x, y, 90, 
        
        function() {
            //divaLiteActionPoint(angle, dica);
            //alert('um teste!');
            
            if (angle === 45)
                char1.movementFactory.doMovement({action: '45esq', text: dica});
            else
                if (angle === 135)
                    char1.movementFactory.doMovement({action: '45dir', text: dica});
                else
                    char1.movementFactory.doMovement({action: 'frentepointdir', text: dica});
                
        }
        );
   */
   

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
        //scrollable: true,
        framed: 0,
        movieSpeed: 97,
        showSpeed: false,
        posy: 100,
        posx: 20,
        debug: false,
        frameColor: '#cccccc',
        corporalMovements: [
            {action: 'idle', background: false, priority: 90},
            {action: 'idle_left', background: false, priority: 50},
            {action: 'idle_right', background: false, priority: 49},
            {action: 'static', background: false, priority: 100}
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
            {action: 'static', background: true},
            
        ],
        mouseover: function() {
            char1.setOption('framed', 1);
            /*char1.movementFactory.setEnableTrack(true);
            char1.movementFactory.doMovement([
                {action: 'walk_right'},
                {action: 'walk_left'}, 
                {action: 'point_top'}, 
                {action: 'point_top_right'}, 
                {action: 'point_top_left'}, 
                {action: 'point_45_right'}, 
                {action: 'point_45_left'},
                {action: 'hello_right'}, 
                {action: 'hello_left'}]
            );*/
        },
        mouseout: function() {
            char1.setOption('framed', 0);
        },
        click: function() {
//            char1.movementFactory.doMovement({action: 'walk_right', text: "Olá amigo!"});
//            char1.moveTo(500, 500, 1000, null);
            //char1.movementFactory.doMovement({action: 'hello_right', text: "Olá amigo!"});
        }
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