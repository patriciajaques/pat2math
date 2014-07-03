//-some references about mathml
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
"use strict";

var selectedSheet = "#paper-1";
var selectedEquation;

// variables for the Step object
var NORMAL_STEP = 0; //To represent a normal step
var NORMAL_SOLUTION = 1; //To represent a normal solution (for first degree equations)
var DELTA_SOLUTION = 2; //To represent a delta solution (for second degree equations)
var x1_SOLUTION = 3; //To represent the x'solution (for second degree equations)
var x2_SOLUTION = 4; //To represent the x"solution (for second degree equations)

var eq = new Equation("ss", 100);

//eq.steps = [
//    new Step("a=1;b=3;c=-4", NORMAL_STEP),
//    new Step("d=3^2-4*1*-4", NORMAL_STEP),
//    new Step("d=25", DELTA_SOLUTION),
//    new Step("x=(-3±5)/(2*1)", NORMAL_STEP),
//    new Step("x=(2)/(2)", NORMAL_STEP),
//    new Step("x=1", x1_SOLUTION)
////    new Step("x=(-8)/(2)", NORMAL_STEP),
////    new Step("x=-4", x2_SOLUTION)
//    ];
//eq.addPoints(-23);

var eq2 = new Equation("ss", 70);
//eq2.steps = [
//    new Step("3x=19-7", NORMAL_STEP),
//    new Step("3x=12", NORMAL_STEP),
//    new Step("x=4", NORMAL_SOLUTION)
//];

var newEquations = [// contains the most updated array of equations
    eq,
    eq2,
    new Equation("ss", 50),
    new Equation("ss", 40),
    new Equation("ss", 60),
    new Equation("ss", 50),
    new Equation("ss", 70),
    new Equation("ss", 60),
    new Equation("ss", 80),
    new Equation("ss", 100)];

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


