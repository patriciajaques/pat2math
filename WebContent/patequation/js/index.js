//some references about mathml
//http://www.w3.org/TR/MathML3/chapter3.html
//http://www.xmlmind.com/tutorials/MathML/index.html
//msg de dica: cassio5;d;2x-3x=0
// post it - http://net.tutsplus.com/tutorials/html-css-techniques/create-a-sticky-note-effect-in-5-easy-steps-with-css3-and-html5/

/////// Comments template
/**
 * @author Felipe de Morais
 * 
 * @description 
 * 
 * @param {type} 
 *      
 * @return {type} 
 * */

var selectedSheet = "#paper-1";
var selectedEquation;

// variables for the Step object
var NORMAL_STEP = 0; //To represent a normal step
var NORMAL_SOLUTION = 1; //To represent a normal solution (for first degree equations)
var DELTA_SOLUTION = 2; //To represent a delta solution (for second degree equations)
var x1_SOLUTION = 3; //To represent the x'solution (for second degree equations)
var x2_SOLUTION = 4; //To represent the x''solution (for second degree equations)

//eq.steps = [
//    new Step("a=1;b=3;c=-4", NORMAL_STEP),
//    new Step("d=3^2-4*1*-4", NORMAL_STEP),
//    new Step("d=25", DELTA_SOLUTION),
//    new Step("x=(-3±5)/(2*1)", NORMAL_STEP),
//    new Step("x=(2)/(2)", NORMAL_STEP),
//    new Step("x=1", x1_SOLUTION)];
//
//eq.isComplete = false;

var newEquations = [// contains the most updated array of equations
    new Equation(" ", 0),
    new Equation(" ", 0),
    new Equation(" ", 0),
    new Equation(" ", 0),
    new Equation(" ", 0),
    new Equation(" ", 0),
    new Equation(" ", 0),
    new Equation(" ", 0),
    new Equation(" ", 0),
    new Equation(" ", 0)];

var equations = [// contains the current array of equations
    new Equation("x=1", 50),
    new Equation("x=1", 50),
    new Equation("x=1", 50),
    new Equation("x=1", 50),
    new Equation("x=1", 50),
    new Equation("x=1", 50),
    new Equation("x=1", 50),
    new Equation("x=1", 50),
    new Equation("x=1", 50),
    new Equation("x=1", 50)];
var concluded = 0;

//    new Equation("x^2+3x-4=0", 100),
//    new Equation("x+4=3*2", 50),
//    new Equation("x^2+4x-3=0", 100),
//    new Equation("x+(14)/(7)=4", 60),
//    new Equation("x^2=9", 40),
//    new Equation("x-2=(35)/(7)", 50),
//    new Equation("5+x=6-2", 50),
//    new Equation("x=(5)/((5)R2)", 40),
//    new Equation("x=(36)/(7)+(1)/(5)", 60),
//    new Equation("5+x=6-2", 60),
//    new Equation("x+4=3*2", 70)];

/**
 * @author Felipe de Morais
 * 
 * @description Constructor of a equation
 * 
 * @param {String} equation - equation with pat2math text notation
 * @param {int} points - the total of points of a equation
 *      
 * */

function Equation(equation, points) {
	this.id = 0;
    this.equation = equation;  //the equation string in pat2math text notation 
    this.points = points; //maximum points of this equation (come from the system)
    this.userPoints = 0; //points that the user get\
    this.userPassNumber = 0; //number of pass concluded in this equation
    this.userErrorPoints = 0; // error points in each pass of the resolution
    this.nAnswers = 1; // number of answears that the user entry
    this.twoAnswers = false; // if this equation has two (true) or one (false) answears
    this.initialEquation = equation;// use just for bhaskara
    this.isComplete = false; // if the equation is complete
    this.isAnswer = false; //if the system are waiting for a response
    this.lastStep = null; //a object Step with the last step from user
    this.steps = []; //array of Step (object Step)

    if (equation.indexOf("^2") !== -1) {
        this.twoAnswers = true;
    }

    this.addPoints = addPoints;
    function addPoints(value) {
        this.userPoints = this.userPoints + value;
        if (value === 10) {
            this.userPassNumber += 1;
        } else if (value < 0) {
            this.userErrorPoints += (-value);
        }
        calculatePoints();
    }

    this.isAnswer = isAnswer;
    function isAnswer() {
        if ((points / 10) === this.userPassNumber + 1) {
            return true;
        }
        return false;
    }
}

function Step(step, type) {
    this.step = step; //string that contains the step of resolution
    this.type = type; //type of the step (NORMAL_STEP, NORMAL_SOLUTION, DELTA_SOLUTION, x1_SOLUTION e x2_SOLUTION)
}

$(document).ready(function() {
	/*$("html").mousemove(function(p){
		if(p.clientX < 20) {
			$("#topics").show();
		}
		if(p.clientX > 300) {
			$("#topics").hide();
		}
	});*/
	
	$("#mask").click(
			function() {
				$("#video-box").hide();
				$("#mask").hide();
			}
		);
	
    $(document).keyup(function(event) {
        // key 13 = enter
        var key = event.which;
        //alert(key);

        if (key === 13) { //enter key

            if ($(selectedSheet + " .nextEquation").css("cursor") === "pointer" && $(selectedSheet + " .nextEquation").css("display") !== "none") {
                $(".nextEquation").click();
            } else {
                $(".canMove li input").blur();
                checkEquation();
            }

        } else if (key === 9) { //tab key
            $(".labelDefault:first").focus();
        } else if ((key === 48 || key === 96) && event.altKey) { //alt + 0
            $("#aPaper10").click();
        } else if ((key === 49 || key === 97) && event.altKey) { //alt + 1
            $("#aPaper1").click();
        } else if ((key === 50 || key === 98) && event.altKey) { //alt + 2
            $("#aPaper2").click();
        } else if ((key === 51 || key === 99) && event.altKey) { //alt + 3
            $("#aPaper3").click();
        } else if ((key === 52 || key === 100) && event.altKey) { //alt + 4
            $("#aPaper4").click();
        } else if ((key === 53 || key === 101) && event.altKey) { //alt + 5
            $("#aPaper5").click();
        } else if ((key === 54 || key === 102) && event.altKey) { //alt + 6
            $("#aPaper6").click();
        } else if ((key === 55 || key === 103) && event.altKey) { //alt + 7
            $("#aPaper7").click();
        } else if ((key === 56 || key === 104) && event.altKey) { //alt + 8
            $("#aPaper8").click();
        } else if ((key === 57 || key === 105) && event.altKey) { //alt + 9
            $("#aPaper9").click();
        } else if (key === 66 && event.altKey) { //alt + b
            $("#bhaskara").click();
        } else if (key === 67 && event.altKey) { //alt + c
            $("#abc").click();
        } else if (key === 68 && event.altKey) { //alt + d
            $("#delta").click();
        } else if (key === 76 && event.altKey) { //alt + l
            $("#clearLine").click();
        } else if (key === 84 && event.altKey) { //alt + t
            $("#addLabel").click();
        } else if (key === 0 && event.altKey) { //alt + ?
            $("#hint").click();
        }
    });

    papers.oncontextmenu = function(e) {
        $(".dropdown").css("position", "absolute");
        $(".dropdown").css("left", e.pageX + "px");
        $(".dropdown").css("top", e.pageY + "px");
        $(".dropdown").addClass("open");
        return false;
    };

    document.onclick = function(e) {
        if (e.which !== 3) {
            $(".dropdown").removeClass("open");
        }
    };

    $("#book").tabs({
        activate: function(event, ui) {
            //alert(ui.newTab.text() + " activated!");
        }
    }).addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#book .tabs li").removeClass("ui-corner-top").addClass("ui-corner-all");

    $("#textBoard").position({
        of: $("#chalkboard"),
        my: "center center",
        at: "center center"
    });

    $(selectedSheet + " #logo").tooltip();
    $("#progressBar").tooltip();
//    $("#helpSystem").tooltip();
    $("#imgInformation").tooltip();

//    $("#helpSystem").click(function() {
//        $("#boxHelpSystem").modal();
//        $(".collapse").removeClass("in");
//    });

    $(".canCopyTools li").draggable({
        connectToSortable: selectedSheet + " .canMove ul",
        helper: "clone",
        containment: "#book",
        appendTo: "body",
        revert: "invalid",
        start: function(e, ui) {
            $(ui.helper).addClass("ui-draggable-helper");
        },
        stop: function(e, ui) {
//            $(ui.helper).removeClass("ui-draggable-helper");
        }
    }).disableSelection();

    $("#newEquation").button().click(function() {
        newEquation();
    });

    $("#hint").click(function() {
        hint();
    });


    var innerHtml = "<div id='boxOperations'>"
            + "<label for='soma'>"
            + "<input id='soma' type='radio' name='operations' value='AD'/>"
            + "<img src='img/AD.gif' alt='Adição'/>"
            + "</label>"
            + "<label for='subtracao'>"
            + "<input id='subtracao' type='radio' name='operations' value='SB'/>"
            + "<img src='img/SB.gif' alt='Subtração'/>"
            + "</label>"
            + "<label for='multiplicacao'>"
            + "<input id='multiplicacao' type='radio' name='operations' value='MT'/>"
            + "<img src='img/MT.gif' alt='Multiplicação'/>"
            + "</label>"
            + "<label for='divisao'>"
            + "<input id='divisao' type='radio' name='operations' value='DV'/>"
            + "<img src='img/DV.gif' alt='Divisão'/>"
            + "</label></div>";

    loadEquation(0);

    centralizeCanMoveAndButton();
    sortable();
    draggable();
    trashHide();
    trashDroppable();
    centralizeCanCopy();
    buttonClick();
    focus();

//    $("#boxOperations").toggle();
    //$("#hintBox").hide();
    $("#hintText").hide();
    $(".verticalTape").hide();
    $("#newPoints").hide();

    reloadProgressBar();


});

function convertIdPosition(id) {

    var listElementsSelEq = $(selectedSheet + " .canCopy li").toArray();
    var intIdReal = -1;

    for (var i = 0; i < listElementsSelEq.length; i++) {

        var textSelectElement = listElementsSelEq[i].textContent;

        if (!isOperator(textSelectElement)) {
            intIdReal++;

            if (intIdReal === id) {
                return i;
            }

        }

    }

}

/**
 * @author Felipe de Morais
 * 
 * @description Return the left and top position of the element indicated by de id
 * 
 * @param {int} id - a element of the last valid pass in the equation resolution
 * @param {int} literalPosition - I don't know.
 * 
 * @return {left, top} object.left indicate the left position of the element on the screen;
 *                    object.top indicate the top position of the element on the screen;
 * */

