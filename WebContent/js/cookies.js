var plan1 = [13, 14, 15, 16, 21, 22, 23, 24, 25, 26, 107, 108, 109, 110];
var plan2 = [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
var plan3 = [55, 56, 57, 58, 59, 60, 61, 62, 63];
var plan4 = [64, 65, 67, 68, 70, 71, 72, 80, 81, 83, 84, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120];
var plan5 = [101, 105, 121, 122, 123, 124, 125, 125, 126, 126, 127, 128, 129, 130, 131, 132, 135, 136, 137, 138, 139, 140, 141, 142, 143];
var plan6 = [144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 162, 180];
var plan7 = [168, 169, 170, 171, 172, 173, 174, 176, 177, 178];
var plan8 = [187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200];
var plan9 = [202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219];

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function binarySearch (array, value) {
	var inf = 0;
	var sup = array.length - 1;
	
	while (sup >= inf) {
		var med = Math.floor ((inf + sup) / 2);
		
		if (value === array[med])
			return med;
		
		else if (value < array[med])
			sup = med - 1;
		
		else
			inf = med + 1;
	}
	
	return -1;
}

$(document).ready(function() {
	var currentEquation = getCookie ("currentEquation");
	
	if (currentEquation != "") {
		if (binarySearch (plan1, currentEquation) !== -1) 
			loadTasks (2);
		
		else if (binarySearch (plan2, currentEquation) !== -1) 
			loadTasks (3);
		
		else if (binarySearch (plan3, currentEquation) !== -1) 
			loadTasks (4);
		
		else if (binarySearch (plan4, currentEquation) !== -1) 
			loadTasks (5);
		
		else if (binarySearch (plan5, currentEquation) !== -1) 
			loadTasks (6);
		
		else if (binarySearch (plan6, currentEquation) !== -1) 
			loadTasks (7);
		
		else if (binarySearch (plan7, currentEquation) !== -1) 
			loadTasks (8);
		
		else if (binarySearch (plan8, currentEquation) !== -1) 
			loadTasks (10);
		
		else
			loadTasks (11);
		
		loadExercise (currentEquation);
		
	}
});