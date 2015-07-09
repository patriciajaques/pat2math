var respostas = new Array();

function answer(question, answer){
	respostas[question] = answer;
}

function requestSaveAnswers(){
	/* Ver porquê não está funcionando o request saveQuestion, dá o erro 404
	 * O saveQuestion está dentro do ResolverController.java
	 */
	$.ajax({ url: "/pat2math/saveQuestion?answer1=" + respostas[0] + "&answer2=" + respostas[1] + "&answer3=" + respostas[2],
		dataType: "text",
		success: function(data){
			alert(data);
		}
	});
}

function answer1q1 ( ) {
	var image1 = "<img src=/pat2math/patequation/img/bar_10.png border=0>";
	
	var cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image1" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_10.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer1q2 ( ) {
    var image2 = "<img src=/pat2math/patequation/img/bar_10.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_10.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer1q3 ( ) {
	var image3 = "<img src=/pat2math/patequation/img/bar_10.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_10.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer2q1 ( ) {
	var image1 = "<img src=/pat2math/patequation/img/bar_20.png border=0>";
	
	var cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image1" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_20.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer2q2 ( ) {
    var image2 = "<img src=/pat2math/patequation/img/bar_20.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_20.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer2q3 ( ) {
	var image3 = "<img src=/pat2math/patequation/img/bar_20.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_20.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer3q1 ( ) {
	var image1 = "<img src=/pat2math/patequation/img/bar_30.png border=0>";
	
	var cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image1" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_30.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer3q2 ( ) {
    var image2 = "<img src=/pat2math/patequation/img/bar_30.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_30.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer3q3 ( ) {
	var image3 = "<img src=/pat2math/patequation/img/bar_30.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_30.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer4q1 ( ) {
	var image1 = "<img src=/pat2math/patequation/img/bar_40.png border=0>";
	
	var cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image1" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_40.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer4q2 ( ) {
    var image2 = "<img src=/pat2math/patequation/img/bar_40.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_40.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer4q3 ( ) {
	var image3 = "<img src=/pat2math/patequation/img/bar_40.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_40.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer5q1 ( ) {
	var image1 = "<img src=/pat2math/patequation/img/bar_50.png border=0>";
	
	var cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image1" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_50.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer5q2 ( ) {
    var image2 = "<img src=/pat2math/patequation/img/bar_50.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_50.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer5q3 ( ) {
	var image3 = "<img src=/pat2math/patequation/img/bar_50.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_50.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer6q1 ( ) {
	var image1 = "<img src=/pat2math/patequation/img/bar_60.png border=0>";
	
	var cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image1" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_60.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer6q2 ( ) {
    var image2 = "<img src=/pat2math/patequation/img/bar_60.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_60.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer6q3 ( ) {
	var image3 = "<img src=/pat2math/patequation/img/bar_60.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_60.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer7q1 ( ) {
	var image1 = "<img src=/pat2math/patequation/img/bar_70.png border=0>";
	
	var cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image1" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_70.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer7q2 ( ) {
    var image2 = "<img src=/pat2math/patequation/img/bar_70.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_70.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer7q3 ( ) {
	var image3 = "<img src=/pat2math/patequation/img/bar_70.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_70.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer8q1 ( ) {
	var image1 = "<img src=/pat2math/patequation/img/bar_80.png border=0>";
	
	var cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image1" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_80.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer8q2 ( ) {
    var image2 = "<img src=/pat2math/patequation/img/bar_80.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_80.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer8q3 ( ) {
	var image3 = "<img src=/pat2math/patequation/img/bar_80.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_80.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer9q1 ( ) {
	var image1 = "<img src=/pat2math/patequation/img/bar_90.png border=0>";
	
	var cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image1" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_90.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer9q2 ( ) {
    var image2 = "<img src=/pat2math/patequation/img/bar_90.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_90.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer9q3 ( ) {
	var image3 = "<img src=/pat2math/patequation/img/bar_90.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_90.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer10q1 ( ) {
	var image1 = "<img src=/pat2math/patequation/img/bar_100.png border=0>";
	
	var cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image1" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_100.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer10q2 ( ) {
    var image2 = "<img src=/pat2math/patequation/img/bar_100.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	var image3 = getCookie (cookieName);
	
	if (image3 === "")
		image3 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_100.png border=0>", 1);

	quest (image1, image2, image3);
}

function answer10q3 ( ) {
	var image3 = "<img src=/pat2math/patequation/img/bar_100.png border=0>";
	
	var cookieName = "image1" + currentPos;
	var image1 = getCookie (cookieName);
	
	if (image1 === "")
		image1 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image2" + currentPos;
	var image2 = getCookie (cookieName);
	
	if (image2 === "")
		image2 = "<img src=/pat2math/patequation/img/bar_00.png border=0>";
	
	cookieName = "image3" + currentPos;
	setCookieDays (cookieName, "<img src=/pat2math/patequation/img/bar_100.png border=0>", 1);

	quest (image1, image2, image3);
}