function getPosition(id, literalPosition) {


    //Nesse trecho será feita uma conversão entre o ID que está sendo 
    //recebido pelo ID real do elemento da equação.

    if (literalPosition === undefined || literalPosition === false) {

        id = convertIdPosition(id);

        /*var listElementsSelEq = $(selectedSheet + " .canCopy li").toArray();
         var intIdReal = -1;
         
         for (var i = 0; i < listElementsSelEq.length; i++) {
         
         var textSelectElement = listElementsSelEq[i].textContent;
         
         if (!isOperator(textSelectElement) ) {
         intIdReal++;
         
         if (intIdReal === id) {
         id = i;
         break;
         }
         
         }
         
         }*/

    }


    var offsetLeft = $(selectedSheet + " .canCopy li:nth-child(" + (id + 1) + ")").offset().left;
    var offsetTop = $(selectedSheet + " .canCopy li:nth-child(" + (id + 1) + ")").offset().top;
    var scrollTop = $(document).scrollTop();

    return {left: offsetLeft, top: (offsetTop - scrollTop)};
}

function getElementText(id) {
    return $(selectedSheet + " .canCopy li:nth-child(" + (id + 1) + ")").text();
}

function reloadPaper(selected) {
    $(selectedSheet).css("display", "none");
    selectedSheet = "#paper-" + selected;
    $(selectedSheet).css("display", "block");
    //alert(selectedSheet);
    loadPaper(selectedSheet);
    if (selected !== 'help') {
        loadEquation(selected - 1);
    }

    centralizeCanMoveAndButton();
    sortable();
    draggable();
    trashHide();
    trashDroppable();
    centralizeCanCopy();
    buttonClick();
    focus();
}

function loadEquation(index) {
    var newEquation = newEquations[index];
    selectedEquation = equations[index];
    var go = false;

    if (newEquation.equation !== selectedEquation.equation) {
        $(selectedSheet + " .hLine").text("");
        equations[index] = newEquations[index];
        selectedEquation = equations[index];
        go = true;
    }

    if (go) {

        var line = $(selectedSheet + " .hLineAux").next();

        var stack = textToMathml(selectedEquation.equation);

        var elements = "<ul>";
        for (var i = 0; i < stack.length; i++) {
            elements = elements + "<li><math>" + stack[i] + "</math></li>";
        }

        elements = elements + "</ul>";
        line.html(line.html() + elements);

        line.addClass("canCopy");
        centralizeCanCopy();
        line.removeClass("canCopy");

        if (selectedEquation.steps !== null && selectedEquation.steps.length > 0) {
            for (var i = 0; i < selectedEquation.steps.length; i++) {
                stack = textToMathml(selectedEquation.steps[i].step);
                selectedEquation.lastStep = selectedEquation.steps[i];

                elements = "<ul>";
                for (var j = 0; j < stack.length; j++) {
                    var elm = stack[j];
                    if (elm === "<mn>x</mn>") {
                        if (selectedEquation.lastStep.type === x1_SOLUTION) {
                            elm = elm + "\'";
                        } else if (selectedEquation.lastStep.type === x2_SOLUTION) {
                            elm = elm + "\'\'";
                        }
                    }
                    elements = elements + "<li><math>" + elm + "</math></li>";
                }

                line.find("li").css("opacity", "0.5");


                if (line.html().indexOf("<mfrac") !== -1) {
                    line = line.next().next();
                } else {
                    line = line.next();
                }

                elements = elements + "</ul><div class='cool coolAlign'></div>";
                if (!selectedEquation.isAnswer()) {
                    selectedEquation.addPoints(10);
                }
                line.html(line.html() + elements);

                line.find("li").css("opacity", "0.75");

                if (selectedEquation.lastStep.type === DELTA_SOLUTION || selectedEquation.lastStep.type === x1_SOLUTION) {
                    line.find("li").css("color", "blue");
                    if (selectedEquation.lastStep.type === DELTA_SOLUTION) {
                        selectedEquation.lastStep = selectedEquation.steps[0];
                    } else { //x1 solution
                        var find = false;
                        for (var j = i-1; j >= 0; j--){
                            if(selectedEquation.steps[j].step.indexOf('±') !== -1){
                                selectedEquation.lastStep = selectedEquation.steps[j];
                                find = true;
                                break;
                            }
                        }
                        if (!find){
                            selectedEquation.lastStep = selectedEquation.steps[0];
                        }
                    }
                }

                line.addClass("canCopy");
                centralizeCanCopy();
                coolAlign();
                line.removeClass("canCopy");
            }
        }



        line.addClass("canCopy");

        var nextLine;
        if (elements.indexOf("<mfrac") !== -1) {
            nextLine = line.next().next();
        } else {
            nextLine = line.next();
        }

        if ($(selectedSheet).html().indexOf("final") === -1) {
            if (selectedEquation.isComplete) {
                $(selectedSheet + " .canCopy li").css("color", "blue");
                $(selectedSheet + " .canCopy").removeClass("canCopy");
                addProgressValue(10);
                //selectedEquation.lastStep = selectedEquation;
                nextLine.html("<div class='final'></div><div class='btn btn-info nextEquation' onclick='nextEquationClick();'>Próxima Equação</div>");

                var result = selectedEquation.points - selectedEquation.userPoints - selectedEquation.userErrorPoints;
                selectedEquation.addPoints(result);

            } else {
                nextLine.addClass("canMove");
                nextLine.html(
                        "<ul>" +
                        "<li class='labelDefault'><input type='text'></li>" + //autofocus='true'
                        "</ul>" +
                        "<div class='trash'></div>" +
                        "<button id='button'></button>");

                centralizeCanMoveAndButton();
                sortable();
                draggable();
                trashHide();
                trashDroppable();
                centralizeCanCopy();
                buttonClick();
                focus();
            }
        }
    }

    calculatePoints();

    $("#hintText").hide('blind', 500);
    $(".verticalTape").hide('blind', 500);
    $("#hintText").html("");
}

function calculatePoints() {
    $("#amountPoins").text(selectedEquation.userPoints + " de " + selectedEquation.points + " pontos");
}

function reloadProgressBar() {
    var aux = 0;
    for (var i in equations) {
        if (i.isComplete) {
            aux += 10;
        }
    }
    addProgressValue(aux);
}

function addProgressValue(value) {
    concluded += value;
    $("#progressBar div").css("width", concluded + "%");
//    $("#progressBar .progress-bar .progress-bar-info").attr("aria-valuenow", concluded);
    $("#progressBar .label").text(concluded + "% concluído");
}

function addLabelDefault() {
    selectedEquation.lastStep = null;
    $(selectedSheet + " .canMove ul").append("<li class='labelDefault'><input type='text'></li>");

    centralizeCanMoveAndButton();
    sortable();
    trashHide();
    trashDroppable();
    focus();

    $(".labelDefault:first input").focus();
}

function clearLine(option) {
    if (option === 'all') {
        selectedEquation.lastStep = null;
    }

    var html = $(selectedSheet + " .canMove").html();
    var svg = "";
    if (html.indexOf("svg") !== -1) {
        svg = html.substring(html.indexOf("<svg"), html.indexOf("</svg>") + 1);
    }

    $(selectedSheet + " .canMove").html(
            svg + "<ul>" +
            "<li class='labelDefault'><input type='text'></li>" +
            "</ul>" +
            "<div class='trash'></div>" +
            "<button id='button'></button>");

    centralizeCanMoveAndButton();
    sortable();
    draggable();
    trashHide();
    trashDroppable();
    buttonClick();
    focus();

    $(".labelDefault input").focus();
}

function referenceToDelta() {
    var html = $(selectedSheet + " .canMove").html();
    var svg = "";
    if (html.indexOf("svg") !== -1) {
        svg = html.substring(html.indexOf("<svg"), html.indexOf("</svg>") + 1);
    }
    selectedEquation.lastStep = null;

    $(selectedSheet + " .canMove").html(
            svg + "<ul>" +
            "<li><math><mn>Δ</mn></math></li>" +
            "<li><math><mn>=</mn></math></li>" +
            "<li><math><mn>b²</mn></math></li>" +
            "<li><math><mo>-</mo></math></li>" +
            "<li><math><mn>4</mn></math></li>" +
            "<li><math><mo>*</mo></math></li>" +
            "<li><math><mn>a</mn></math></li>" +
            "<li><math><mo>*</mo></math></li>" +
            "<li><math><mn>c</mn></math></li>" +
            "</ul>");
//    +
//            "<div class='trash'></div>" +
//            "<button id='button'></button>"
    centralizeCanMoveAndButton();

    $(selectedSheet + " .canMove").addClass("formula");
    $(selectedSheet + " .canMove").next().addClass("canMove");

    $(selectedSheet + " .formula").removeClass("canMove");
    clearLine();

    $(selectedSheet + " .labelDefault input").attr("value", "d=");
    selectedEquation.lastStep = new Step("d=s", NORMAL_STEP);

    centralizeCanMoveAndButton();
    sortable();
    draggable();
    trashHide();
    trashDroppable();
    buttonClick();
    focus();
    $(".labelDefault input").focus();
}

function referenceToABC() {
    var html = $(selectedSheet + " .canMove").html();
    var svg = "";
    if (html.indexOf("svg") !== -1) {
        svg = html.substring(html.indexOf("<svg"), html.indexOf("</svg>") + 1);
    }
    selectedEquation.lastStep = null;

    $(selectedSheet + " .canMove").html(
            svg + "<ul>" +
            "<li><math><mn>a</mn></math></li>" +
            "<li><math><mn>=</mn></math></li>" +
            "<li class='labelDefault'><input type='text'></li>" +
            "<li>;</li>" +
            "<li><math><mn>b</mn></math></li>" +
            "<li><math><mn>=</mn></math></li>" +
            "<li class='labelDefault'><input type='text'></li>" +
            "<li>;</li>" +
            "<li><math><mn>c</mn></math></li>" +
            "<li><math><mn>=</mn></math></li>" +
            "<li class='labelDefault'><input type='text'></li>" +
            "</ul>" +
            "<div class='trash'></div>" +
            "<button id='button'></button>");

    centralizeCanMoveAndButton();
    sortable();
    draggable();
    trashHide();
    trashDroppable();
    buttonClick();
    focus();
    $(".labelDefault:first").focus();
}

function referenceToBhaskara() { //± = &PlusMinus;
    var html = $(selectedSheet + " .canMove").html();
    var svg = "";
    if (html.indexOf("svg") !== -1) {
        svg = html.substring(html.indexOf("<svg"), html.indexOf("</svg>") + 1);
    }
    selectedEquation.lastStep = null;

    $(selectedSheet + " .canMove").html(
            svg + "<ul>" +
            "<li><math><mn>x</mn></math></li>" +
            "<li><math><mn>=</mn></math></li>" +
            "<li><math><mfrac><mrow><mo>-</mo><mn>b</mn><mo>±</mo><msqrt><mrow><mn>Δ</mn></mrow></msqrt></mrow><mrow><mn>2</mn><mo>*</mo><mn>a</mn></mrow></msqart></math></li>" +
            "</ul>");

    centralizeCanMoveAndButton();

    $(selectedSheet + " .canMove").addClass("formula");
    $(selectedSheet + " .canMove").next().next().addClass("canMove");

    $(selectedSheet + " .formula").removeClass("canMove");
    clearLine();

    $(selectedSheet + " .labelDefault input").attr("value", "x=");
    selectedEquation.lastStep = new Step("x=s", NORMAL_STEP);

    centralizeCanMoveAndButton();
    sortable();
    draggable();
    trashHide();
    trashDroppable();
    buttonClick();
    focus();
}

