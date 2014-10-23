var appContext = "/pat2math/";

function enableContent(id) {
	$.post(
		appContext + "content/enable",
		{"idContent": id},
		function(data) {
			$("#content-" + id).html("Ok");
		}
	);
}


function loadTasks(id) {	
	var open = $("#tasks"+id).css("display");
	tasksRemaining=0;
	if(open == 'none') {
		topicIsOpen = true;
		
		$.ajax({
			type: "GET",
			url: appContext + "student/showTopic",
			data: {"idSet" : id}, 
			success:
				function(data) {
					$("#tasks" + id).html(data);
					$("#tasks" + id).slideDown(700);
					
					tasksRemaining=$(".task").length;
					
					$(".task").each(
						function() {
							var text = $(this).html();
							
							if(text.length > 30) {
								$(this).html($(this).html().substring(0, 23) + "...");
							}
						}
					);
					resetProgressBar();
					//here tasksremaining contains the number of equations
					progressvalue=100/tasksRemaining;
					progressvalue=Math.trunc(progressvalue);
					/*alert("inicio: "+tasksRemaining);*/
					var taskSolved=$(".icon-ok.icon-white").length;
					/*alert("fim: "+taskSolved);*/
					tasksRemaining=tasksRemaining-taskSolved;
					/*alert("fim: "+tasksRemaining);*/
					if (tasksRemaining===0)addProgressValue(100);
					else addProgressValue(progressvalue*taskSolved);
			  	},
			 error:
				 function(XMLHttpRequest, textStatus, errorThrown) {
			     	alert("Perdão, obtivemos um erro ao processar esta ação.");
			 }
		});
		
		checkEquationTour();
		
		if (isTourInterativo && id === 9) //1
			clickPlan();
	} else {
		topicIsOpen = false;
		$("#tasks"+id).slideUp(700);
	}
}

function loadExercise(id) {
	if (isTourInterativo && id === 201) //3
		clickEquation();
	
	loadingShow();
	$.ajax({
		type: 'GET',
		url: appContext + "student/loadExercise",
		data: {"exerciseId" : id},
		dataType: 'json',
		success: function(data) {
			if(data != null) {
				equation = new Equation(data.equation, 100);
				equation.id = data.id;
				for(var j = 0; j < data.steps.length; j++) {
					equation.steps[j] = new Step(data.steps[j], 0);
				}
					
				if(data.performed) {
					equation.isComplete = true;
				}
				newEquations[0] = equation;
			}
			reloadPaper(1);
			idEquation=id;
			loadingHide();
		}
	});
}

function loadExerciseTest(id) {
	if (isTourInterativo && id === 3) 
		clickEquation();
	
	loadingShow();
	$.ajax({
		type: 'GET',
		url: appContext + "student/loadExerciseTest",
		data: {"exerciseId" : id},
		dataType: 'text',
		success: function(data) {
			if(data != null) {
				data = data.split(";");
				equation = new Equation(data[1], 100);
				equation.id = data[0];
				for(var j = 3; j < data.length; j++) {
					equation.steps[j-3] = new Step(data[j], 0);
				}
				
				if(data[2] == "1") {
					equation.isComplete = true;
				}
				newEquations[0] = equation;
			}
			reloadPaper(1);
			idEquation=id;
			loadingHide();
		}
	});
}

function loadingShow(){
	$('#loading').fadeIn();
	$("#topics").hide("slide", { direction: "left" }, 500);
	$('.hide-menu').fadeOut();
	
}

function loadingHide(){
	$('#loading').fadeOut();
	$("#topics").show("slide", { direction: "left" }, 500);
	$('.hide-menu').fadeIn();
	
}

function changePlan(idGroup, idPlan) {
	$.post(
		appContext + "group/changePlan",
		{"idGroup": idGroup, "idPlan": idPlan},
		function(data) {
			$(".item").attr("class", "item2");
			$("#plan" + data).attr("class", "item");
		}
	);
}

function changeGroup(idGroup) {
	$.post(
		appContext + "student/changeGroup",
		{"idGroup": idGroup},
		function(data) {
			$(".item").attr("class", "item2");
			$("#group" + data).attr("class", "item");
		}
	);
}

function test56() {
	$(".modal").hide();
	$("#mask").hide();
}

function hideMenu() {
	$("#topics").hide();
}

function watchVideo(id) {
	$.post(
		appContext + "video/watch",
		{"id" : id},
		function(data) {
			$("#video-box").html(data);
			$("#mask").fadeIn(700);
			$("#video-box").fadeIn(700);
		}
	);
	idTaskVideo=id;
}

function msgBox(id, msg, action) {
	if(confirm(msg)) {
		location.href = action + "?group.id=" + id;
	} else {
		//nothing
	}
}