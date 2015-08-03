var respostas = [0, 0, 0];
var images = ["<img src=/pat2math/patequation/img/bar_00.png border=0>", "<img src=/pat2math/patequation/img/bar_00.png border=0>", "<img src=/pat2math/patequation/img/bar_00.png border=0>"];

function answer(question, answer){
	respostas[question] = answer;
	images[question] = "<img src=/pat2math/patequation/img/bar_" + answer + "0.png border=0>";
	quest();
}

function openQuest ( ) {
	var cookieName = "isQuestOpen" + currentPos;
	setCookieDays (cookieName, "true", 1);
	quest();
}

function requestSaveAnswers(){
	var cookieName = "isQuestOpen" + currentPos;
	setCookieDays (cookieName, "", 0);
	cookieName = "openQuest" + currentPos;
	setCookieDays (cookieName, "false", 5);
	
	$("#mask").fadeOut(700);
	$("#quest-box").fadeOut(700);
	
	if (selectedEquation !== null)
		$("#topicsAux").show();
	
	else
	    $("#topics").fadeIn();	
	

	$.ajax({ url: "/pat2math/saveQuestion?answer1=" + respostas[0] + "&answer2=" + respostas[1] + "&answer3=" + respostas[2],
		dataType: "text",
		success: function(data){

		}
	});
}

function quest ( ) {	
	var modal = "<div style='position:relative; top:0px; left:0px;'>" +
	" <img src=/pat2math/patequation/img/question_logo.png border=0> " +
	"<style>" +
	".question {" +
	"font: normal 20px 'Open Sans', sans-serif;" +
	"}" +
	".title {" +
	"font: bold 40px 'Amatic SC', sans-serif;" +
	"}" +
	".answer {" +
	"font: normal 16px 'Open Sans', sans-serif;" +
	"}" +
	"</style>" +
	"<div style='position:absolute; top:135px; left:78px;'>" +
	"<img src=/pat2math/patequation/img/pergunta.png></img>" +
	"<div style='position:absolute; top:85px; left:-60px;'>" +
	"<p class='question'>1. Me disperso com facilidade</p> " +
	"<div style='position:absolute; top:32px; left:0px;'>" +
	images[0] +
	"<div style='position:absolute; top:23px; left:-14px;'>" +
	"<p class='answer'>Nada</p> " +
	"<div style='position:absolute; top:0px; left:709px;'>" +
	"<p class='answer'>Totalmente</p> " +
	"</div></div>" +
	"<div style='position:absolute; top:0px; left:0px;'>" +
	"<a href=# onclick=answer(0,1)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:75px;'>" +
	"<a href=# onclick=answer(0,2)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:150px;'>" +
	"<a href=# onclick=answer(0,3)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:225px;'>" +
	"<a href=# onclick=answer(0,4)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:300px;'>" +
	"<a href=# onclick=answer(0,5)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:375px;'>" +
	"<a href=# onclick=answer(0,6)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:450px;'>" +
	"<a href=# onclick=answer(0,7)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:525px;'>" +
	"<a href=# onclick=answer(0,8)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:600px;'>" +
	"<a href=# onclick=answer(0,9)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:675px;'>" +
	"<a href=# onclick=answer(0,10)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:85px; left:0px;'>" +
	"<p class='question'>2. Entendo a matéria com facilidade</p> " +
	"<div style='position:absolute; top:32px; left:0px;'>" +
	images[1] +
	"<div style='position:absolute; top:23px; left:-14px;'>" +
	"<p class='answer'>Nada</p> " +
	"<div style='position:absolute; top:0px; left:709px;'>" +
	"<p class='answer'>Totalmente</p> " +
	"</div></div>" +
	"<div style='position:absolute; top:0px; left:0px;'>" +
	"<a href=# onclick=answer(1,1)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:75px;'>" +
	"<a href=# onclick=answer(1,2)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:150px;'>" +
	"<a href=# onclick=answer(1,3)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:225px;'>" +
	"<a href=# onclick=answer(1,4)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:300px;'>" +
	"<a href=# onclick=answer(1,5)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:375px;'>" +
	"<a href=# onclick=answer(1,6)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:450px;'>" +
	"<a href=# onclick=answer(1,7)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:525px;'>" +
	"<a href=# onclick=answer(1,8)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:600px;'>" +
	"<a href=# onclick=answer(1,9)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:675px;'>" +
	"<a href=# onclick=answer(1,10)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:100px; left:0px;'>" +
	"<p class='question'>3. Sou atento</p>" +
	"<div style='position:absolute; top:32px; left:0px;'>" +
	images[2] +
	"<div style='position:absolute; top:23px; left:-14px;'>" +
	"<p class='answer'>Nada</p> " +
	"<div style='position:absolute; top:0px; left:709px;'>" +
	"<p class='answer'>Totalmente</p> " +
	"</div></div>" +
	"<div style='position:absolute; top:0px; left:0px;'>" +
	"<a href=# onclick=answer(2,1)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:75px;'>" +
	"<a href=# onclick=answer(2,2)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:150px;'>" +
	"<a href=# onclick=answer(2,3)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:225px;'>" +
	"<a href=# onclick=answer(2,4)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:300px;'>" +
	"<a href=# onclick=answer(2,5)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:375px;'>" +
	"<a href=# onclick=answer(2,6)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:450px;'>" +
	"<a href=# onclick=answer(2,7)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:525px;'>" +
	"<a href=# onclick=answer(2,8)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:600px;'>" +
	"<a href=# onclick=answer(2,9)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>" +
	"<div style='position:absolute; top:0px; left:675px;'>" +
	"<a href=# onclick=answer(2,10)><img src=/pat2math/patequation/img/opcao.png></img></a>" +
	"</div>";
	
	if (respostas[0] !== 0 && respostas[1] !== 0 && respostas[2] !== 0)
	    modal += "<div style='position:absolute; top:57px; left:242px;'>" +
		         "<a href=# onclick=requestSaveAnswers()><img src=/pat2math/patequation/img/check_answers.png></img></a>" +
		         "</div>";
	
	$("#quest-box").html(modal);
	$("#mask").fadeIn(700);
	$("#quest-box").fadeIn(700);
	$("#topics").fadeOut();
}