function centralizeCanCopy() {
    //coloca o canCopy ul no centro da linha
    var width = parseInt($(selectedSheet + " .canCopy ul").css("width"));
    var x = parseInt($(selectedSheet + " .canCopy").css("width"));
    var test = (x / 2) - (width / 2);
    $(selectedSheet + " .canCopy ul").css("padding-left", test);
}

function buttonClick() {

    $(selectedSheet + " #button").button().unbind('click');
    $(selectedSheet + " #button").button().click(function() {
        checkEquation();
    });
}

function getEquation(list) {
    var equation = "";
    for (var i = 0; i < list.length; i++) {
        var text = $(list[i]).html();
        if (text.indexOf("<math>") === -1) {
            equation = equation + text;
        } else {
            equation = equation + mathmlToText(text);
        }
    }
    return equation;
}

//like the replaceAll function in Java
function replaceAll(string, character, newCharacter) {
    while (string.indexOf(character) !== -1) {
        string = string.replace(character, newCharacter);
    }
    return string;
}

//return the quantity of character that exist in the string
function getQuantity(string, character) {
    var quantity = 0;
    for (var i = 0; i < string.length; i++) {
        if (string[i] === character) {
            quantity++;
        }
    }
    return quantity;
}

//return the index of the last occurence oh character in the string or -1 if the character no exist in the string
function lastIndexOf(string, character) {
    var last = -1;
    for (var i = string.length - 1; i >= 0; i--) {
        if (string[i] === character) {
            last = i;
            break;
        }
    }
    return last;
}

//check if in the string have incomplete parentheses
function hasIncompleteParentheses(string) {
    var lastIndex = lastIndexOf(string, ")");
    var firstIndex = string.indexOf("(");
    if (lastIndex !== -1) {
        var count = 0;
        var index = -1;
        for (var i = lastIndex - 1; i >= 0; i--) {
            if (string[i] === ")") {
                count++;
            } else if (string[i] === "(") {
                if (count === 0) {
                    index = i;
                    //break;
                } else {
                    count--;
                }
            }
        }
        if (count !== 0 || index === -1) {
            return true;
        }
    } else if (firstIndex !== -1) {
        var count = 0;
        var index = -1;
        for (var i = firstIndex + 1; i < string.length; i++) {
            if (string[i] === ")") {
                count++;
            } else if (string[i] === "(") {
                if (count === 0) {
                    index = i;
                    //break;
                } else {
                    count--;
                }
            }
        }
        if (count !== 0 || index === -1) {
            return true;
        }
    }
    return false;
}

//check if the string is between balanced parentheses
function isBetweenParentheses(string) {
    if (string[0] === "(" && string[string.length - 1] === ")") {
        var count = 0;
        for (var i = string.length - 2; i >= 1; i--) {
            if (string[i] === ")") {
                count++;
            } else if (string[i] === "(") {
                if (count === 0) {
                    return false;
                } else {
                    count--;
                }
            }
        }
        return true;
    }
    return false;
}

//translates natural language to format text PAT2Math
//Have to do the square function = replace ² for ^2
// examples -> natural = text:
// R5+3/x² = ((5+3)/(x^2))R2
// (4+x)² = (4+x)^2
// verificar a, b e c
// aceitar d como delta;
function naturalToText(natural) { //equacao x+2(R5+2/(R3)²)²
    natural = replaceAll(natural, " ", "");
    natural = replaceAll(natural, "^2", "²");
    natural = replaceAll(natural, "ˆ2", "²");
    natural = replaceAll(natural, "×", "*");
    natural = replaceAll(natural, "+-", "±");
    natural = replaceAll(natural, "÷", "/");
    natural = natural.toLowerCase();

    var aux = "";
    var text = "";

    for (var i = 0; i < natural.length; i++) {
        switch (natural[i]) {
            //test if don't have pharenteses in numerator and denominator
            case '/':
                if (i > 0 && natural[i - 1] !== ')') {
                    //find the numerator
                    aux = "";
                    for (var j = i - 1; j >= 0; j--) {
                        if (isNumber(natural[j]) || isIncognita(natural[j])) {
                            aux = natural[j] + aux;
                        } else {
                            if (natural[j] === 'r') {
                                aux = '(' + aux + ')R2';
                            }
                            break;
                        }
                    }
                    text = text.substring(0, text.length - aux.length);
                    text = text + '(' + aux + ')';
                }
                text = text + '/';
                if (i < natural.length - 1 && natural[i + 1] !== '(') {
                    //find the numerator
                    aux = "";
                    var sqrtSignal = '';
                    if (natural[i + 1] === '+' || natural[i + 1] === '-') {
                        aux = natural[i + 1];
                        sqrtSignal = natural[i + 1];
                        i++;
                    }
                    var isSqrt = false;
                    if (natural[i + 1] === 'r') {
                        isSqrt = true;
                        i++;
                    }
                    for (var j = i + 1; j < natural.length; j++) {
                        if (isNumber(natural[j]) || isIncognita(natural[j])) {
                            aux = aux + natural[j];
                        } else {
                            break;
                        }
                    }

                    i += aux.length - sqrtSignal.length;
                    if (isSqrt) {
                        aux = aux.replace(sqrtSignal, '');
                        aux = sqrtSignal + '(' + aux + ')R2';
                    }
                    text = text + '(' + aux + ')';
                }
                break;
            case 'r':
                if (i < natural.length - 1 && natural[i + 1] !== '(') {
                    aux = "";
                    if (natural[i + 1] === '+' || natural[i + 1] === '-') {
                        aux = natural[i + 1];
                        i++;
                    }
                    for (var j = i + 1; j < natural.length; j++) {
                        if (isNumber(natural[j]) || isIncognita(natural[j])) {
                            aux = aux + natural[j];
                        } else {
                            break;
                        }
                    }
                    text = text + '(' + aux + ')R2';
                    i += aux.length;
                } else if (i < natural.length - 1 && natural[i + 1] === '(') {
                    var j, cont = 0;
                    for (j = i + 2; j < natural.length; j++) {
                        if (natural[j] === '(') {
                            cont++;
                        } else if (natural[j] === ')') {
                            if (cont === 0) {
                                break;
                            } else {
                                cont--;
                            }
                        }
                    }
                    aux = natural.substring(i + 1, j + 1);
                    i += aux.length;
                    text = text + naturalToText(aux) + 'R2';
                }
                break;
            default:
                text = text + natural[i];
        }
    }
    //alert(text);
    return text;

//    var barQuantity = getQuantity(natural, "/");
//    if (barQuantity === 1) {
//        var split = natural.split("/");
//        if (!hasIncompleteParentheses(split[0]) && !hasIncompleteParentheses(split[1])) { // && split[0].indexOf("R") === -1
//            var first = "";
//            var last = "";
//            var splitAux;
//            if (split[0].indexOf("[") !== -1 && split[1].indexOf("]") !== -1) {
//                splitAux = split[0].split("[");
//                first = splitAux[0];
//                split[0] = splitAux[1];
//
//                splitAux = split[1].split("]");
//                last = splitAux[1];
//                split[1] = splitAux[0];
//            }
//            if (split[0].length > 0) {
//                var numerator = naturalToText(split[0]);
//                if (!isBetweenParentheses(numerator)) {
//                    numerator = "(" + numerator + ")";
//                }
//                var digit = numerator[1];
//                if (digit === '+') {
//                    numerator = numerator.replace('(+', '+(');
//                }
//            } else {
//                alert("Numerador Inválido!");
//                return null;
//            }
//            if (split[1].length > 0) {
//                var denominator = naturalToText(split[1]);
//                if (!isBetweenParentheses(denominator)) {
//                    denominator = "(" + denominator + ")";
//                }
//                var digit = denominator[1];
//                if (isOperator(digit)) {
//                    denominator = denominator.replace('(' + digit, digit + '(');
//                }
//                digit = denominator[denominator.length - 2];
//                if (isOperator(digit)) {
//                    denominator = denominator.replace(digit + ')', ')' + digit);
//                }
//            } else {
//                alert("Denominador Inválido!");
//                return null;
//            }
//            return naturalToText(first) + numerator + "/" + denominator + naturalToText(last);
//        }
//    }
////    else if (barQuantity > 1) {
////        //action when have more than one bar in the equation
////        var split = natural.split("+");
////        var result = "";
////        result = result + naturalToText(split[0]) + "+";
////        result = result + naturalToText(split[1]);
////        return result;
////    }
//
//    //var squareIndex = natural.indexOf(")²");
//    var parenthesesIndex = lastIndexOf(natural, ")");
//    if (parenthesesIndex !== -1) {
//        var count = 0;
//        var index = -1;
//        for (var i = parenthesesIndex - 1; i >= 0; i--) {
//            if (natural[i] === ")") {
//                count++;
//            } else if (natural[i] === "(") {
//                if (count === 0) {
//                    index = i;
//                    break;
//                } else {
//                    count--;
//                }
//            }
//        }
//        if (count !== 0 || index === -1) {
//            alert("Elemento elevado ao quadrado inválido!");
//            return null;
//        }
//        var rootAux = natural.indexOf("r(");
//        if (rootAux === -1 || (rootAux !== -1 && index !== (rootAux + 1))) {
//            var inside = naturalToText(natural.substring(index + 1, parenthesesIndex));
//            var first = naturalToText(natural.substring(0, index));
//            var last = natural.substring(parenthesesIndex + 1, natural.length);
//            var square = "";
//            if (last[0] === "²") {
//                square = "^2";
//                last = last.replace("²", "");
//            }
//            last = naturalToText(last);
//
//            if (first !== "" && !isOperator(first[first.length - 1])) {
//                first = first + "*";
//            }
//            if (last !== "" && !isOperator(last[0])) {
//                last = "*" + last;
//            }
//
//            if (!isBetweenParentheses(inside)) {
//                inside = "(" + inside + ")";
//            }
//
//            return first + inside + square + last;
//        }
//    }
//
//    var rootIndex = natural.indexOf("r");
//    if (rootIndex !== -1) {
//        var split = new Array();
//        var index = -1;
//        if (natural[rootIndex + 1] === "(") {
//            var count = 0;
//            for (var i = rootIndex + 2; i < natural.length; i++) {
//                if (natural[i] === "(") {
//                    count++;
//                } else if (natural[i] === ")") {
//                    if (count === 0) {
//                        index = i;
//                        break;
//                    } else {
//                        count--;
//                    }
//                }
//            }
//            if (count !== 0 || index === -1) {
//                alert("Elemento dentro da Raíz inválido!");
//                return null;
//            }
//            split[0] = natural.substring(0, rootIndex);
//            split[1] = natural.substring(rootIndex + 2, index);
//            split[2] = natural.substring(index + 1, natural.length);
//
//        } else {
//            var final = rootIndex + 1;
//            split[0] = natural.substring(0, rootIndex);
//            while (isNumber(natural[final])) {
//                final++;
//            }
//            split[1] = natural.substring(rootIndex + 1, final);
//            split[2] = natural.substring(final, natural.length);
//        }
//
//        if (!hasIncompleteParentheses(split[1])) {
//            var first = "";
//            if (split[0] !== "") {
//                first = naturalToText(split[0]);
//                if (!isOperator(first[first.length - 1])) {
//                    first = first + "*";
//                }
//            }
//            var last = "";
//            if (split[2] !== "") {
//                last = naturalToText(split[2]);
//                if (!isOperator(last[0])) {
//                    last = "*" + last;
//                }
//            }
//            var inside = naturalToText(split[1]);
//            if (isBetweenParentheses(inside)) { //have to check if the parentheses is closed in the middle. isBetweenParentheses()
//                inside = inside.substring(1, inside.length - 1);
//            }
//            return first + "(" + inside + ")R2" + last;
//        }
//    }

////////////////////////////////////////////    return natural;

//    var parenthesesIndex = natural.indexOf(")");
//    if (parenthesesIndex !== -1) {
//        
//    }


//    while (natural !== "") {
//        if (isNumber(natural[0])) {
//            aux = aux + natural[0];
//            natural = natural.replace(natural[0], "");
//        }
//        else if (isOperator(natural[0])) {
//            if (aux !== "") {
//                if (stack.length >= 1 && stack[stack.length - 1].length > 2 && stack[stack.length - 1].indexOf("/(") === stack[stack.length - 1].length - 2) {
//                    var denominator = naturalToText(aux + natural);
//                    natural = "";
//                    stack.push(stack.pop() + denominator + ")");
//                    //stack.push(stack.pop() + aux + ")");
//                } else {
//                    stack.push(aux);
//                }
//                aux = "";
//            }
//            if (natural !== "") {
//                stack.push(natural[0]);
//                natural = natural.replace(natural[0], "");
//            }
//        }
//        else if (isIncognita(natural[0])) {
//            if (aux !== "") {
//                if (stack.length >= 1 && stack[stack.length - 1].length > 2 && stack[stack.length - 1].indexOf("/(") === stack[stack.length - 1].length - 2) {
//                    var denominator = naturalToText(aux + natural);
//                    natural = "";
//                    stack.push(stack.pop() + denominator + ")");
//                    //stack.push(stack.pop() + aux + ")");
//                    //stack.push(denominator + aux + natural[0] + ")");
//                } else {
//                    stack.push(aux + natural[0]);
//                }
//                aux = "";
//            } else {
//                stack.push(natural[0]);
//            }
//            if (natural !== "") {
//                natural = natural.replace(natural[0], "");
//            }
//        }
//        else if (natural[0] === "/" || natural[0] === "÷") {
//            if (aux !== "") {
//                stack.push(aux);
//                aux = "";
//            }
//            var numerator = "";
//            while (stack.length > 0) {
//                numerator = stack.pop() + numerator;
//            }
//            stack.push("(" + numerator + ")/(");
//            natural = natural.replace(natural[0], "");
//        }
//        else if (natural[0] === "(") {
//            if (aux !== "") {
//                stack.push(aux);
//                aux = "";
//            }
//            stack.push(natural[0]);
//            natural = natural.replace(natural[0], "");
//        }
//        else if (natural[0] === ")") {
//            if (aux !== "") {
//                stack.push(aux);
//                aux = "";
//            }
//            var elements = "";
//            var element = stack.pop();
//            while (element !== "(") {
//                elements = element + elements;
//                element = stack.pop();
//            }
//            if (stack.length >= 1 && stack[stack.length - 1].length > 2 && stack[stack.length - 1].indexOf("/(") === stack[stack.length - 1].length - 2) {
//                stack.push(stack.pop() + "(" + elements + "))");
//            } else {
//                stack.push("(" + elements + ")");
//            }
//            natural = natural.replace(natural[0], "");
//        }
//    }
//    if (aux !== "") {
//        if (stack.length >= 1 && stack[stack.length - 1].length > 2 && stack[stack.length - 1].indexOf("/(") === stack[stack.length - 1].length - 2) {
//            stack.push(stack.pop() + aux + ")");
//        } else {
//            stack.push(aux);
//        }
//    }
//    aux = "";
//    for (var i = 0; i < stack.length; i++) {
//        aux = aux + stack[i];
//    }
//    alert(aux);
//    return aux;
}





