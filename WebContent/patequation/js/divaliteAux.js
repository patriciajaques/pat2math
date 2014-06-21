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
    char1.movementFactory.doMovement({action: 'triste', text: dica, callback: function() { 
            setTimeout(function() {
                showHint(dica);
            }, 2000); 
        } 
    }); //, callback: showHint(dica) 
}

function divaLiteMoveTo(y) {
    char1.moveTo(50, y, 1000, null);
}

var char1;

function init() {

//    var bookPosition = $("#book").css("margin-left");
//    alert(bookPosition);

    //===========================================================
    //Example 1 -> creates a char without a chatterbot
    var conf1 = {
        charname: 'pat',
        z_index: 1000,
        pictw: 170,
        picth: 170,
        containerWidth: 170,
        speechBubbleWidth: 200,
        speechBubbleFontSize: 18,
        showControls: false,
        framed: 0,
        movieSpeed: 85,
        showSpeed: false,
        posy: 100,
        posx: 20,
        debug: false,
        frameColor: '#cccccc',
        corporalMovements: [{action: 'idle', background: false, priority: 90},
            {action: 'pisca', background: false, priority: 10},
            {action: 'malabares', background: false, priority: 2},
            {action: 'static', background: false, priority: 100},
            {action: 'tutoria', background: false, priority: 2}],
        preLoadMovements: [{action: 'aplauso', background: true}, {action: 'triste'}, {action: 'dardo'}],
        mouseover: function() {
            char1.setOption('framed', 1);
        },
        mouseout: function() {
            char1.setOption('framed', 0);
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