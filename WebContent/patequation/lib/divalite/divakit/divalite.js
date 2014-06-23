//Configure the absolute path of your web application
var config = {
		//ABSOLUTE_PATH: 'http://dl.dropbox.com/u/1260101/DivaLite/'
		//ABSOLUTE_PATH: 'file:///E:/PATtoPhysics/PATtoPhysics/dist/divalite/'
		//ABSOLUTE_PATH: 'file:///C:/Users/user/Documents/NetBeansProjects/PATEquationHTML/public_html/divalite/'
                ABSOLUTE_PATH: '/PATEquationHTML/lib/divalite/'
};

//dynamically loads the CSS and Scripts
function loadScript(url, callback){

    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

var head = document.getElementsByTagName('head')[0];

var link1 = document.createElement('link');
link1.type= 'text/css';
link1.rel= 'stylesheet';
link1.href= config.ABSOLUTE_PATH+'divakit/divacharkit/divalite.css';
head.appendChild(link1);


loadScript(config.ABSOLUTE_PATH+'divakit/divajquery/plugins/jquery.slider.js', function() {
	
	loadScript(config.ABSOLUTE_PATH+'divakit/divajquery/plugins/jquery.dependClass.js', function() {
	
		loadScript(config.ABSOLUTE_PATH+'divakit/divacharkit/movementFactory.js', function() {
			
			loadScript(config.ABSOLUTE_PATH+'divakit/divacharkit/charcodeControls.js', function() {
				
				loadScript(config.ABSOLUTE_PATH+'divakit/divacharkit/charcodeControls.js', function() {
		
					loadScript(config.ABSOLUTE_PATH+'divakit/divacharkit/charcode.js', function() {
						
						init(); //DivaLite
						
					});
					
				});
				
			});
			
		});
		
	});
	
});