function textToMathml(text) { //<msup>base exponent</msup>
    var stack = new Array();
    var aux = "";
    text = replaceAll(text, "<br>", "");
    text = replaceAll(text, "²", "^2");
    var lastVarText = "";
    while (text !== "") {
        text = text.replace(/^\s+|\s+$/g, ""); // it's like the trim function

        if (isNumber(text[0])) {
            aux = aux + text[0];
            text = text.replace(text[0], "");
        } else if (isCoefficient(text[0])) {
//            if (aux !== "") {
//                stack.push("<mn>" + aux + "</mn>");
//                aux = "";
//            }
            if (text[0] === 'd') {
                if (aux !== "") {
                    stack.push("<mn>" + aux + "</mn>");
                    aux = "";
                }
                stack.push("<mn>Δ</mn>"); //Δ = &Delta;
            } else {
                stack.push("<mn>" + aux + text[0] + "</mn>");
                aux = "";
            }
            text = text.replace(text[0], "");
        }
        else if (isOperator(text[0])) {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            stack.push("<mo>" + text[0] + "</mo>");
            text = text.replace(text[0], "");
        }
//        else if (isIncognita(text[0])) {
//            if (aux !== "") {
//                stack.push("<mn>" + aux + text[0] + "</mn>"); //<mi> //<mn>" + text[0] + "</mn>
//                aux = "";
//            } else {
//                stack.push("<mn>" + text[0] + "</mn>");//<mi>
//            }
//            text = text.replace(text[0], "");
//        }
        else if (text[0] === "(") {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            stack.push("(");
            text = text.replace("(", "");
        }
        else if (text[0] === ")" && text.length >= 3 && text[1] === "R" && text[2] === "2") {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            var root = "";
            var element = stack.pop();
            while (element !== "(") {
                root = element + root;
                element = stack.pop();
            }
            root = "<msqrt>" + root + "</msqrt>";
            stack.push(root);
            text = text.replace(")R2", "");
        }
        else if (text[0] === ")" && text.length >= 3 && text[1] === "/" && text[2] === "(") {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            var numerator = "";
            var cont = 0;
            var element = stack.pop();
            while (element !== "(") {
                numerator = element + numerator;
                element = stack.pop();
                cont++;
            }
            if (numerator === "") {
                numerator = "<mn>1</mn>";
            }
            if (cont > 1 || numerator.indexOf("</mn><mn>") !== -1) { //</mn><mi>
                numerator = "<mrow>" + numerator + "</mrow>";
            }
            stack.push("<mfrac>" + numerator);
            stack.push("</mfrac>");
            text = text.replace(")/(", "");
        }
        else if (text[0] === "^" && text.length >= 2 && text[1] === "2") {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            var square = "<msup>" + stack.pop() + "<mn>2</mn></msup>";
            stack.push(square);
            text = text.replace("^2", "");
        }
        else if (text[0] === ")" && text.length >= 3 && text[1] === "^" && text[2] === "2") {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            var square = "";
            var cont = 0;
            var element = stack.pop();
            while (element !== "(") {
                square = element + square;
                element = stack.pop();
                cont++;
            }
            if (cont > 1 || square.indexOf("<mfrac>") !== -1 || square.indexOf("<mroot>") !== -1) {
                square = "<mrow>(" + square + ")</mrow>";
            }
            square = "<msup>" + square + "<mn>2</mn></msup>";
            stack.push(square);
            text = text.replace(")^2", "");
        }
        else if (text[0] === ")" && hasOpenFrac(stack)) {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            var denominator = "";
            var cont = 0;
            var element = stack.pop();
            while (element !== "</mfrac>") {
                denominator = element + denominator;
                element = stack.pop();
                cont++;
            }
            if (denominator === "") {
                denominator = "<mn>1</mn>";
            }

            if (cont > 1 || denominator.indexOf("</mn><mn>") !== -1) { //</mn><mi>
                denominator = "<mrow>" + denominator + "</mrow>";
            }
            var numerator = stack.pop();
            if (numerator !== "<mfrac>" && denominator !== "</mfrac>") {
                stack.push(numerator + denominator + "</mfrac>");
            }
            text = text.replace(")", "");
        }
        else if (text[0] === ")") {
            if (aux !== "") {
                stack.push("<mn>" + aux + "</mn>");
                aux = "";
            }
            var list = "";
            var element = stack.pop();
            while (element !== "(") {
                list = element + list;
                element = stack.pop();
            }
            list = "(" + list + ")"; // parentheses with <mo> tag?
            stack.push(list);
            text = text.replace(")", "");
        }
        if (lastVarText !== text) {
            lastVarText = text;
        } else {
            break; // if a problem with a undentified character occur
        }

    }
    if (aux !== "") {
        stack.push("<mn>" + aux + "</mn>");
        aux = "";
    }
    return stack;
}

function hasOpenFrac(list) {
    for (var i = list.length - 1; i >= 0; i--) {
        if (list[i] === "</mfrac>") {
            return true;
        }
    }
    return false;
}

function mathmlToText(math) {
    var stack = new Array();
    var auxBefore = "";
//    var auxAfter = "";
    if (math.indexOf("<math>") !== 0) {
        auxBefore = math.substring(0, math.indexOf("<math>"));
        math = math.substring(math.indexOf("<math>"), math.length);
        //alert(auxBefore + " -<>- " + math);
    }
//    alert(math.substring(math.indexOf("</math>"), math.length+1));
//    if(math.indexOf("</math>") === math.length){
//        
//    }

    while (math !== "") {
        math = math.replace(/^\s+|\s+$/g, ""); // it's like the trim function
        if (math.indexOf("<mn>") === 0) {
            math = math.replace("<mn>", "");
            var max = math.indexOf("</mn>");
            var value = math.substring(0, max);
            math = math.replace(value + "</mn>", "");
            if (value === "Δ") {
                value = 'd';
            }
            stack.push(value);
        }
        else if (math.indexOf("<mi>") === 0) {
            math = math.replace("<mi>", "");
            var max = math.indexOf("</mi>");
            var value = math.substring(0, max);
            math = math.replace(value + "</mi>", "");
            stack.push(value);
        }
        else if (math.indexOf("<mo>") === 0) {
            math = math.replace("<mo>", "");
            var max = math.indexOf("</mo>");
            var value = math.substring(0, max);
            math = math.replace(value + "</mo>", "");
            stack.push(value);
        }
        else if (math.indexOf("<mrow>") === 0) {
            math = math.replace("<mrow>", "");
            stack.push("<mrow>");
        }
        else if (math.indexOf("<msqrt>") === 0) {
            math = math.replace("<msqrt>", "");
            stack.push("<msqrt>");
        }
        else if (math.indexOf("<mfrac>") === 0) {
            math = math.replace("<mfrac>", "");
            stack.push("<mfrac>");
        }
        else if (math.indexOf("<msup>") === 0) {
            math = math.replace("<msup>", "");
            stack.push("<msup>");
        }
        else if (math.indexOf("<math>") === 0) {
            math = math.replace("<math>", "");
            stack.push("<math>");
        }
        else if (math.indexOf("</mrow>") === 0) {
            math = math.replace("</mrow>", "");
            var element = stack.pop();
            var list = "";
            while (element !== "<mrow>") {
                list = element + list;
                element = stack.pop();
            }
            stack.push(list);
        }
        else if (math.indexOf("</msqrt>") === 0) {
            math = math.replace("</msqrt>", "");
            var element = stack.pop();
            var list = "";
            while (element !== "<msqrt>") {
                list = element + list;
                element = stack.pop();
            }
            list = "(" + list + ")R2";
            stack.push(list);
        }
        else if (math.indexOf("</msup>") === 0) {
            math = math.replace("</msup>", "");
            var exponent = stack.pop();//por padrão sempre 2
            var element = stack.pop();
            var list = "";
            while (element !== "<msup>") {
                list = element + list;
                element = stack.pop();
            }
            list = list + "^2";
            stack.push(list);
        }
        else if (math.indexOf("</mfrac>") === 0) {
            math = math.replace("</mfrac>", "");
            var denominator = stack.pop();
            var numerator = stack.pop();
            var list = "(" + numerator + ")/(" + denominator + ")";
            if (stack.pop() !== "<mfrac>") {
                alert("Wrong numbers of arguments!");
            }
            stack.push(list);
        }
        else if (math.indexOf("</math>") === 0) {
            math = math.replace("</math>", "");
            var element = stack.pop();
            var list = "";
            while (element !== "<math>") {
                list = element + list;
                element = stack.pop();
            }
            stack.push(list);
        }
        else if (math.indexOf("(") === 0) {
            math = math.replace("(", "");
            stack.push("(");
        }
        else if (math.indexOf(")") === 0) {
            math = math.replace(")", "");
            stack.push(")");
        }
    }
    var result = auxBefore + stack.pop();
    //alert("mathml to Text = " + result);
    return result;
}

