
//Main class
//==================================================================
DIVA_character_controls = function(charImg,options) 
//==================================================================
{

	//create the container whith controls (zoom in, zoom out, pan up, pan down, pan right, pan left)
	var controls = $('<div />');
	//controls.css('display', 'none');	
	controls.css('position', 'absolute');
	controls.css('opacity', '0.7');
	controls.css('right', '10px');
	controls.css('bottom', '10px');
	controls.css('display','none');
	
	//create the image of the controls
	var imgControls = $('<img />');

	imgControls.attr('src',config.ABSOLUTE_PATH+'/divakit/divacharkit/picts/controls.png');
	
	//append the img controls to controls container
	imgControls.appendTo(controls);

	//create the map of controls
	//#IE_FIX - You must specify the background color to see the div in Internet Explorer (because the div is empty).
	//			Not to hide the image control, is necessary set opacity 0%
	var aPanUp = $('<div style="background-color:white;filter:alpha(opacity=0); opacity:0.0;position: absolute; top: 2px; left: 19px; width: 15px; height: 17px;cursor:pointer" title="Pan Up" />');
	var aPanRight = $('<div style="background-color:white;filter:alpha(opacity=0); opacity:0.0;position: absolute; top: 17px; left: 39px; width: 12px; height: 15px;cursor:pointer" title="Pan Right" />');
	var aPanLeft = $('<div style="background-color:white;filter:alpha(opacity=0); opacity:0.0;position: absolute; top: 16px; left: 3px; width: 15px; height: 17px;cursor:pointer" title="Pan Left" />');
	var aPanDown = $('<div style="background-color:white;filter:alpha(opacity=0); opacity:0.0;position: absolute; top: 30px; left: 20px; width: 14px; height: 13px;cursor:pointer" title="Pan Down" />');
	var aZoomIn = $('<div style="background-color:white;filter:alpha(opacity=0); opacity:0.0;position: absolute; top: 58px; left: 0px; width: 22px; height: 19px;cursor:pointer" title="Zoom In" />');
	var aZoomOut = $('<div style="background-color:white;filter:alpha(opacity=0); opacity:0.0;position: absolute; top: 57px; left: 33px; width: 21px; height: 21px;cursor:pointer" title="Zoom Out" />');

	//implements events
	aPanUp.click( function(event) { pan('up'); event.stopImmediatePropagation(); return false; } );
	aPanRight.click( function(event) { pan('right'); event.stopImmediatePropagation(); return false; } );
	aPanLeft.click( function(event) { pan('left'); event.stopImmediatePropagation(); return false; } );
	aPanDown.click( function(event) { pan('down'); event.stopImmediatePropagation(); return false; } );
	aZoomIn.click( function(event) { zoom('in'); event.stopImmediatePropagation(); return false; } );
	aZoomOut.click( function(event) { zoom('out'); event.stopImmediatePropagation(); return false; } );

	//stop the event propagation on double click event
	aPanUp.dblclick( function(event) { event.stopImmediatePropagation(); return false; } );
	aPanRight.dblclick( function(event) { event.stopImmediatePropagation(); return false; } );
	aPanLeft.dblclick( function(event) { event.stopImmediatePropagation(); return false; } );
	aPanDown.dblclick( function(event) { event.stopImmediatePropagation(); return false; } );
	aZoomIn.dblclick( function(event) { event.stopImmediatePropagation(); return false; } );
	aZoomOut.dblclick( function(event) { event.stopImmediatePropagation(); return false; } );

	//function called when change the position to up,down,left or right
	var pan = function(DownUpLeftRight) {
		
		var tImg = parseInt(charImg.css('top'));
		var lImg = parseInt(charImg.css('left'));

		switch (DownUpLeftRight) {
			case 'down':
				charImg.css('top',tImg+(options.zoomSensivity/2)+'px');
				break;
			case 'up':
				charImg.css('top',tImg-(options.zoomSensivity/2)+'px');
				break;
			case 'right':
				charImg.css('left',lImg+(options.zoomSensivity/2)+'px');
				break;
			case 'left':
				charImg.css('left',lImg-(options.zoomSensivity/2)+'px');
				break;
			default:
		}
	}
	
	//function called when zoom in or out
	var zoom = function(inOut) {

		var wImg = parseInt(charImg.css('width'));
		var hImg = parseInt(charImg.css('height'));
		var lImg = parseInt(charImg.css('left'));
		
		var val = (inOut == 'in' ? options.zoomSensivity : (options.zoomSensivity*-1));

		charImg.css('width',wImg+val+'px');
		charImg.css('height',hImg+val+'px');
		
		charImg.css('left',lImg-(val/2)+'px');
	}
	
	aPanUp.appendTo(controls);
	aPanRight.appendTo(controls);
	aPanLeft.appendTo(controls);
	aPanDown.appendTo(controls);
	aZoomIn.appendTo(controls);
	aZoomOut.appendTo(controls);
		
	//create the slider to control the movements speed (using jSlider plugin @see plugins folder in divajquery)
	if (options.showSpeed) {
		//set the container control height
		controls.css('height','120px');
		//create the slider
		var controlsSlider = $('<div title="Movement Speed" class="layout-slider" style="padding-top:10px;width: 100%">');
		var controlsSliderSpan = $('<span style="display: inline-block; width: 55px;">');
		var controlsSliderInput = $('<input id="Slider1" type="slider" name="price" value="'+options.movieSpeed+'">');
		controlsSliderInput.appendTo(controlsSliderSpan);
		controlsSliderSpan.appendTo(controlsSlider);
		controlsSlider.appendTo(controls);
		controlsSliderInput.slider({ from: 0, 
									 to: 100, 
									 step: 1, 
									 smooth: true, 
									 round: 0, 
									 dimension: "&nbsp;", 
									 skin: "blue" , 
									 callback: function( value ) { 
										 							eval('var newOption = { movieSpeed:'+value+' };');
										 							$.extend(options, newOption);
										 						  }    
								   });
	}	
	return controls;
};

