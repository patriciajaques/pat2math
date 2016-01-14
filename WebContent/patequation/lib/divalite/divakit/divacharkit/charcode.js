//Global vars
var divaLiteDebugger;

//Main class
//==================================================================
DIVA_character = function(args) 
//==================================================================
{
	//id of the char
	var idCharacter;
	
	//reference of img that represent the char
	var charImg; 
	
	//reference of char container
	var charImgContainer;
	
	//reference of track pointer
	var trackPointer;
	
	//reference of main container (div)
	var container;
	
	//reference of load bar
	var loadBar;
	
	//reference of speech bubble container
	var speechBubbleContainer;
	
	//reference of DIVA_movement_factory
	this.movementFactory;

	//referente of controls container
	var controls;
	
	//configurations to restore the iconify function
	var iconifyOptions = {
		iconify:				false,		   // if the agent in iconify mode
		posx:                   0,             // current horizontal position in pixels from left page border of top-left
		posy:                   0,             // current vertical position in pixels from top page border of top-left		
		pictw:                  500,           // current width
		picth:                  500,           // current height	
		containerWidth:			500 		   // current container width
	};
	
	//configurations of char
	var options = {

		pictspath:              config.ABSOLUTE_PATH+'/divapicts/', //folder with movements picts

		charname:               'cyril',       // internal name of the graphic character 
		resolution:             'normal',      // resolution of char's image	
		draggable:              true, 	       // tells if drag is authorized
	    posx:                   0,             // current horizontal position in pixels from left page border of top-left
	   	posy:                   0,             // current vertical position in pixels from top page border of top-left 
	   	pictw:                  500,           // current width
		picth:                  500,           // current height
		position:				'absolute',	   // position of char in container
  
		containerWidth:			300,           // default width of the main container
		speechBubbleWidth:      350,		   // width of the speech bubble 
		
		speechBubbleFontSize:   undefined,     // font size of the bubble
		speechBubbleFontFamily: undefined,     // font family of the bubble
		speechBubbleFontColor:  undefined,     // font color of the bubble
		
		resizable:              true,          // tells if resize is authorized

		scrollable:             true,          // tells if the char must be scrolled when the page is scrolled 
		framed:                 1,	           // tells if agent is framed with border of size n in pixels
		frameColor:             '#000000',     // color of the frame
		 
		movieSpeed:             90,           // interval of changes of animation frames (0-100)
		
		z_index:                1,   	       // z-index property of the agent
		
		debug: 	                false,	       //enabled/disabled debugger window
		
		staticImage:            '',            //defines a static image to represent the char (ignoring the movements images) 
		
		//track config
		trackPointerTop:        '10%',		   //top position of the track pointer reference
		trackPointerLeft:       '47%',		   //left position of the track pointer reference
			
		//load bar options
		loadBarFramed:          1,             //tells if load bar is framed with border of size n in pixels 
		loadBarFrameColor :     '#000000',     //color of the frame
		loadBarBackgroundColor: '#DDDDDD',     //color of background of load bar

		//controls
		showControls:           true,		   //enable/disabled zoom controls
		zoomSensivity:          50,			   //zoom sensivity
		showSpeed:				true,		   //enable/disable the slider movement control
		
		corporalMovements:		undefined,	   //a list of movements, that will be used in corporal movements
		preLoadMovements:		undefined,	   //a lista of movements, that will be preloaded
			
		//Events
		click:				    function() {}, //function called when click in the char
		dblclick:               function() {}, //function called when double click in the char
		mouseover:				function() {}, //function called when mouse pass over the char
		mouseout:				function() {}, //function called when mouse out of the char
		dragStart:				function() {}, //function called when the drag char is started
		dragStop:				function() {}  //function called when the drag char is stoped
		
 	};
 		
	//Accepts the options received from the args parameter
 	$.extend(options, args);
	

	/**
	 *   Method create
 	 *   Creates the DOM structure of the char
	 */
	//==================================================================
	this.create = function() 
	//==================================================================	
	{
	
		idCharacter = generateUID();
		
		//create the instance of DIVA_movement_factory
		this.movementFactory = new DIVA_movement_factory(this);
		this.movementFactory.create();
		
		// creates the main container (DIV)
		container = $('<div />');
		container.attr('class','divaContainer');
		container.attr('id','container'+idCharacter);
		container.css('position', options.position);
		container.css('top', options.posy);
		container.css('left', options.posx);
		container.css('width', options.containerWidth);
		container.css('height', options.picth);		
		container.css('z-index', options.z_index);
		container.css('border', options.framed+'px solid ' + options.frameColor);
		
		//implements events
		container.click(options.click);
		container.dblclick(options.dblclick);
		container.mouseover(options.mouseover); 
		container.mouseout(options.mouseout);

		trackPointer = $('<div />');	
		trackPointer.css('position', 'absolute');
		trackPointer.css('width', '10px');
		trackPointer.css('height', '10px');
		trackPointer.css('background-color', 'red');
		trackPointer.css('top', options.trackPointerTop);
		trackPointer.css('left', options.trackPointerLeft);
		trackPointer.css('display', 'none');
				
		charImgContainer = $('<div />');	
		charImgContainer.css('position', 'relative');
		charImgContainer.css('top', 0);
		charImgContainer.css('left', 0);
		charImgContainer.css('width', '100%');
		charImgContainer.css('height', options.picth);			
		charImgContainer.css('overflow','hidden');
		
		charImgContainer.css('display','block');
		
		// creates the img of the char
		// by default, reference the static image (original char position)
		charImg = $('<img />');
		charImg.attr('id',idCharacter);

		//if have a static image, use it
		if (options.staticImage) {
		
			charImg.attr('src', options.staticImage);

		//else, use the char default image
		} else {
		
			this.setDefaultCharImage();
		
		}
		
		charImg.css('width', options.pictw);
		charImg.css('height', options.picth);
		charImg.css('position', 'absolute'); 
		charImg.css('top', '0px'); 
		charImg.css('left', '0px');
		
		//adjust the pict width with the container width
		centralizeCharInContainer();

		if (options.showControls == true) {

			//create the container whith controls (zoom in, zoom out, pan up, pan down, pan right, pan left)
			controls = new DIVA_character_controls(charImg,options);

			container.hover(function(){ if (!iconifyOptions.iconify) { controls.fadeIn(500); } },function(){ controls.fadeOut(500); });
			
		}
		
		//when click on main container, place him in front of all other containers(z-index)
		container.click( function() { 
				         	divs = $('div.divaContainer');
				         	max_z_index = 0;					
				         	for (i=0;i<divs.length;i++) {
				         		if ($(divs[i]).css('z-index') > max_z_index) {
				         			max_z_index = $(divs[i]).css('z-index');
				         		}
				         	} 
				         	$(this).css('z-index',++max_z_index);
						});

		// set draggable configuration	
		container.draggable( { disabled:!options.draggable, 
					    	   cursor:'move', 
					    	   opacity:0.70, 
					    	   stack: '.divaContainer', //when drag the char, place him in front of all other chars(z-index)
					    	   //drag: bubbleReposition,
					    	   start: function(event,ui) { 
								   							if ($.isFunction(options.dragStart)) {
								   								options.dragStart(event,ui);
								   							}
		   												 },
					    	   stop: function(event,ui)  { 
					    		   							options.posy = ui.position.top; 
					    		   							options.posx = ui.position.left;
					    		   							if ($.isFunction(options.dragStop)) {
					    		   								options.dragStop(event,ui);
					    		   							}
					    		   						 }
					  		});
		
		//set resizable configuration
		container.resizable( {aspectRatio: false, 
							  handles: 's', 
							  autoHide: true, 
							  alsoResize: charImgContainer, 
							  disabled:!options.resizable,
							  stop: function(event,ui) { options.picth = ui.size.height; options.pictw = ui.size.height; },
							  resize: function(event, ui) { 
								  								//set the proportional height and width of the char
								  								charImg.css('height', ui.size.height);
								  								charImg.css('width', ui.size.height);
								  								centralizeCharInContainer();								  								
								  						   } 
							});

		//create the speech bubble container
		speechBubbleContainer = $('<div />');
		speechBubbleContainer.css('position', 'relative');
		speechBubbleContainer.css('width', options.speechBubbleWidth);
		speechBubbleContainer.css('display','none');
		speechBubbleContainer.css('border', options.framed+'px solid ' + options.frameColor);
				
		//create and configure bubble		
		var speechBubble = $('<div />');
		speechBubble.addClass('speech-bubble');
		
		//append the speech bubble to document.body
		speechBubble.appendTo(speechBubbleContainer);
		speechBubbleContainer.appendTo(container);

		//append the char image to container
		charImg.appendTo(charImgContainer);
		charImgContainer.appendTo(container);
	
		//append the controls of the image to container
		if (controls) {
			controls.appendTo(container);
		}
		
		trackPointer.appendTo(container);
		
		container.appendTo(document.body);
		
		//creates the load images bar
		loadBar = createLoadBar();		
		loadBar.appendTo(container);
		
		//shows the debug?
		if (options.debug) {
		
			//if the debugger has not yet been created, create it
			if (!divaLiteDebugger) {
				//append the debug window to document.body
				createDebugWindow().appendTo(document.body);
			}	
		
			//add the char to degub select input
		
			//#IE_FIX 
			//create the option with DOM don't work in Internet Explorer
			//	var optionChar = $('<option />');
			//	optionChar.attr('value',idCharacter);
			//	optionChar.attr('text',options.name);
			//	$('#debugCharacterSelect').append(optionChar);
			//then, add the option with the html text
			$('#debugCharacterSelect').append( "<option value='"+idCharacter+"'>"+options.charname+"</option>" );
			
			//stores a reference of the char in the debugger
			divaLiteDebugger.data(idCharacter,this);
		}
		
		//#IE_FIX 
		//is necessary to set the position again after include the container on the page
		//because in IE, the position is still relative
		$('#container'+idCharacter).css('position', options.position);
		
		if (divaLiteDebugger) {
			divaLiteDebugger.log('Character '+options.name +' created');
		}
		
		if (options.corporalMovements) {
			for (i=0;i<options.corporalMovements.length;i++) {
				this.movementFactory.addPreLoadCorporalMovements(options.corporalMovements[i]);
			}
		}
		if (options.preLoadMovements) {
			for (i=0;i<options.preLoadMovements.length;i++) {
				this.movementFactory.addPreLoadMovements(options.preLoadMovements[i]);
				
			}
		}
		
		//capture the mouse movement in the page
		$(document.body).bind('mousemove', {mv: this.movementFactory}, function(event) {
			mouseMove(event,event.data.mv);
		});
	
		this.movementFactory.preLoadMovements();
		
		return;
	};

	/**
	 *   Method mouseMove
 	 *   function called when the mouse move to generate the movement that track the mouse pointer
 	 *   this movement is made up of 49 images (7x7 matrix) representing all angles of vision
	 */
	//==================================================================
	var mouseMove = function(e,mv) {
	//==================================================================
		   
		if (mv.getEnableTrack()) {
			
			var topTrack = parseInt(trackPointer.css('top')) + parseInt(container.css('top'));
			var leftTrack = parseInt(trackPointer.css('left')) + parseInt(container.css('left'));
	
			var topMouse = e.pageY;
			var leftMouse = e.pageX;
			
			var gapTop =  topMouse - topTrack;
			var gapLeft =  leftMouse - leftTrack;
			
			var block = 50;
			var blockLeft = ((gapLeft - (gapLeft % block))/block);
			var blockTop = ((gapTop - (gapTop % block))/block);
			blockTop = (blockTop < 0 ? (blockTop+3)*7 : (blockTop > 0 ? (blockTop+3)*7 : 21)  );
			blockLeft = (blockLeft < 0 ? (blockLeft+3): (blockLeft > 0 ? (blockLeft+3) : 3)  );
			blockTop = (blockTop < 0 ? 0 : (blockTop > 42 ? 42 : blockTop) );
			blockLeft = (blockLeft < 0 ? 0 : (blockLeft > 6 ? 6 : blockLeft) );
			var posBlock = parseInt(blockTop)+parseInt(blockLeft);
			
			var img = mv.getFrame('track', posBlock);
			charImg.attr('src',img);
		}	
	}
	
	/**
	 *   Method toggleTrackPointer
 	 *   function toggle the track pointer reference
	 */
	//==================================================================
	this.toggleTrackPointer = function() {
	//==================================================================
		trackPointer.toggle();
	}
	
	/**
	 *   Method setDefaultCharImage
 	 *   Set the default char image
	 */
	//==================================================================
	this.setDefaultCharImage = function() {
	//==================================================================		
		charImg.attr('src', options.pictspath+options.charname+'/'+options.resolution+'/static/static.png');
		return true;
	};
	
	/**
	 *   Method getIdCharacter
 	 *   Return the id of charachter
	 */
	//==================================================================
	this.getIdCharacter = function() {
	//==================================================================		
		return idCharacter;
	};
	
	/**
	 *   Method setCharImg
 	 *   Set the char image
	 */
	//==================================================================
	this.setCharImg = function(img) {
	//==================================================================		
		charImg.attr('src',img);
		return true;	
	};
	
	/**
	 *   Method getOptions
 	 *   Return the options of charachter
	 */
	//==================================================================
	this.getOptions = function() {
	//==================================================================		
		return options;
	};
	
	/**
	 *   Method goTo
 	 *   Move the char to specified position
	 */
	//==================================================================
	this.goTo = function(x,y) {
	//==================================================================		
		this.setOption('posx', x);
		this.setOption('posy', y);
	};
	
	/**
	 *   Method moveTo
 	 *   Move the char to specified position
	 */
	//==================================================================
	this.moveTo = function(x,y,speed,callback) {
	//==================================================================		
		container.animate({
			top: y,
			left: x
		}, speed,function() {   
								//set the new position in properties
								eval('var newOption = { posx:'+x+', posy:'+y+' };');
								$.extend(options, newOption);
								
								//callback
								if ($.isFunction(callback)) {
									callback();
								};
							 });
	};
	
	/**
	 *   Method setOption
 	 *   Set a specified option of character
	 */
	//==================================================================
	this.setOption = function(option,value) {
	//==================================================================		
		
		//set new property
		eval('var newOption = { '+option+':\''+value+'\' };');
		$.extend(options, newOption);
		
		//refresh the configurations
		if (option == 'posx' || option == 'posy') {
			container.css('top', parseInt(options.posy));
			container.css('left', parseInt(options.posx));
		}
		if (option == 'pictw') {
			container.css('width', options.pictw);
			charImg.css('width', options.pictw);
			this.setOption('containerWidth', options.pictw);
		}
		if (option == 'picth') {
			container.css('height', options.picth);
			charImgContainer.css('height', options.picth);
			charImg.css('height', options.picth);
		}
		if (option == 'framed' || option == 'frameColor') {
			container.css('border', options.framed+'px solid ' + options.frameColor);
			speechBubbleContainer.css('border', options.framed+'px solid ' + options.frameColor);
		}
		if (option == 'containerWidth') {
			//adjust the container position
			var originalWidth = parseInt(container.css('width'));
			var gap = options.containerWidth - originalWidth;
			if (gap != 0) {
				container.css('left', (parseInt(container.css('left'))-gap/2));
			}
			container.css('width', options.containerWidth);
			centralizeCharInContainer();
			adjustLoadBarWidth();
		}
		if (option == 'trackPointerTop') {
			trackPointer.css('top',options.trackPointerTop);
		}
		if (option == 'trackPointerLeft') {
			trackPointer.css('left',options.trackPointerLeft);
		}
		if (option == 'z_index') {
			container.css('z-index', options.z_index);
		}
		if (option == 'staticImage') {
			charImg.attr('src', options.staticImage);
		}
		
	};
	
	/**
	 *   Method centralizeCharInContainer
 	 *   Centralizes the char into the main container
	 */
	//==================================================================
	var centralizeCharInContainer = function() {
	//==================================================================
		var widthChar = parseInt(charImg.css('width'));
		var widthContainer = parseInt(container.css('width'));
		
		if (widthContainer == widthChar) {
			charImg.css('left',0);
		} else {
			var gap = widthContainer - widthChar;
			charImg.css('left',(gap/2));
		}
	}
	
	/**
	 *   Method to iconify the agent
	 */
	//==================================================================
	this.iconify = function(bool,x,y) {
	//==================================================================		
		
		if (bool == true && iconifyOptions.iconify == false) {
		
			iconifyOptions.iconify = true;
			iconifyOptions.posx = options.posx;
			iconifyOptions.posy = options.posy;		
			iconifyOptions.pictw = options.pictw;
			iconifyOptions.picth = options.picth;		
			iconifyOptions.containerWidth = options.containerWidth;

			this.setOption('containerWidth',150);
			this.setOption('pictw',150);
			this.setOption('picth',150);
			if (!x) {
				x = 10;
			}
			if (!y) {
				y = 10;
			}
			this.moveTo(x,y,1000);
			centralizeCharInContainer();
		
		} else if (bool == false  && iconifyOptions.iconify == true) {
			
			iconifyOptions.iconify = false;
			this.setOption('pictw',iconifyOptions.pictw);
			this.setOption('picth',iconifyOptions.picth);
			this.setOption('containerWidth',iconifyOptions.containerWidth);
			this.moveTo(iconifyOptions.posx,iconifyOptions.posy,1000);

			centralizeCharInContainer();
		}

	};
	 
	/**
	 *   Method to verify if the agent is iconified
	 */
	//==================================================================
	this.isIconify = function() {
	//==================================================================		
		return iconifyOptions.iconify;
	}
	
	/**
	 *   Method to iconify the agent
	 */
	//==================================================================
	this.toggleIconify = function(x,y) {
	//==================================================================		
		this.iconify(!iconifyOptions.iconify,x,y);
	}
	
	/**
	 *   Method toggle
 	 *   Toggle character
	 */
	//==================================================================
	this.toggle = function() {
	//==================================================================		
		return container.toggle();
	};
	
	/**
	 *   Method charHide
 	 *   Hide the char
	 */
	//==================================================================
	this.charHide = function() {
	//==================================================================		
		return container.css('display','none');
	};
	
	/**
	 *   Method charShow
 	 *   Show the char
	 */
	//==================================================================
	this.charShow = function() {
	//==================================================================		
		return container.css('display','');
	};
	
	/**
	 *   Method isVisible
 	 *   Return if the char is visible
	 */
	//==================================================================
	this.isVisible = function() {
	//==================================================================		
		return (container.css('display') == '' || container.css('display') == 'block');
	};	
	
	/**
	 *   Method isHidden
 	 *   Return if the char is hidden
	 */
	//==================================================================
	this.isHidden = function() {
	//==================================================================		
		return (container.css('display') == 'none');
	};	
	
	/**
	 *   Method toggleLoadBar
 	 *   Toggle the display of load bar
	 */
	//==================================================================
	this.toggleLoadBar = function() {
	//==================================================================		
		return loadBar.toggle();
	};
	
	/**
	 *   Method getPosition
 	 *   Return the position (top,left) of the char relative to the offset element
	 */
	//==================================================================
	this.getPosition = function() {
	//==================================================================		
		return { left: options.posx, top: options.posy };
	};
	
	/**
	 *   Method doSpeech
 	 *   Manages the speech of the agent
	 *
	 *   @param text
	 *   @param time
	 */
	var speakingTimeout = undefined;
	//==================================================================
	this.doSpeech = function(text,time) {
	//==================================================================			
		//if is iconify, dont show the text
		if (!this.isIconify()) {
			
			//set the bubble text
			speechBubbleContainer.children().html(text);
	
			speechBubbleContainer.children().css('font-size', options.speechBubbleFontSize);
			speechBubbleContainer.children().css('font-family', options.speechBubbleFontFamily);
			speechBubbleContainer.children().css('color', options.speechBubbleFontColor);
			
			// if the time is not specified, calculates the probability time to presentation the text (100 milliseconds for each letter)
			if (!time) {
				time = text.length * 100;		
			}
			
			if (speakingTimeout != undefined) {
				clearTimeout(speakingTimeout);
				bubbleReposition(false,time,this.movementFactory);
			}
						
			//reposition the bubble
			bubbleReposition(true,time,this.movementFactory);
			
		}
	};
        
        /** 
         * Method getBubblePosition
         * Public method used to determine the position of the bubble. Returns 'before' or 'after'.
         * */
        
        this.getBubblePosition = function() {
        
            //var bubbleHeight = parseInt(speechBubbleContainer.css('height'));
            var bubblePosition;
            
            if (speechBubbleContainer.data('bubblePosition') != undefined && speechBubbleContainer.data('bubblePosition') != '') {

                bubblePosition = speechBubbleContainer.data('bubblePosition');

            } else {

                    if (parseFloat(container.css('top'))-parseFloat(speechBubbleContainer.css('height')) > 0) {
                            bubblePosition = 'before';
                    } else {
                            bubblePosition = 'after';
                    }
                    
                    //if (setContainer != undefined && setContainer == true)
                        speechBubbleContainer.data('bubblePosition',bubblePosition);
                    
            }
            
            return bubblePosition;
        
        };
        
        this.getBubbleHeight = function() {
            
            var bubbleHeight = parseInt(speechBubbleContainer.css('height'));
            return bubbleHeight;
            
        };

	
	/**
	 *   Method bubbleReposition
	 *   Private method used to reposition the bubble according char position
	 */
	//==================================================================
	var bubbleReposition = function(show,time,mvFactory) 
	//==================================================================
	{
		var bubbleHeight = parseInt(speechBubbleContainer.css('height'));
                
                //For some unknown reason, it is not possible to call the method getbubblePosition.
                //Everytime is is called here, this method crashes!
                var bubblePosition; 
                
		if (speechBubbleContainer.data('bubblePosition') != undefined && speechBubbleContainer.data('bubblePosition') != '') {
		
			bubblePosition = speechBubbleContainer.data('bubblePosition');
		
		} else {
		
			if (parseFloat(container.css('top'))-parseFloat(speechBubbleContainer.css('height')) > 0) {
				bubblePosition = 'before';
			} else {
				bubblePosition = 'after';
			}
			speechBubbleContainer.data('bubblePosition',bubblePosition);
		}
		
		if (show) {
			
			speechBubbleContainer.css('display','block');
			
			container.css('height',parseInt(container.css('height'))+bubbleHeight);
			
			//adjust the container
			var widthBubble = parseInt(speechBubbleContainer.css('width'));
			var widthContainer = parseInt(container.css('width'));
			
			if (widthContainer < widthBubble) {
				//save the original configuration
				eval('var newOption = { containerWidthBubbleOriginal:'+options.containerWidth+', containerWidth:'+widthBubble+' };');
				$.extend(options, newOption);
				
				//TODO - change to use setOption function
				
				//adjust the container position
				var originalWidth = parseInt(container.css('width'));
				var gap = options.containerWidth - originalWidth;
				if (gap != 0) {
					container.css('left', (parseInt(container.css('left'))-gap/2));
				}
				container.css('width', options.containerWidth);
				centralizeCharInContainer();
				adjustLoadBarWidth();
				
			} else if (widthContainer > widthBubble) {
				//centralize the bubble
				speechBubbleContainer.css('left',((widthContainer-widthBubble)/2));
			}
			
			speakingTimeout = setTimeout(function() { bubbleReposition(false,time,mvFactory); },time);
			
		} else {
			
			speakingTimeout = undefined;
			
			speechBubbleContainer.css('display','none');
			speechBubbleContainer.css('left',0);
			speechBubbleContainer.data('bubblePosition','');
			bubbleHeight = parseInt(speechBubbleContainer.css('height'));
			container.css('height',parseInt(container.css('height'))-bubbleHeight);
			
			//adjust the container
			//restore the original width of the container
			if (options.containerWidthBubbleOriginal != undefined && options.containerWidthBubbleOriginal != '0') {
				eval('var newOption = { containerWidth:'+options.containerWidthBubbleOriginal+', containerWidthBubbleOriginal:0 };');
				$.extend(options, newOption);
				
				//TODO - change to use setOption function
				
				//adjust the container position
				var originalWidth = parseInt(container.css('width'));
				var gap = options.containerWidth - originalWidth;
				if (gap != 0) {
					container.css('left', (parseInt(container.css('left'))-gap/2));
				}
				container.css('width', options.containerWidth);
				centralizeCharInContainer();
				adjustLoadBarWidth();
			}
		} 
		
		if (bubblePosition == 'before') {
		
			//puts the bubble over the char
			speechBubbleContainer.insertBefore(charImgContainer);
			speechBubbleContainer.children().removeClass("bottom");

			if (show) {
				//repositions the container
				container.css('top',parseInt(container.css('top'))-bubbleHeight);
				//repositions the bar load 
				loadBar.css('top',parseInt(loadBar.css('top'))+bubbleHeight/2);
			} else {
				//repositions the container
				container.css('top',parseInt(container.css('top'))+bubbleHeight);
				//repositions the bar load
				loadBar.css('top','50%');
			}
				
		} else if (bubblePosition == 'after') { 
		
			//puts the bubble below the char
			speechBubbleContainer.insertAfter(charImgContainer);
			speechBubbleContainer.children().addClass("bottom");
			
			if (show) {
				//repositions the bar load
				loadBar.css('top',parseInt(loadBar.css('top'))-bubbleHeight/2);
				//repositions the controls container
				controls.css('bottom', 10+bubbleHeight);
			} else {
				//repositions the bar load
				loadBar.css('top','50%');
				//repositions the controls container
				controls.css('bottom', '10px');
			}
		}
		
	};
	
	/**
	 *   Method createLoadBar
	 *   Private method to generate the load bar
	 *  
	 *   @param action
	 *   @param imgsNumber
	 *   @param frame
	 */
	//==================================================================
	var createLoadBar = function() 
	//==================================================================
	{
		var loadBar = $('<div />');
		loadBar.css('border', options.loadBarFramed+'px solid '+options.loadBarFrameColor);
		//calculate the width and height of the load bar relative the container
		var widthBar = (options.containerWidth > 200 ? 200 : options.containerWidth * 0.8);
		var heightBar = (options.picth > 40 ? 40 : options.picth * 0.8);
		loadBar.css('width', widthBar);
		loadBar.css('height', '40px');
		loadBar.css('position', 'absolute');
		loadBar.css('left', '50%');
		loadBar.css('top', '50%');
		loadBar.css('margin-left', widthBar/2*-1);  
		loadBar.css('margin-top', heightBar/2*-1); 
		loadBar.css('background-color', options.loadBarBackgroundColor);
		loadBar.css('display','none');
		
		var loadDiv = $('<div />');
		loadDiv.css('position', 'absolute');
		loadDiv.css('left', '50%');
		loadDiv.css('top', '50%');
		loadDiv.css('margin-left', '-30px');  
		loadDiv.css('margin-top', '-10px'); 
		loadDiv.css('align','center');
		
		loadDiv.html('Loading...');
				
		loadDiv.appendTo(loadBar);
		
		return loadBar;
	};
	
	/**
 	*   Method adjustLoadBarWidth
	*
	*   Private method for adjust Load Bar Width
	*/
	//=================================================================
	var adjustLoadBarWidth = function() {
	//=================================================================
		var widthBar = (options.containerWidth > 200 ? 200 : options.containerWidth * 0.8);
		loadBar.css('width', widthBar);
		loadBar.css('left', '50%');
		loadBar.css('top', '50%');
		loadBar.css('margin-left', widthBar/2*-1);  
	}
	
	/**
 	*   Method createDebugWindow
	*
	*   Private method for generate the debbuger
	*/
	//=================================================================
	var createDebugWindow = function()
	//==================================================================
	{
		
		//TODO - colocar em uma classe diferente
		
		//creates the main container
		var debug = $('<div />');
		debug.attr('id','debugCharacterContainer');
		debug.css('position', 'absolute');
		debug.css('top', '0');
		debug.css('width', '99%');
		debug.css('background-color', '#eeeeee');
		debug.css('padding', '5px');		
		debug.css('border', '1px solid #bbbbbb');
	
		//creates the fieldset to select the character
		var fieldsetCharacter = $('<fieldset />');
		fieldsetCharacter.css('height','40px');
		fieldsetCharacter.css('float','left');
		fieldsetCharacter.css('border','1px solid #bbbbbb');
	
		var fieldsetCharacterLegend = $('<legend />');
		fieldsetCharacterLegend.css('font-size','10px');
		fieldsetCharacterLegend.css('color','#888888');
		fieldsetCharacterLegend.html('Character');
	
		var fieldsetCharacterSelect = $('<select />');
		fieldsetCharacterSelect.attr('id','debugCharacterSelect');
	
		fieldsetCharacterLegend.appendTo(fieldsetCharacter);
		fieldsetCharacterSelect.appendTo(fieldsetCharacter);
		fieldsetCharacter.appendTo(debug);
	
		//creates the fieldset to execute a action
		var fieldsetAction = fieldsetCharacter.clone();
		fieldsetAction.html('');
	
		var fieldsetActionLegend = fieldsetCharacterLegend.clone();
		fieldsetActionLegend.html('Movements');
	
		var fieldsetActionInput = $('<input />');
		fieldsetActionInput.attr('type','text');
		fieldsetActionInput.attr('id','debugCharacterActionText');
		fieldsetActionInput.attr('value','hello');
		fieldsetActionInput.css('width','100px');
	
		var fieldsetActionButton = $('<input />');
		fieldsetActionButton.attr('type','button');
		fieldsetActionButton.attr('id','debugCharacterActionButton');
		fieldsetActionButton.attr('value','EXECUTE');
		fieldsetActionButton.click(function() {
			//execute the action when the button EXECUTE is clicked
			divaLiteDebugger.data( $('#debugCharacterSelect').val() ).movementFactory.doMovement( $('#debugCharacterActionText').val() );
			
		});
		fieldsetActionLegend.appendTo(fieldsetAction);
		fieldsetActionInput.appendTo(fieldsetAction);
		fieldsetActionButton.appendTo(fieldsetAction);
		fieldsetAction.appendTo(debug);
	
		//creates the fieldset to execute a speech
		var fieldsetSpeech = fieldsetCharacter.clone();
		fieldsetSpeech.html('');
	
		var fieldsetSpeechLegend = fieldsetCharacterLegend.clone();
		fieldsetSpeechLegend.html('Speech');
	
		var fieldsetSpeechInput = $('<input />');
		fieldsetSpeechInput.attr('type','text');
		fieldsetSpeechInput.attr('id','debugCharacterSpeechText');
		fieldsetSpeechInput.attr('value','type the text here');
		fieldsetSpeechInput.css('width','200px');
	
		var fieldsetSpeechButton = $('<input />');
		fieldsetSpeechButton.attr('type','button');
		fieldsetSpeechButton.attr('id','debugCharacterSpeechButton');
		fieldsetSpeechButton.attr('value','SPEECH');
		fieldsetSpeechButton.click(function() {
			//execute the speech when the button SPEECH is clicked
			divaLiteDebugger.data( $('#debugCharacterSelect').val() ).doSpeech( $('#debugCharacterSpeechText').val() );
		});
	
		fieldsetSpeechLegend.appendTo(fieldsetSpeech);
		fieldsetSpeechInput.appendTo(fieldsetSpeech);
		fieldsetSpeechButton.appendTo(fieldsetSpeech);

		fieldsetSpeech.appendTo(debug);

		//creates the fieldset console
		var fieldsetConsole = fieldsetCharacter.clone();
		fieldsetConsole.css('width','350px');
		fieldsetConsole.html('');
	
		var divConsole = $('<div />');
		divConsole.css('height','35px');
		divConsole.css('width','400px');
		divConsole.css('background-color','#eeeeee');
		divConsole.css('font-size','10px');
		divConsole.css('overflow','auto');
		divConsole.css('overflow-X','hidden'); 
		divConsole.css('overflow-Y','auto');
		
		divConsole.mouseover(function() {divConsole.animate({ height: 250 }, 1000);});
		divConsole.mouseout(function() {divConsole.animate({ height: 35 }, 1000);});
		
		
		var fieldsetConsoleLegend = fieldsetCharacterLegend.clone();
		fieldsetConsoleLegend.html('Console');
	
		fieldsetConsoleLegend.appendTo(fieldsetConsole);
		divConsole.appendTo(fieldsetConsole);
		fieldsetConsole.appendTo(debug);

		debug.log = function(text) {
			var d = new Date();
			
			divConsole.html('['+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'] '+text+'<br>'+divConsole.html());
		};
		
		divaLiteDebugger = debug;
		
		return debug;
	};
	
	/**
 	*   Method generateUID()
	*
	*   Private method for generate unique identifier for the chars
	*/
	//=================================================================
	var generateUID = function()
	//==================================================================
	{
		var date = new Date();
		var v = 'divalite_' + (Math.ceil((date.getTime() * (Math.random() * 2)) / 10));
		
		return v;
	};
};


