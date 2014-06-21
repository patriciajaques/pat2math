var appContext = "/pat2math/";

$(document).ready(
	function() {
		$('.focus').focus();
		$("html").mousemove(function(p){
			if(p.clientX < 20) {
				$("#topics").show();
			}
			if(p.clientX > 300) {
				$("#topics").hide();
			}
		});
	}
);

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
	
	if(open == 'none') {
		$.ajax({
			type: 'POST',
			url: appContext + "student/loadExercises",
			data: {"idSet" : id},
			success: function(data) {
				for(var i = 0; i < 10; i++) {
					newEquations[i] = new Equation(" ", NORMAL_STEP);
					if(data[i] != null) {
						equation = new Equation(data[i].equation, 100);
						equation.id=data[i].id;
						for(var j = 0; j < data[i].steps.length; j++) {
							equation.steps[j] = new Step(data[i].steps[j], 0);
						}
						
						if(data[i].performed) {
							equation.isComplete = true;
						}
						
						newEquations[i] = equation;
					}
				}
				$("#aPaper1").click();
			}
		});
		
		$.ajax({
			type: "post",
			url: appContext + "student/showTopic",
			data: {"idSet" : id}, 
			success:
				function(data) {
					$("#tasks" + id).html(data);
					$("#tasks" + id).slideDown(700);
			  	},
			 error:
				 function(XMLHttpRequest, textStatus, errorThrown) {
			     	alert("Perdão, obtivemos um erro ao processar esta ação.");
			 }
		});
	} else {
		$("#tasks"+id).slideUp(700);
	}
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
}

//confirm exclusions
function msgBox(id, msg, action) {
	if(confirm(msg)) {
		location.href = action + "?group.id=" + id;
	} else {
		//nothing
	}
}