function trashHide() {
    $(selectedSheet + " .trash").hide();
}

function trashDroppable() {
    $(selectedSheet + " .trash").droppable({
        hoverClass: "trashHover",
        tolerance: "touch",
        drop: function(event, ui) {
            ui.helper.hide("explode", 200);
            ui.helper.remove();
            $(selectedSheet + " .trash").hide("explode", 300);
            var text = $(selectedSheet + " .canMove li").text();
            text = text.replace(/^\s+|\s+$/g, "");//trim function

            if (text === "") {
                $(selectedSheet + " .canMove ul").html("<li class='labelDefault'><input type='text'></li>");
            }

//            if (text.indexOf("=") === (text.length - 1) && (!($(selectedSheet + " .canMove li").last().hasClass("labelDefault")) || $(selectedSheet + " .canMove li").last().css("visibility") === "hidden")) {
//                $(selectedSheet + " .canMove ul").append("<li class='labelDefault' contenteditable='true' ></li>");
//            }
//            if (text.indexOf("=") === 0 && (!($(selectedSheet + " .canMove li").first().hasClass("labelDefault")) || $(selectedSheet + " .canMove li").first().css("visibility") === "hidden")) {
//                $(selectedSheet + " .canMove ul").prepend("<li class='labelDefault' contenteditable='true' ></li>");
//            }
            focus();
        },
        over: function(event, ui) {
            ui.helper.css("text-shadow", "0 0 3px red");
        },
        out: function(event, ui) {
            ui.helper.css("text-shadow", "none");
        }
    });
}

function draggable() {
    $(selectedSheet + " .canCopy li").draggable({
        connectToSortable: selectedSheet + " .canMove ul",
        helper: "clone",
        containment: selectedSheet,
        revert: "invalid",
        distance: 10}).disableSelection();
}

function sortable() {
    $(selectedSheet + " .canMove ul").sortable({
        revert: "invalid",
        //        placeholder: "ui-state-highlight", //placeHolder
        containment: selectedSheet,
        distance: 10,
        start: function(event, ui) {
            //alert(ui.helper.html());
            if (ui.helper.parent().parent().hasClass("canMove")) {
                $(selectedSheet + " .trash").show("clip", 300); //show(300)
                centralizeCanMoveAndButton();
            }
//            $("#button").hide("slide", 300);
            //centralizeCanMoveAndButton();
        },
        stop: function(event, ui) {
            //alert(ui.item.html());
            centralizeCanMoveAndButton();
            //ui.item.attr("contenteditable", "true");
            $(selectedSheet + " .trash").hide("clip", 300); //hide(300)            
//            $("#button").show("slide", 300);            
            focus();
        }
    });
}

function focus() {

    $(selectedSheet + " .canMove li").unbind('click');

    $(selectedSheet + " .canMove li").click(function() {

        //$(this).focus();

//        if ($(this).text() === "") {
////            $(this).html("");
//        } else {
//            $(this).children().focus();//.focus();
//            $(this).addClass("labelDefault");
        if ($(this).html().indexOf("input") === -1) {
//            var passo = $(selectedSheet + " .canMove li").toArray();
//            var equation = getEquation(passo);

            clearLine();
            var text = $(this).parent().text();
            if (text.indexOf("a=") !== -1 && text.indexOf("b=") !== -1 && text.indexOf("c=") !== -1) {
                selectedEquation.lastStep = new Step(text, NORMAL_STEP);

            }
            $(selectedSheet + " .labelDefault input").attr("value", selectedEquation.lastStep.step);
            focus();
            //}
        }

    });

    $(selectedSheet + " .canMove li").unbind('keyup');

    $(selectedSheet + " .canMove li input").keyup(function(event) {
        // key 13 = enter
//        var key = event.which;
//        if (key === 13) { //enter
//            $(this).blur();
//            //alert("blur");
//            checkEquation();
//        } else {
//        if (!event.altKey) {


        $(this).stop().animate({
            width: ($(this).val().length + 1) * 16
        }, 100, centralizeCanMoveAndButton);

//        if ($(this).text() === "") {
//            $(this).addClass("labelDefault");
//            //$(this).html("");
//        }
//        else {
//            $(this).removeClass("labelDefault");
//        }
        //centralizeCanMoveAndButton();
//        }
    });

    $(selectedSheet + " .canMove li input").unbind('blur');

    $(selectedSheet + " .canMove li input").blur(function() {
        if ($(selectedSheet + " .canMove ul").html().indexOf("ui-sortable-placeholder") === -1) {
            //alert("Blur!");
            //alert($(this).val());
//            var naturalHtml = $(this).html();
            var naturalText = $(this).val(); //.text();
            selectedEquation.lastStep = new Step(naturalText, NORMAL_STEP);
            if (naturalText !== "") { //naturalHtml !== "" && 
                var stack = "";
                var result = "";
//                if (naturalHtml.indexOf("<math>") !== -1) {
//                    stack = textToMathml(mathmlToText(naturalHtml));
//                } else {
//                    if (naturalText.indexOf("/") !== -1) { // naturalText.indexOf(" ") !== -1 &&
//
//                        naturalText = filterNatural(naturalText);
//
//                        naturalText = replaceAll(naturalText, "  ", " ");
//                        var split = naturalText.split(" ");
//                        for (var i = 0; i < split.length; i++) {
//                            var splitAux = split[i].split("/"); //divide a fração, no 0 o numerador e no 1 o denominador
//                            if (split[i].indexOf("/") !== -1 && !hasIncompleteParentheses(split[i])) {
//                                result = result + naturalToText("[" + split[i] + "]");
//                            } else if (split[i].indexOf("/") !== -1) {
//                                var numerator = -1;
//                                var denominator = splitAux[1].length + 1;
//                                if (hasIncompleteParentheses(splitAux[0])) {
//                                    var count = 0;
//                                    var index = -1;
//                                    for (var i = splitAux[0].length - 1; i >= 0; i--) {
//                                        if (splitAux[0][i] === ")") {
//                                            count++;
//                                        } else if (splitAux[0][i] === "(") {
//                                            if (count === 0) {
//                                                index = i;
//                                                break;
//                                            } else {
//                                                count--;
//                                            }
//                                        }
//                                    }
//                                    if (count === 0 && index !== -1) {
//                                        numerator = index;
//                                    }
//                                }
//
//                                if (hasIncompleteParentheses(splitAux[1])) {
//                                    var count = 0;
//                                    var index = -1;
//                                    for (var i = 0; i < splitAux[1].length; i++) {
//                                        if (splitAux[1][i] === "(") {
//                                            count++;
//                                        } else if (splitAux[1][i] === ")") {
//                                            if (count === 0) {
//                                                index = i;
//                                                break;
//                                            } else {
//                                                count--;
//                                            }
//                                        }
//                                    }
//                                    if (count === 0 && index !== -1) {
//                                        denominator = index;
//                                    }
//                                }
//                                result = result + naturalToText(splitAux[0].substring(0, numerator + 1)) +
//                                        naturalToText("[" + splitAux[0].substring(numerator + 1, splitAux[0].length + 1) + "/" + splitAux[1].substring(0, denominator) + "]") +
//                                        naturalToText(splitAux[1].substring(denominator, splitAux[1].length + 1));
//                            } else {
//                                result = result + naturalToText(split[i]);
//                            }
//                        }
//                    } else {
                result = naturalToText(naturalText);
//                    }
                //text = naturalToText(result);
                //alert(text === null ? "null" : text);
                stack = textToMathml(result);
//                }
                var elements = "";
                for (var i = 0; i < stack.length; i++) {
                    elements = elements + "<li><math>" + stack[i] + "</math></li>";
                }
                $(this).parent().replaceWith(elements);
                focus();
                centralizeCanMoveAndButton();

            } else if (naturalText === "") {
                if ($(this).parent().next().hasClass("labelDefault") || $(this).parent().prev().hasClass("labelDefault")) {
                    $(this).parent().remove();
                } else {
                    $(this).parent().addClass("labelDefault");
                }
            }
        }
    });

    if (selectedEquation.lastStep !== null && selectedEquation.lastStep.step.length > 0) {
        $(selectedSheet + " .canMove li input").animate({
            width: (selectedEquation.lastStep.step.length + 1) * 16
        }, 100, centralizeCanMoveAndButton);
    }

    $(selectedSheet + " .canMove li input:first").focus();
}

function filterNatural(natural) {
    var newNatural = "";
    var split = natural.split(" ");
    for (var j = 0; j < split.length; j++) {
        natural = split[j];
        if (natural.indexOf("/") !== -1) {
            var indexBar = natural.indexOf(")/");
            while (indexBar > 0) {
                var index = -1;
                var cont = 0;
                for (var i = indexBar - 1; i >= 0; i--) { //numerator
                    if (natural[i] === "(") {
                        if (cont === 0) {
                            index = i;
                            break;
                        } else {
                            cont--;
                        }
                    } else if (natural[i] === ")") {
                        cont++;
                    }
                }
                if (index !== -1) {
                    var aux = natural.substring(0, index);
                    var aux2 = natural.substring(index + 1, natural.length);
                    if (aux !== "" && aux2 !== "") {
                        aux = aux + " ";
                    }
                    natural = aux + aux2;
                }
                natural = natural.replace(")/", "/");
                indexBar = natural.indexOf(")/");
            }
            indexBar = natural.indexOf("/(");
            while (indexBar > 0) {
                var index = -1;
                var cont = 0;
                for (var i = indexBar + 2; i < natural.length; i++) { //denominator
                    if (natural[i] === ")") {
                        if (cont === 0) {
                            index = i;
                            break;
                        } else {
                            cont--;
                        }
                    } else if (natural[i] === "(") {
                        cont++;
                    }
                }
                if (index !== -1) {
                    var aux = natural.substring(0, index);
                    var aux2 = natural.substring(index + 1, natural.length);
                    if (aux !== "" && aux2 !== "") {
                        aux = aux + " ";
                    }
                    natural = aux + aux2;
                }
                natural = natural.replace("/(", "/");
                indexBar = natural.indexOf("/(");
            }
            natural = replaceAll(natural, ")/", "/");
            natural = replaceAll(natural, "/(", "/");
        }
        if (newNatural !== "") {
            newNatural = newNatural + " " + natural;
        } else {
            newNatural = natural;
        }
    }
    return newNatural;
}