$(document).ready(function() {    
    $("#loadingImage").hide();
    $("#book").show("clip", 500);
    loadScript("/pat2math/patequation/js/paper.js");

    /*$("html").mousemove(function(p) {
        $(".janela").html("X=" + p.clientX + " Y=" + p.clientY);
        if (p.clientX < 4) {
            $("#topics").show();
        }
        if (p.clientX > 300) {
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
                checkEquation();
            }

        } else if (key === 9) { //tab key
            $(".labelDefault:first").focus();
        } else if (event.altKey) {
            if (key === 48 || key === 96) { //alt + 0
                $("#aPaper10").click();
            } else if (key === 49 || key === 97) { //alt + 1
                $("#aPaper1").click();
            } else if (key === 50 || key === 98) { //alt + 2
                $("#aPaper2").click();
            } else if (key === 51 || key === 99) { //alt + 3
                $("#aPaper3").click();
            } else if (key === 52 || key === 100) { //alt + 4
                $("#aPaper4").click();
            } else if (key === 53 || key === 101) { //alt + 5
                $("#aPaper5").click();
            } else if (key === 54 || key === 102) { //alt + 6
                $("#aPaper6").click();
            } else if (key === 55 || key === 103) { //alt + 7
                $("#aPaper7").click();
            } else if (key === 56 || key === 104) { //alt + 8
                $("#aPaper8").click();
            } else if (key === 57 || key === 105) { //alt + 9
                $("#aPaper9").click();
            } else if (key === 66) { //alt + b
                $("#bhaskara").click();
            } else if (key === 67) { //alt + c
                $("#abc").click();
            } else if (key === 68) { //alt + d
                $("#delta").click();
            } else if (key === 76) { //alt + l
                $("#clearLine").click();
            } else if (key === 84) { //alt + t
                $("#addLabel").click();
            } else if (key === 0) { //alt + ?
                $("#hint").click();
            }
        }
    });

    papers.oncontextmenu = function(e) {
        $(".dropdown").css("position", "absolute");
        $(".dropdown").css("left", e.pageX + "px");
        $(".dropdown").css("top", e.pageY - $(document).scrollTop() + "px");
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

    $("#hint").button().click(function() {
        hint();
    });

    loadEquation(0);

    centralizeCanMoveAndButton();
    sortable();
    draggable();
    trashHide();
    trashDroppable();
    centralizeCanCopy();
    buttonClick();
    focus();

    $("#hintText").hide();
    $(".verticalTape").hide();
    $("#newPoints").hide();

    reloadProgressBar();
});

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

/**
 * @author Felipe de Morais
 * 
 * @description This function load a equation from the equations array. If the newEquations array 
 * contains the most recent equation, then the load is from the newEquations array. 
 * 
 * @param {int} index is a value between 0 and 9.
 * 
 * */

function loadEquation(index) {
    var newEquation = newEquations[index];
    selectedEquation = equations[index];
    var go = false;
    //if the newEquations contains the most recent value the equations array receives the newEquations
    if (newEquation.equation !== selectedEquation.equation) {
        var lineTest = $(selectedSheet + " .hLineAux").next();
        for (var i = 0; i < lineTest.children().length; i++) {
            var html = lineTest.html();
            var svg = "";
            if (html && html.indexOf("svg") !== -1) {
                svg = html.substring(html.indexOf("<svg"), html.indexOf("</svg>") + 1);
            }
            lineTest.html(svg);
            lineTest = lineTest.next();
        }
        equations[index] = newEquations[index];
        selectedEquation = equations[index];
        go = true;
        if (index === 0) {
            //update the progress bar if the index is equals to 0
            reloadProgressBar();
        }
    }

    if (go) {

        // get the firs valid line to put content
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

        // if the current equation contains steps, then they have to be loaded together with the equation
        if (selectedEquation.steps !== null && selectedEquation.steps.length > 0) {
            for (var i = 0; i < selectedEquation.steps.length; i++) {
                stack = textToMathml(selectedEquation.steps[i].step);
                selectedEquation.lastStep = selectedEquation.steps[i];

                elements = "<ul>";
                for (var j = 0; j < stack.length; j++) {
                    var elm = stack[j];
                    if (elm === "<mn>x</mn>") {
                        if (selectedEquation.lastStep.type === x1_SOLUTION) {
                            elm = "<mn>x\'</mn>";
                            selectedEquation.nAnswers++;
                            selectedEquation.twoAnswers = true;
                        } else if (selectedEquation.lastStep.type === x2_SOLUTION) {
                            elm = "<mn>x\"</mn>";
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
                        for (var j = i - 1; j >= 0; j--) {
                            if (selectedEquation.steps[j].step.indexOf('±') !== -1) {
                                selectedEquation.lastStep = selectedEquation.steps[j];
                                find = true;
                                break;
                            }
                        }
                        if (!find) {
                            selectedEquation.lastStep = selectedEquation.steps[0];
                        }
                    }
                }

                var equation = selectedEquation.steps[i].step;
                var passoAnterior = "";
                if (i > 0) {
                    passoAnterior = selectedEquation.steps[i - 1].step;
                } else {
                    passoAnterior = selectedEquation.initialEquation;
                }


                if (equation.indexOf('a') !== -1 || equation.indexOf('b') !== -1 || equation.indexOf('c') !== -1) {
                    selectedEquation.lastStep = null;
                }


                if (selectedEquation.steps[i].type !== NORMAL_STEP && selectedEquation.steps[i].type !== x2_SOLUTION && selectedEquation.steps[i].type !== NORMAL_SOLUTION) {
                    selectedEquation.lastStep = null;
                } else if (passoAnterior.indexOf("±") !== -1 && equation.indexOf("±") === -1) {
                    selectedEquation.initialEquation = passoAnterior;
                    selectedEquation.twoAnswers = true;
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
            if (selectedEquation.isComplete || (selectedEquation.lastStep !== null && (selectedEquation.lastStep.type === x2_SOLUTION || selectedEquation.lastStep.type === NORMAL_SOLUTION))) {
                $(selectedSheet + " .canCopy li").css("color", "blue");
                $(selectedSheet + " .canCopy").removeClass("canCopy");
                addProgressValue(10);
                //selectedEquation.lastStep = selectedEquation;
                nextLine.html("<div class='final'></div><div class='btn btn-info nextEquation' onclick='nextEquationClick();'>Próxima Equação</div>");

                var result = selectedEquation.points - selectedEquation.userPoints - selectedEquation.userErrorPoints;
                selectedEquation.addPoints(result);

            } else {
                nextLine.addClass("canMove");
                clearLine('');
//                nextLine.html(
//                        "<ul>" +
//                        "<li class='labelDefault'><input type='text'></li>" + //autofocus='true'
//                        "</ul>" +
//                        "<div class='trash'></div>" +
//                        "<button id='button'></button>");
//
//                centralizeCanMoveAndButton();
//                sortable();
//                draggable();
//                trashHide();
//                trashDroppable();
//                centralizeCanCopy();
//                buttonClick();
//                focus();
            }
        }
    }

    calculatePoints(selectedEquation);

    $("#hintText").hide('blind', 500);
    $(".verticalTape").hide('blind', 500);
    $("#hintText").html("");
}

function calculatePoints(equation) {
    $("#amountPoins").text(equation.userPoints + " de " + equation.points + " pontos");
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
        selectedEquation.currentStep = "";
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
    selectedEquation.currentStep = "";
    //selectedEquation.lastStep = null;

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
    $(selectedSheet + " .labelDefault input").css("width", 48 + "px");
    //selectedEquation.lastStep = null;

    centralizeCanMoveAndButton();
    sortable();
    draggable();
    trashHide();
    trashDroppable();
    buttonClick();
    focus();
    $(selectedSheet + ".labelDefault input").focus();
}

function referenceToABC(a, b, c, focused) {
    var html = $(selectedSheet + " .canMove").html();
    var svg = "";
    if (html.indexOf("svg") !== -1) {
        svg = html.substring(html.indexOf("<svg"), html.indexOf("</svg>") + 1);
    }
    selectedEquation.currentStep = "";
    //selectedEquation.lastStep = null;

    $(selectedSheet + " .canMove").html(
            svg + "<ul>" +
            "<li><math><mn>a</mn></math></li>" +
            "<li><math><mn>=</mn></math></li>" +
            "<li class='labelDefault'><input class='a' type='text' value=" + a + "></li>" +
            "<li>;</li>" +
            "<li><math><mn>b</mn></math></li>" +
            "<li><math><mn>=</mn></math></li>" +
            "<li class='labelDefault'><input class='b' type='text' value=" + b + "></li>" +
            "<li>;</li>" +
            "<li><math><mn>c</mn></math></li>" +
            "<li><math><mn>=</mn></math></li>" +
            "<li class='labelDefault'><input class='c' type='text'  value=" + c + "></li>" +
            "</ul>" +
            "<div class='trash'></div>" +
            "<button id='button'></button>");

    $(selectedSheet + " .labelDefault .a").css("width", (a.length + 1) * 16 + "px");
    $(selectedSheet + " .labelDefault .b").css("width", (b.length + 1) * 16 + "px");
    $(selectedSheet + " .labelDefault .c").css("width", (c.length + 1) * 16 + "px");
    centralizeCanMoveAndButton();
    sortable();
    draggable();
    trashHide();
    trashDroppable();
    buttonClick();
    focus();
    $(selectedSheet + " .labelDefault ." + focused).focus();
}

function referenceToBhaskara() { //± = &PlusMinus;
    var html = $(selectedSheet + " .canMove").html();
    var svg = "";
    if (html.indexOf("svg") !== -1) {
        svg = html.substring(html.indexOf("<svg"), html.indexOf("</svg>") + 1);
    }
    //selectedEquation.lastStep = null;
    selectedEquation.currentStep = "";

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
    $(selectedSheet + " .labelDefault input").css("width", 48 + "px");
    //selectedEquation.lastStep = null;

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

        if ($(this).html().indexOf("input") === -1) {

            var text = $(this).parent().text();
            var a = $(selectedSheet + " .labelDefault .a").val();
            var b = $(selectedSheet + " .labelDefault .b").val();
            var c = $(selectedSheet + " .labelDefault .c").val();
            clearLine();
            if (text.indexOf("a=") !== -1 && text.indexOf("b=") !== -1 && text.indexOf("c=") !== -1) {
                var abc = identifyABC(text);
                if (abc.a === "") {
                    abc.a = a;
                }
                if (abc.b === "") {
                    abc.b = b;
                }
                if (abc.c === "") {
                    abc.c = c;
                }
                var clicked = "";
                var selected = $(this).index();
                var first = 3;
                var second = 7;
                if (abc.a.indexOf("-") !== -1) {
                    first++;
                    second++;
                }
                if (abc.b.indexOf("-") !== -1) {
                    second++;
                }
                if (selected <= first) {
                    clicked = "a";
                } else if (selected > first && selected <= second) {
                    clicked = "b";
                } else if (selected > second) {
                    clicked = "c";
                }
                referenceToABC(abc.a, abc.b, abc.c, clicked);
                selectedEquation.currentStep = text;
            } else {
                $(selectedSheet + " .labelDefault input").attr("value", selectedEquation.currentStep);
                $(selectedSheet + " .labelDefault input").css("width", (selectedEquation.currentStep.length + 1) * 16 + "px");
                centralizeCanMoveAndButton();
                focus();
            }
        }

    });

    $(selectedSheet + " .canMove li").unbind('keyup');

    $(selectedSheet + " .canMove li input").keyup(function(event) {

        $(this).stop().animate({
            width: ($(this).val().length + 1) * 16
        }, 100, centralizeCanMoveAndButton);

    });

    $(selectedSheet + " .canMove li input").unbind('blur');

    $(selectedSheet + " .canMove li input").blur(function() {
        if ($(selectedSheet + " .canMove ul").html().indexOf("ui-sortable-placeholder") === -1) {

            var naturalText = $(this).val();
            selectedEquation.currentStep = naturalText;

            if (naturalText !== "") {
                var stack = "";
                var result = "";

                result = naturalToText(naturalText);

                stack = textToMathml(result);

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

    if (!$(selectedSheet + " .canMove li input:first").hasClass("a")) {
        $(selectedSheet + " .canMove li input:first").focus();
    }
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
//        if ($(selectedSheet + " .canMove").html().indexOf("operation") !== -1) {
//            operation = 20;
//        }
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
    $(selectedSheet + " .canMove li input").blur();
//    var passoAnterior = $(selectedSheet + " .canCopy li").toArray();
//    passoAnterior = getEquation(passoAnterior);
    var passoAnterior = selectedEquation.lastStep;
    if (passoAnterior !== null) {
        passoAnterior = passoAnterior.step;
    } else {
        passoAnterior = selectedEquation.initialEquation;
    }

    //alert(passoAnterior + " -> " + selectedEquation.initialEquation);

//    if (selectedEquation.initialEquation === "") {
//        selectedEquation.initialEquation = passoAnterior;
//    }

    var equation = naturalToText(selectedEquation.currentStep);
    var mathml = getEquation($(selectedSheet + " .canMove li").toArray());
    if (mathml.indexOf('a') !== -1 || mathml.indexOf('b') !== -1 || mathml.indexOf('c') !== -1) {
        equation = mathml;
    }
    //alert(equation + "/n" + selectedEquation.currentStep);
    //selectedEquation.currentStep = equation;

    if (equation.indexOf('a') !== -1 || equation.indexOf('b') !== -1 || equation.indexOf('c') !== -1) {
        //check if the a, b and c are corrects!!!
        //selectedEquation.currentStep = equation;
        equation = replaceAll(equation, ';', '&'); //split the equation to get the a, b and c value
        passoAnterior = selectedEquation.initialEquation;
    }


    if (equation.indexOf("d") !== -1 && passoAnterior.indexOf("d") === -1 || passoAnterior === "" || passoAnterior === null) {
        passoAnterior = selectedEquation.initialEquation;
    } else if (passoAnterior.indexOf("±") !== -1 && equation.indexOf("±") === -1) {
        selectedEquation.initialEquation = passoAnterior;
        selectedEquation.twoAnswers = true;
    }
    requestServer('e', passoAnterior, equation, "OG", $(selectedSheet + " #button"));
}

function identifyABC(step) {
    var a, b, c;
    var a = step.substring(step.indexOf('a=') + 2, step.indexOf(';'));
    step = step.substring(step.indexOf(';') + 1, step.length);
    var b = step.substring(step.indexOf('b=') + 2, step.indexOf(';'));
    step = step.substring(step.indexOf(';') + 1, step.length);
    var c = step.substring(step.indexOf('c=') + 2, step.length);
    return {a: a, b: b, c: c};
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