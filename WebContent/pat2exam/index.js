$(document).ready(function() {	
	generateTest(1);
});

function generateTest(id) {
	var html = '<span class="topic" style="width: 255px; margin-left: 5px; background: #82C785" onclick="loadTasks(' + id + ')"> Equações </span> <div id="tasks' + id + '" class="tasks"></div>';
	document.getElementById("the_list").innerHTML = html;
}