//coloca o canMove ul no centro da linha
function centralizeCanMoveAndButton() {
    if (!selectedEquation.isComplete) {
        var width = parseInt($(selectedSheet + " .canMove ul").css("width"));
        var x = parseInt($(selectedSheet + " .canMove").css("width"));
        var operation = 0;
        if ($(selectedSheet + " .canMove").html().indexOf("operation") !== -1) {
            operation = 20;
        }
        var test = (x / 2) - (width / 2) - operation;
        $(selectedSheet + " .canMove ul").css("padding-left", test);
    }
//    $("#button").position({
//        of: $(".canMove"),
//        my: "right center",
//        at: "right center"
//    });
}

function centralizeCanCopy() {
    var width = parseInt($(selectedSheet + " .canCopy ul").css("width"));
    var x = parseInt($(selectedSheet + " .canCopy").css("width"));
    var test = (x / 2) - (width / 2);
    $(selectedSheet + " .canCopy ul").css("padding-left", test);
}

function coolAlign() {
    $(selectedSheet + " .coolAlign").position({
        of: $(selectedSheet + " .canCopy"),
        my: "right center",
        at: "right center"
    });
    $(selectedSheet + " .coolAlign").removeClass("coolAlign");
}

function stringToUrl(string) {
    string = replaceAll(string, '+', '%2B');
    string = replaceAll(string, '/', '%2F');
    string = replaceAll(string, '=', '%3d');
    string = replaceAll(string, '#', '%23');
    //string = replaceAll(string, '±', '%b1');
    string = replaceAll(string, '&', '%26');
    return string;
}

function hint() {
    if (!selectedEquation.isComplete) {
        var equation = $(selectedSheet + " .canCopy li").toArray();
        equation = getEquation(equation);
        if (selectedEquation.twoAnswers === true) {
            if (equation === "" || equation === null) {
                equation = selectedEquation.initialEquation;
            } else if (equation.indexOf('a') !== -1 || equation.indexOf('b') !== -1 || equation.indexOf('c') !== -1) {
                equation = selectedEquation.initialEquation;
            }
        }
        requestServer('d', equation, "", "", null);
    } else {
        $("#hintText").html("*Equação já finalizada!");
        $("#hintText").show('blind', 500);
        $(".verticalTape").show('fold', 500);
    }
}

function newEquation() {
    requestServer('n', "", "", "", null);
}

function checkEquation() {
    var passoAnterior = $(selectedSheet + " .canCopy li").toArray();
    passoAnterior = getEquation(passoAnterior);

    if (selectedEquation.initialEquation === "") {
        selectedEquation.initialEquation = passoAnterior;
    }

    var passo = $(selectedSheet + " .canMove li").toArray();
    var equation = getEquation(passo);
//        textToMathml(equation);
    if (equation.indexOf('a') !== -1 || equation.indexOf('b') !== -1 || equation.indexOf('c') !== -1) {
        //check if the a, b and c are corrects!!!
        equation = replaceAll(equation, ';', '&'); //split the equation to get the a, b and c value
        passoAnterior = selectedEquation.initialEquation;
    }

    var typeOperation = "";
//        if ($(".canMove").html().indexOf("operation") === -1) {
//            typeOperation = "OG";
//        } else {
//            typeOperation = $('input[name=operations]:checked').val();
//        }
    typeOperation = "OG";
    if (typeOperation === undefined || typeOperation === null || typeOperation === "") {
        $(selectedSheet + " .operation").css("background", "url('img/ask silver inform.png') no-repeat");
        $(selectedSheet + " .operation").effect("bounce", 500);
    } else {
        if (equation.indexOf("d") !== -1 && passoAnterior.indexOf("d") === -1 || passoAnterior === "" || passoAnterior === null) {
            passoAnterior = selectedEquation.initialEquation;
        } else if (passoAnterior.indexOf("±") !== -1 && equation.indexOf("±") === -1) {
            selectedEquation.initialEquation = passoAnterior;
            selectedEquation.twoAnswers = true;
        }
        requestServer('e', passoAnterior, equation, typeOperation, $(selectedSheet + " #button"));
    }
}

function getAllFractions() {

    var saida = new Array();

    var listElementsSelEq = $(selectedSheet + " .canCopy li").toArray();

    for (var i = 0; i < listElementsSelEq.length; i++) {

        if (listElementsSelEq[i].innerHTML.indexOf("<mfrac>") > -1)
            saida[saida.push()] = getPosition(i, true);

    }

    return saida;

}

function verifyOperator(element) {
    if ((element === "+") || (element === "-") || (element === "/") || (element === "*") || (element === "="))
        return true;
    else
        return false;
}

//Método que recebe a dica e devolve um vetor com as posições dos elementos.
function getElementsEquation(dica) {

    var parseDica = new String(dica);
    var saida = new Array();

    while (parseDica.indexOf("<eq id=") > -1) {

        var part = parseDica.substring(
                parseDica.indexOf("<eq id=") + 7,
                parseDica.indexOf(">")
                );

        var dataElement = getPosition(parseInt(part));

        dataElement.text = getElementText(convertIdPosition(parseInt(part)));
        dataElement.id = parseInt(part);

        saida[saida.push()] = dataElement;
        parseDica = parseDica.substring(parseDica.indexOf("</eq>") + 5);

    }

    return saida;
}

//Método que encapsula o apontar do agente. Caso o elemento desejado esteja
//muito distante do agente, o mesmo será movido.
function pointAgent(elementX, elementY) {

    //existe um espaço ao redor do agente, então tive que adicionar isso aqui.
    var desvioLarg = 62;
    var desvioAlt = 60;

    var agentY = elementY - desvioAlt;
    var agentX = elementX - desvioLarg;

    divaLiteActionPointMove(45, agentX, agentY);

    /*tentei fazer um esquema pelo ângulo, mas não deu muito certo.
     //Obtendo o ângulo
     var deltaX = elementX - agentX;
     var deltaY = elementY - agentY;
     
     var angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
     
     if (angleInDegrees < 0){
     angleInDegrees = angleInDegrees + 360;
     }
     
     
     //Caso o agente esteja muito distante, ficará difícil de apontar.
     //Por isso, decidi mover o agente para perto.
     console.log("Ângulo calculado >>>" + angleInDegrees);
     
     if ((Math.abs(angleInDegrees) > 133)||(Math.abs(angleInDegrees) < 20)||(elementX - agentX > 40))
     divaLiteMoveTo(elementX, agentY);
     
     //Nesse versão serão apenas três ângulos, não teremos tantas animações disponíveis.
     if ( (elementX < agentX) && (angleInDegrees < 45) ) {
     divaLiteActionPointMove(45);
     } else {
     
     if ((elementX > agentX) && (angleInDegrees < 45)) {
     divaLiteActionPointMove(135);
     }
     //simplesmente aponta para cima!
     else {
     divaLiteActionPointMove(90);
     }
     
     }
     
     */


}

function adjustPositionChar() {
    var posElementSel = getPosition(0, true);
    divaLiteMoveTo(posElementSel.left, posElementSel.top - 50);
}

function verifyHint(dica, codigo) {

    //Caso não exista uma dica definida, será ajustado para a animação "DC",
    //ou seja, o agnet irá apenas falar a dica.
    if (codigo === undefined || codigo === "NO")
        codigo = "DC";

    //var codigo = "EI"; //ok
    //var codigo = "TE"; //ok
    //var codigo = "EQ"; //ok
    //var codigo = "EO"; /*elementos + operador*/ // ok
    //var codigo = "ER"; /*elementos + resultado*/ //ok
    //var codigo = "TF"; //ok
    //var codigo = "LE"; //ok
    //var codigo = "AO"; /*all operators */ //ok
    //var codigo = "RA"; /*resultado aluno*/ //ok
    //var codigo = "DC"; //ok

    //dica = "Os termos <eq id=0>3</eq>  e <eq id=1>2</eq> estão ligados por uma operação de multiplicação. <eq id=2>.</eq>";
    //dica = "Os termos <eq id=0>3</eq>  e <eq id=1>2</eq> estão ligados por uma operação de multiplicação.";

    var listElementsSelEq = $(selectedSheet + " .canCopy li").toArray();

    //É necessário reposicionar, senão o balão poderá ficar de fora da tela.

    if (codigo.toUpperCase() !== undefined && codigo.toUpperCase() !== "EQ" && codigo.toUpperCase() !== "DC")
        adjustPositionChar();

    switch (codigo.toUpperCase())
    {
        //Animacao 1, que ira apontar para todos os termos da equação
        case "EI":
            {

                //aqui não será necessário fazer substituições
                divaLiteTipAction(dica);

                var posElementSel;

                for (var i = 0; i < listElementsSelEq.length; i++) {

                    var textSelectElement = listElementsSelEq[i].textContent;

                    if (!verifyOperator(textSelectElement)) {

                        posElementSel = getPosition(i, true);
                        pointAgent(posElementSel.left, posElementSel.top);

                    }

                }

                posElementSel = getPosition(listElementsSelEq.length - 1, true);

                //retirando de cima da equação
                divaLiteActionPointMove(0, posElementSel.left, posElementSel.top + 20);

                break;
            }

            //Animacao 2, que ira apontar para elementos especificados da equacao
        case "TE":
            {

                var listaElementos = getElementsEquation(dica);

                //mostrando a dica já traduzida
                divaLiteTipAction(dica);

                for (var i = 0; i < listaElementos.length; i++) {
                    pointAgent(listaElementos[i].left, listaElementos[i].top);
                }

                //retirando de cima da equação
                divaLiteActionPointMove(0, listaElementos[listaElementos.length - 1].left, listaElementos[listaElementos.length - 1].top + 20);

                break;
            }

            //Animacao 3, que ira apontar para a equacao, sem destaques.
        case "EQ":
            {

                var local = $(selectedSheet).position();
                var offsetLeft = $(selectedSheet + " .canCopy").offset().left + local.left;
                var offsetTop = $(selectedSheet + " .canCopy").offset().top;
                var scrollTop = $(document).scrollTop();

                var posXHint = offsetLeft;
                var posYHint = offsetTop - scrollTop - 20;

                divaLiteActionPointSideHint('middle', dica, posXHint, posYHint);

                //efetuando 'reset' da posição
                //divaLiteActionPointSideHint('idle', '', 20, 100);

                break;
            }

            //Animacao 4, que aponta para certos elementos e no final para um operador.
        case "EO":
            {

                var listaElementos = getElementsEquation(dica);

                //mostrando a dica já interpretada
                divaLiteTipAction(dica);

                var operatorSel = null;

                for (var i = 0; i < listaElementos.length; i++) {

                    if (verifyOperator(listaElementos[i].text)) {
                        operatorSel = listaElementos[i];
                    } else {
                        pointAgent(listaElementos[i].left, listaElementos[i].top);
                    }

                }

                //buscando o operador que está antes. Estou fazendo isso, pois
                //no fim o patSolver não terá como devolver o operador.
                if (operatorSel === undefined || operatorSel === null) {
                    var idReal = convertIdPosition(listaElementos[listaElementos.length - 1].id);
                    operatorSel = getPosition(idReal - 1, true);
                }

                //Apontando apenas para o operador no final
                if (operatorSel !== null) {
                    pointAgent(operatorSel.left, operatorSel.top, 2);

                    //retirando de cima da equação
                    divaLiteActionPointMove(0, operatorSel.left, operatorSel.top + 20);

                }

                break;
            }

            //Animacao 5, que aponta para elementos e no final para o resultado.
        case "ER":
            {

                var listaElementosSel = getElementsEquation(dica);

                //mostrando a dica já traduzida
                divaLiteTipAction(dica);

                for (var i = 0; i < listaElementosSel.length; i++) {
                    pointAgent(listaElementosSel[i].left, listaElementosSel[i].top);
                }

                //procurando pelo resultado da operação    
                var bolParar = false;
                var operatorSel = null;

                for (var i = 0; i < listElementsSelEq.length; i++) {

                    var textSelectElement = listElementsSelEq[i].textContent;

                    //Não se deve pegar o '=' e sim o próximo elemento!
                    if (bolParar === true) {
                        operatorSel = i;
                        break;
                    } else {

                        if (textSelectElement === '=')
                            bolParar = true;

                    }

                }

                //Apontando para o resultado
                if (operatorSel !== null) {
                    var posElementSel = getPosition(operatorSel, true);
                    pointAgent(posElementSel.left, posElementSel.top);

                    //retirando de cima da equação
                    divaLiteActionPointMove(0, posElementSel.left, posElementSel.top + 20);

                }

                break;
            }

            //Animacao 6, que aponta para todas as fracoes
        case "TF":
            {

                var listaElementos = getAllFractions();

                //mostrando a dica já traduzida
                divaLiteTipAction(dica);

                for (var i = 0; i < listaElementos.length; i++) {
                    pointAgent(listaElementos[i].left, listaElementos[i].top);
                }

                //retirando de cima da equação
                divaLiteActionPointMove(0, listaElementos[listaElementos.length - 1].left, listaElementos[listaElementos.length - 1].top + 20);

                break;
            }

            //Animacao 7, que irá apontar para os lados da equacao
        case "LE":
            {

                //Aqui não precisa de substituição
                divaLiteTipAction(dica);

                var operatorSel = null;

                for (var i = 0; i < listElementsSelEq.length; i++) {

                    var textSelectElement = listElementsSelEq[i].textContent;

                    if (textSelectElement === '=') {
                        operatorSel = getPosition(i, true);
                        break;
                    }

                }

                if (operatorSel !== null) {

                    var intLeftSideEq = operatorSel.left - divaLiteWidth() / 2 + 15;
                    var intTopSideEq = operatorSel.top - 50;

                    divaLiteMoveTo(intLeftSideEq, intTopSideEq);

                    divaLiteActionPointSide('left');
                    divaLiteActionPointSide('right');

                    //retirando de cima da equação
                    divaLiteActionPointMove(0, intLeftSideEq, intTopSideEq + 50);


                }

                break;
            }

            //Animacao 8, que irá apontar para todos os operadores
        case "AO":
            {

                divaLiteTipAction(dica);
                var posElementSel = undefined;

                for (var i = 0; i < listElementsSelEq.length; i++) {

                    var operSelect = listElementsSelEq[i].textContent;

                    if (operSelect !== '=' && verifyOperator(operSelect)) {
                        posElementSel = getPosition(i, true);
                        pointAgent(posElementSel.left, posElementSel.top);
                    }

                }

                //retirando de cima da equação
                if (posElementSel !== undefined)
                    divaLiteActionPointMove(0, posElementSel.left, posElementSel.top + 20);


                break;
            }

            //Animacao 9, que irá apontar para o resultado do aluno.
        case "RA":
            {

                var offsetLeft = $(selectedSheet + " .canMove li:nth-child(1)").offset().left;
                var offsetTop = $(selectedSheet + " .canMove li:nth-child(1)").offset().top;
                var scrollTop = $(document).scrollTop();

                var posXHint = offsetLeft - 40;
                var posYHint = offsetTop - scrollTop - 50;

                divaLiteActionPointSideHint('left', dica, posXHint, posYHint);

                //retirando de cima da equação
                divaLiteActionPointMove(0, posXHint, posYHint + 20);

                break;
            }

            //Animacao 10, que irá manter posicao neutra do APA
        case "DC":
            {

                divaLiteTipAnswer(dica);
                break;
            }

        default:
            {
                console.log("Operacao Desconhecida.\r" + codigo.toUpperCase() +
                        "\r Método index.js -> pointAgent");
                break;
            }

    }

}

function requestServer(type, last, next, typeOperation, element) {
    //type = 'd' -> hint
    //type = 'n' -> new equation
    //type = 'e' -> check the equation

    var msg = "";
    if (type === 'd') { //for hint        
        msg = "cassio5;" + type + ";" + last;
    } else {  //for check and for new equation       
        msg = "cassio5;" + type + ";EI:" + last + "#OP:" + typeOperation + "#EXP:" + next;
    }
    //alert(msg);
    console.log("Mensagem enviada ao servidor >>>>> " + msg);
    msg = stringToUrl(msg);
    console.log("Mensagem enviada ao servidor URL >>>>> " + msg);

    $.ajax({url: "../../pat2math/resolver?id=" + selectedEquation.id + "&echo=" + msg + "&callback=?", //200.188.161.124 server   //10.210.2.197:8080 cassio
        dataType: 'jsonp',
        success: function(data) {
            //alert(data[0]);
            console.log("Server answer ->  " + data[0]);
            var split = (data[0] + "").split(";");
            //split[0] = int - id do aluno (não está sendo utilizado)
            //split[1] = boolean - resposta certa
            //split[2] = boolean - operação certa
            //split[3] = boolean - fim da resolução
            //split[4] = String - Mensagem acerto ou erro
            //split[5] = String - Mensagem de feedback para resposta errada
            //split[6] = boolean - se no proximo passo deve ser solicitado a operação
            //split[7] = boolean - se ele pediu uma ajuda na ação anterior e depois acertou

            if (type === 'd') { //for hint        
                //split[0] = string - mensagem de dica             
                //split[1] = int - número de vezes que ele pediu dica por operação
                //split[2] = int - dicas consecutivas total num determinado intervalo (1 min)

                var hint = split[0];
                var codeAnim = undefined;

                if (split.length > 1) {
                    codeAnim = split[1];
                }

                element = $(selectedSheet + " .canCopy ul");

                var nextLine;
                if (element.parent().html().indexOf("<mfrac") !== -1) {
                    nextLine = element.parent().next().next();
                } else {
                    nextLine = element.parent().next();
                }

                //é só comentar essa linha e descomentar a original, para voltar a versão anterior.
                //verifyHint(hint, codeAnim);
                //abaixo está o método original

                //////////////////// encontrar e substituir as equacoes por mathml

                //hint = "Os termos 3 e 2 estão ligados por uma operação de multiplicação.";

                var patt = /<eq( id=(([0-9]+)|((\"|\')[0-9]+(\,[0-9]+)*(\"|\'))))?>([0-9\(\)\+\-\*\/xr\^=])+<\/eq>/gi;
                var result = hint.match(patt);
                if (result !== null && result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        var aux = result[i];
                        var first = "";
                        var end = "";
                        first = aux.substring(0, aux.indexOf(">") + 1);
                        aux = aux.replace(first, "");
                        end = aux.substring(aux.indexOf("<"), aux.length);
                        aux = aux.replace(end, "");
                        //alert(result[i] + "\n" + aux);
                        var mathml = textToMathml(aux);
                        aux = "";
                        for (var j = 0; j < mathml.length; j++) {
                            aux = aux + mathml[j];
                        }
                        aux = "<math>" + aux + "</math>";
                        //aux = first + aux + end;
                        hint = hint.replace(result[i], aux);
                        //alert(aux);
                    }
                }
                //alert(result);


                divaLiteTipAction(hint);

                var x = $("#hint").offset().left;
                var y = $("#hint").offset().top;

                var scrollTop = $(document).scrollTop();

                $("#newPoints").css("left", (x + 80) + "px");
                $("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                $("#newPoints").text("-2");
                $("#newPoints").css("color", "orange");

                $("#newPoints").show("puff", 500, callbackAddPoints(-2));


            } else if (type === 'n') {  //for new equation

                var valores = splitEquation(data[0]);
                var newHtml = "<ul>";
                for (var i = 0; i < valores.length; i++) {
                    newHtml = newHtml + "<li>" + valores[i] + "</li>";
                }
                newHtml = newHtml + "</ul>";
                $(selectedSheet + ".canCopy").html(newHtml);
                centralizeCanCopy();
                draggable();
                element = $(selectedSheet + " .canCopy ul");


                var nextLine;
                if (newHtml.indexOf("<mfrac") !== -1) {
                    nextLine = element.parent().next().next();
                } else {
                    nextLine = element.parent().next();
                }
                nextLine.html(
                        "<ul>" +
                        "<li class='labelDefault'><input type='text'></li>" +
                        "</ul>" +
                        "<div class='trash'></div>" +
                        "<button id='button'></button>");
                $(selectedSheet + " .canCopy li").draggable("disable");
                $(selectedSheet + " .canCopy li").css("opacity", "0.5");
                $(selectedSheet + " .canCopy").removeClass("canCopy");
                $(selectedSheet + " .canMove ul").sortable("disable");
                //$(selectedSheet + " .canMove li").attr("contenteditable", "false");
                $(selectedSheet + " .canMove li").css("opacity", "0.75");
                nextLine.addClass("canMove");
                element.parent().removeClass("canMove");
                element.parent().addClass("canCopy");

                //element.remove();
                $(element).replaceWith("<div class='cool coolAlign'></div>");
                centralizeCanMoveAndButton();
                coolAlign();
                sortable();
                draggable();
                trashHide();
                trashDroppable();
                buttonClick();
                focus();

            } else if (type === 'e') {  //for checking
                var isDelta = false;

                if (split[3] === "true") {

                    //$("#hintBox").slideUp(); //.hide("clip", 1000);
                    $("#hintText").hide('blind', 200);
                    $(".verticalTape").hide('blind', 200);
                    $("#hintText").html("");

                    var nextLine;
                    if (element.parent().html().indexOf("<mfrac") !== -1) {
                        nextLine = element.parent().next().next();
                    } else {
                        nextLine = element.parent().next();
                    }

                    $(selectedSheet + " .trash").remove();
                    if ((next.indexOf('d') === -1 && selectedEquation.twoAnswers === true && selectedEquation.nAnswers === 2) || (next.indexOf('d') === -1 && selectedEquation.twoAnswers === false) || (next.indexOf('d') === -1 && selectedEquation.twoAnswers === true && next.indexOf("±") !== -1)) {
//                        if ($(element).parent().html().indexOf("<mfrac>") === -1) {
//                            $(element).parent().next().html("<div class='final'></div>");
//                        } else {
//                            $(element).parent().next().next().html("<div class='final'></div>");
//                        }
                        nextLine.html("<div class='final'></div><div class='btn btn-info nextEquation' onclick='nextEquationClick();'>Próxima Equação</div>");

                        selectedEquation.isComplete = true;
                    } else {
                        isDelta = true;
                    }
                    if (selectedEquation.twoAnswers === true && next.indexOf('d') === -1) {
                        selectedEquation.nAnswers++;
                    }
//                $(".final").position({
//                    of: $(".canMove"),
//                    my: "right center",
//                    at: "right center"
//                });
                    $(element).replaceWith("<div class='cool coolAlign'></div>");
                    $(selectedSheet + " .coolAlign").position({
                        of: $(selectedSheet + " .canMove"),
                        my: "right center",
                        at: "right center"
                    });


                    $(selectedSheet + " .coolAlign").removeClass("coolAlign");

                    $(selectedSheet + " .canCopy li").draggable("disable");

                    if (selectedEquation.twoAnswers === true && next.indexOf("±") === -1) {
                        var html = $(selectedSheet + " .canMove ul").html();
                        if (selectedEquation.nAnswers === 2) {
                            html = html.replace("<mn>x</mn>", "<mn>x'</mn>");
                            $(selectedSheet + " .canMove ul").html(html);
                        } else {
                            html = html.replace("<mn>x</mn>", "<mn>x\"</mn>");
                            $(selectedSheet + " .canMove ul").html(html);
                        }
                    }

                    $(selectedSheet + " .canMove li").css("color", "blue");
                    $(selectedSheet + " .canCopy").removeClass("canCopy");
                    $(selectedSheet + " .canMove ul").sortable("disable");
                    //$(selectedSheet + " .canMove li").attr("contenteditable", "false");
                    $(selectedSheet + " .canMove").removeClass("canMove");
                    if (isDelta) {
                        nextLine.addClass("canMove");
                        clearLine();

                        if (!selectedEquation.isAnswer()) {
                            selectedEquation.lastStep = null;

                            var x = $(".cool:last").offset().left;
                            var y = $(".cool:last").offset().top;

                            var scrollTop = $(document).scrollTop();

                            $("#newPoints").css("left", (x - 50) + "px");
                            $("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                            $("#newPoints").text("+10");
                            $("#newPoints").css("color", "green");

                            $("#newPoints").show("puff", 500, callbackAddPoints(10));
                        }
                        //$(".labelDefault").focus();
                    } else {
                        addProgressValue(10);
                        selectedEquation.lastStep = null;

                        var x = $(".cool:last").offset().left;
                        var y = $(".cool:last").offset().top;

                        var scrollTop = $(document).scrollTop();

                        $("#newPoints").css("left", (x - 50) + "px");
                        $("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                        var result = selectedEquation.points - selectedEquation.userPoints - selectedEquation.userErrorPoints;

                        $("#newPoints").text("+" + result);
                        $("#newPoints").css("color", "green");


                        $("#newPoints").show("puff", 500, callbackAddPoints(result));

                        divaLiteAction("happy;Parabéns! Continue assim amigo...");
                    }

                    //element.remove();
//                element.parent().removeClass("canMove");
//                alert("Resposta Correta! =D");
                }
                else if (split[1] === "true" && split[2] === "true") {

                    if (next.indexOf("^2") !== -1) {
                        if (selectedEquation.twoAnswers === false) {
                            selectedEquation.twoAnswers = true;
                        }
                    }

                    if (next.indexOf("a") === -1 && next.indexOf("d") === -1 && selectedEquation.initialEquation === last && selectedEquation.twoAnswers === false) {
                        selectedEquation.initialEquation = next;
                    }

                    $(selectedSheet + " .trash").remove();

                    // $("#hintBox").slideUp(); // .hide("clip", 1000);
                    $("#hintText").hide('blind', 500);
                    $(".verticalTape").hide('blind', 500);
                    $("#hintText").html("");
//                    $("#hintBox").animate({
//                        'opacity': '1',
//                        'top': '0'
//                    }, 2000, function() {
//                        $(document).css('overflow', 'auto');
//                    });


                    var nextLine;
                    if (element.parent().html().indexOf("<mfrac") !== -1) {
                        nextLine = element.parent().next().next();
                    } else {
                        nextLine = element.parent().next();
                    }
                    nextLine.html(
                            "<ul>" +
                            "<li class='labelDefault'><input type='text'></li>" +
                            "</ul>" +
                            "<div class='trash'></div>" +
                            "<button id='button'></button>");
                    $(selectedSheet + " .canCopy li").draggable("disable");
                    $(selectedSheet + " .canCopy li").css("opacity", "0.5");
                    $(selectedSheet + " .formula li").css("opacity", "0.5");
                    $(selectedSheet + " .canCopy").removeClass("canCopy");
                    $(selectedSheet + " .canMove ul").sortable("disable");
                    //$(selectedSheet + " .canMove li").attr("contenteditable", "false");
                    $(selectedSheet + " .canMove li").css("opacity", "0.75");
                    nextLine.addClass("canMove");
                    element.parent().removeClass("canMove");
                    element.parent().addClass("canCopy");

                    //element.remove();
                    $(element).replaceWith("<div class='cool coolAlign'></div>");
                    centralizeCanMoveAndButton();
                    coolAlign();
                    sortable();
                    draggable();
                    trashHide();
                    trashDroppable();
                    buttonClick();
                    selectedEquation.lastStep = null;
                    focus();


                    if (!selectedEquation.isAnswer()) {

                        var x = $(".cool:last").offset().left;
                        var y = $(".cool:last").offset().top;

                        var scrollTop = $(document).scrollTop();

                        $("#newPoints").css("left", (x - 50) + "px");
                        $("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                        $("#newPoints").text("+10");
                        $("#newPoints").css("color", "green");

                        $("#newPoints").show("puff", 500, callbackAddPoints(10));
                    }
                }
                else if (split[1] === "false") {
                    $(element).css("background", "url('img/bad.png') no-repeat center");
                    $(element).effect("bounce", 500, setTimeout(function() {
                        $(element).removeAttr("style").hide().fadeIn();
                    }, 1000));

                    var hint;
                    if (split[5] !== "" && split[5] !== null) {
                        hint = split[5];
                    } else {
                        hint = split[4];
                    }

                    divaLiteTipAction(hint);

//                    $("#hintText").hide('blind', 200);
//                    $(".verticalTape").hide('blind', 200);
//
//                    $("#hintText").html("*Dica: " + hint);
//
//                    $("#hintText").show('blind', 500);
//                    $(".verticalTape").show('fold', 500);


                    var x = $(element).offset().left;
                    var y = $(element).offset().top;

                    var scrollTop = $(document).scrollTop();

                    $("#newPoints").css("left", (x - 50) + "px");
                    $("#newPoints").css("top", (y + 5 - scrollTop) + "px");

                    $("#newPoints").text("-5");
                    $("#newPoints").css("color", "orange");

                    $("#newPoints").show("puff", 500, callbackAddPoints(-5));

//                    var passo = $(selectedSheet + " .canMove li").toArray();
//                    var equation = getEquation(passo);

                    clearLine();
                    $(selectedSheet + " .labelDefault input").attr("value", selectedEquation.lastStep.step);
                    focus();


                }
                else if (split[1] === "true" && split[2] === "false") {
                    // operação errada
                }
            }
        }});

}

function nextEquationClick() {
//    $(".nextEquation").click(function() {
    var sheet = parseInt(selectedSheet.replace("#paper-", "")) + 1;
    if (sheet > 10) {
        sheet = 1;  ////// return to Pat2Math page
    }

    $(".nextEquation").fadeOut();
    setTimeout(function() {
        $("#aPaper" + sheet).click();
    }, 500);
//                        });
}

function callbackAddPoints(value) {
    var x = $("#note").offset().left;
    var y = $("#note").offset().top;
    var scrollTop = $(document).scrollTop();

    setTimeout(function() {
        $("#newPoints:visible").animate({
            left: (x + 60) + "px",
            top: (y + 40 - scrollTop) + "px"
        }, 1000);
        $("#newPoints:visible").fadeOut();
        setTimeout(function() {
            selectedEquation.addPoints(value);
        }, 1000);

    }, 1000);
}

function showHint(hint) {
    var lastHint = $("#hintText").html();
    if (lastHint !== "") {
        lastHint = "<br><br>" + lastHint;
    }
    $("#hintText").hide('blind', 200);
    $(".verticalTape").hide('blind', 200);

    $("#hintText").html("*Dica: " + hint + lastHint);
    //$("#hintBox").fadeIn(1000); //.slideDown(); //.show('blind', 1000);
    //$("#hintBox").show();
    $("#hintText").show('blind', 500);
    $(".verticalTape").show('fold', 500);
}

function splitEquation(equation) {
    var split = new Array();
    var cont = 0;
    for (var i = 0; i < equation.length; i++) {
        if (isNumber(equation[i]) || isIncognita(equation[i])) {
            split[cont] = (split[cont] === undefined ? "" : split[cont]) + "" + equation[i];
        } else if (isOperator(equation[i])) {
            cont++;
            split[cont] = equation[i];
            cont++;
        }
    }
    return split;
}

function isNumber(digit) {
    var numbers = "0 1 2 3 4 5 6 7 8 9";
    if (numbers.indexOf(digit) === -1) {
        return false;
        isCoefficient();
    }
    return true;
}

/**
 * @author Felipe de Morais
 * 
 * @description Check if the digit is a letter (upper or lower case)
 * 
 * @param {char} digit - a char that need to be checked.
 * 
 * @return {boolean} indicate if digit is or not a letter
 * */
function isCoefficient(digit) {
    var digit = digit.charCodeAt();
    if ((digit > 64 && digit < 91) || (digit > 96 && digit < 123)) {
        return true;
    }
    return false;
}

/**
 * @author Felipe de Morais
 * 
 * @description Check if the digit is a incognita
 * 
 * @param {char} digit - a char that need to be checked.
 *      
 * @return {boolean} indicate if digit is or not a incognita
 * */
function isIncognita(digit) {
    var incognitas = "x";
    if (incognitas.indexOf(digit) === -1) {
        return false;
    }
    return true;
}

function isOperator(digit) {
    var operators = "+ - *  × = ; ±";// ÷ /
    if (operators.indexOf(digit) === -1) {
        return false;
    }
    return true;
}

function clik()
{
    $("#chalkboard").slideToggle();
}
function clik2()
{
    $("#chalkboard").show("slow");
}