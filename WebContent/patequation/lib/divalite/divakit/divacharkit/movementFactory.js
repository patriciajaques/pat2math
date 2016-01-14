
//Main class
//==================================================================
DIVA_movement_factory = function(charcode) 
//==================================================================
{

	//reference of the DIVA_character class
	var divaCharacter = charcode;
	
	//stores loaded movements in a Map
	//		key -> action (movement name)
	//		value -> map with images
	//					key -> frame
	//					value -> img src
	//	
	//		Ex:
	//			loadMovements['hello'][0] //return the frame 0 of hello movement
	//
	var loadedMovements = new Object();
	
	//a stack with the movements that the character needs execute.
	//when this stack is empty, the char executes the corporal movements
	//This movements are representing by an Object with properties: action, text, callback, width
	var movementsStack = new Array();

	//Array with corporal movements.
	//Each movement is representing by an Object with three fields: action, priority, text, callback width
	//This movements are executed when the char don't have a movements to do (movementsStack is empty)
	var corporalMovements = new Array();

	//Array with corporal movements that will be preloaded (with a bar loading)
	var preLoadCorporalMovementsStack = new Array();
	
	//Array with movements that will be preloaded (with a bar loading)
	var preLoadMovementsStack = new Array();
	
	//Array with movements that will be preloaded (in background)
	var backgroundPreLoadMovementsStack = new Array();
	
	//if to enable track movement
	var enableTrack = false;
	
	/**
	 *   Method create
 	 *   Creates the agent
	 */
	//==================================================================
	this.create = function() 
	//==================================================================	
	{
		manageMovements();
	};
	
	/**
	 *   Method setEnableTrack
 	 *   Enable/Disable the track
	 */
	//==================================================================
	this.setEnableTrack = function(enable) {
	//==================================================================
		enableTrack = enable;
		if (!enable) {
			manageMovements();
		}
	}
	
	/**
	 *   Method getEnableTrack
 	 *   get the track enable configuration
	 */
	//==================================================================
	this.getEnableTrack = function() {
	//==================================================================
		return enableTrack;	
	}
	
	/**
	 *   Method manageMovements
 	 *   This method is responsible to manage the movements of the char
	 */
	//==================================================================
	var manageMovements = function() 
	//==================================================================	
	{
		//if have movements to execute in the stack, then executes they
		if (movementsStack.length > 0) {
			
			var nextAction = movementsStack.shift();
			doAnimation(nextAction);
		
		//if don't have movements in the stack, then executes the corporalMovements
		} else {
			
			//only execute corporal movement, if the enableTrack == false;
			if (!enableTrack) {
				executeCorporalMovement();
			}
		}
	};

	/**
	 *   Method addCorporalMovement
 	 *   Add a movement to list of corporal movements
 	 *   
 	 *   @param action - movement name
 	 *   @param priority - priority of this movement relative with others corporal movements (value between 0 and 100)
	 */
	//==================================================================
	this.addCorporalMovement = function(action,priority,text) 
	//==================================================================	
	{
		//iterates through the collection to see if it contains the action
		var updated = false;
		for (i=0;i<corporalMovements.length;i++) {
			//if found the action, update the priority
			if (corporalMovements[i].action == action) {
				corporalMovements[i].priority = priority;
				updated = true;
				if (divaLiteDebugger) {
					divaLiteDebugger.log('Updated corporal movement to '+ divaCharacter.getOptions().name+'. ['+action+','+priority+']');
				}
			}
		}
		//if not found the action, add the action
		if (!updated) {
			
			//verifies that this movement is load
			if (!loadedMovements[action]) {
				//if  not is loaded, then loading...
				this.preLoadMovement(action,false, function() { //callback function
																eval('var cMov = { action: \''+action+'\', priority: '+priority+' }');
																corporalMovements[corporalMovements.length] = cMov;
																if (divaLiteDebugger) {
																	divaLiteDebugger.log('Added corporal movement to '+ divaCharacter.getOptions().name+'. ['+action+','+priority+']');
																}
									  					     }
			                         );
			} else {
				eval('var cMov = { action: \''+action+'\', priority: '+priority+' }');
				corporalMovements[corporalMovements.length] = cMov;
				if (divaLiteDebugger) {
					divaLiteDebugger.log('Added corporal movement to '+ divaCharacter.getOptions().name+'. ['+action+','+priority+']');
				}
			}
		}
	};
	
	/**
	 *   Method removeCorporalMovement
 	 *   Removes a movement of list of corporal movements
 	 *   
 	 *   @param action - movement name
	 */
	//==================================================================
	this.removeCorporalMovement = function(action) 
	//==================================================================	
	{
		//iterates through the collection to see if it contains the action
		var corporalMovementsAux = new Array();
		while (corporalMovements.length > 0) {
			var cMov = corporalMovements.pop();
			if (cMov.action == action) {
				if (divaLiteDebugger) {
					divaLiteDebugger.log('Removed corporal movement of '+ divaCharacter.getOptions().name+'. ['+action+']');
				}
			} else {
				corporalMovementsAux[corporalMovementsAux.length] = cMov;
			}
		}
		corporalMovements = corporalMovementsAux;
	};
	

	/**
	 *   Method executeCorporalMovement
 	 *   Manages the corporal movement of the agent
	 *
	 */
	//==================================================================
	var executeCorporalMovement = function() 
	//==================================================================
	{
		if (corporalMovements.length > 0) {
			//calcule the priority
			var totalPriority = 0;
			for (i=0;i<corporalMovements.length;i++) {
				totalPriority += corporalMovements[i].priority;
			}
			//picks a number in the range of priority
			var picked = Math.random() * (totalPriority);
			//divaLiteDebugger.log(picked);
			//verifies who is the action in this priority
			totalPriority = 0;
			var corporalAction = corporalMovements[0];
			for (i=0;i<corporalMovements.length;i++) {
				var begin = totalPriority;
				var end = totalPriority + corporalMovements[i].priority;
				if (picked >= begin && picked <= end) {
					corporalAction = corporalMovements[i];
					break;
				}
				totalPriority += corporalMovements[i].priority;
			}			
			
			doAnimation(corporalAction);

		} else {
			
			setTimeout(function() { manageMovements(); }, 1000); 
		}		
	};
	
	/**
	 *   Method doMovement
 	 *   Manages the movement of the agent
	 *
	 *   @param action - movement name
	 *   
	 *   { action: '', text: '', callback: function() {} }
	 */
	//==================================================================
	this.doMovement = function(movement) 
	//==================================================================
	{
		var movements = new Array();
		
		if ($.isArray(movement)) {
			movements = movement;
		} else if (typeof(movement) == 'object') {
			movements.push(movement);
		} else {
			var newObject = { action: movement };
			movements.push(newObject);
		}
		
		//verifies all movies is loaded
		if (movements.length > 1) {
			loadMovements(movements,false);
			
		} else {
		
			for (i=0;i<movements.length;i++) {
			
				//verifies that this movement is load
				if (!loadedMovements[movements[i].action]) {
					var movementNow = movements[i];
					loadMovement(movementNow.action,false,function() {movementsStack.push(movementNow);}); 
					
				} else {
					movementsStack.push(movements[i]);
				}
			}
		}
		
	};
	
	var adjustWidth = function(adjust,propOriginal,movementWidth) {
		
		if (adjust == true) {
			//save the original configuration
			divaCharacter.setOption(propOriginal,divaCharacter.getOptions().containerWidth);
			//change width of the container
			divaCharacter.setOption('containerWidth',movementWidth);
		} else {
			//restore the original width of the container
			divaCharacter.setOption('containerWidth',eval('divaCharacter.getOptions().'+propOriginal));
			divaCharacter.setOption(propOriginal,'0');
		}
		
	}
	
	/**
	 *   Method getFrame
	 *   Return a image of the frame
	 *  
	 *   @param movement - movement name
	 *   @param frame -
	 */
	//==================================================================
	this.getFrame = function(movement,frame) 
	//==================================================================
	{
		//verifies that this movement is load
		if (!loadedMovements[movement]) {
			loadMovement(movement,false); 
			return false;
		} else {
			return loadedMovements[movement][frame];	
		}
		
	}
	
	/**
	 *   Method doAnimation
	 *   Private method used to make the animation movement
	 *  
	 *   @param movement - movement name
	 *   @param imgsNumber -
	 *   @param frame -
	 */
	//==================================================================
	var doAnimation = function(movement,frame) 
	//==================================================================
	{
		frame = (frame ? frame : 0);
		
		divaCharacter.setCharImg(loadedMovements[movement.action][frame]);
		
		frame++;
		
		if (loadedMovements[movement.action][frame] != undefined) {
		
			setTimeout(function() { doAnimation(movement,frame); }, ((100-divaCharacter.getOptions().movieSpeed)*10)); 

			//if in the first frame
			if (frame == 1) {
                            
                                //if necessary, change de position
                                if (movement.x && movement.y && movement.speed) {
                                    
                                    var offsetBubble = 0;
                                    
                                    if (movement.ignoreDialog) {
                                        
                                        var posBubble = divaCharacter.getBubblePosition();
                                        var sizBubble = divaCharacter.getBubbleHeight();
                                        var gapBubble = 0;
                                        
                                        if (posBubble != undefined && posBubble == 'before') {
                                            offsetBubble = sizBubble + gapBubble;
                                        }

                                    }
                                  
                                    divaCharacter.moveTo(movement.x,movement.y - offsetBubble,movement.speed);
                                    
                                }                            
				
				//adjust the width, only if not iconified
				if (movement.width && !divaCharacter.isIconify()) {
					//save the original configuration
					if (parseInt(divaCharacter.getOptions().containerWidth) != movement.width) {
						adjustWidth(true,'containerWidthOriginal',movement.width);
					}
				}
				//execute the speech
				if(movement.text) {
					divaCharacter.doSpeech(movement.text);
				}
			}
			
		} else {
		
			//return char to original position
			divaCharacter.setDefaultCharImage();
			
			if ($.isFunction(movement.callback)) {
				movement.callback();
			}
			
			//restore the original width of the container
			if (movement.width && !divaCharacter.isIconify()) {

				if (parseInt(divaCharacter.getOptions().containerWidthOriginal) > 0) {
					adjustWidth(false,'containerWidthOriginal');
				}
			}
			
			manageMovements();
		}
	};
	
	/**
	 * Add a movement to preLoadMovementsStack
	 */
	//==================================================================
	this.addPreLoadMovements = function(movement) 
	//==================================================================
	{
		if (movement.background) {
			backgroundPreLoadMovementsStack.push(movement);
		} else {
			preLoadMovementsStack.push(movement);
		}
	}
	/**
	 * Add a movement to preLoadCorporalMovementsStack
	 */
	//==================================================================
	this.addPreLoadCorporalMovements = function(movement) 
	//==================================================================
	{
		preLoadCorporalMovementsStack.push(movement);
	}
	
	/**
	 *   Method preLoadMovements
 	 *   Pre-Load the list of movements
	 */
	//==================================================================						
	this.preLoadMovements = function()
	//==================================================================						
	{
		managerPreLoaderMovement();
	}
	/**
	 *	Manage the preloader 
	 */
	//==================================================================						
	var managerPreLoaderMovement = function() 
	//==================================================================
	{
		//first, load the corporal movements
		if (preLoadCorporalMovementsStack.length > 0) {
			var movement = preLoadCorporalMovementsStack.pop();
			loadMovement(movement.action,false,function() { 
															//eval('var cMov = { action: \''+movement.action+'\', priority: '+movement.priority+' }');
															corporalMovements[corporalMovements.length] = movement;
															if (divaLiteDebugger) {
																divaLiteDebugger.log('Added corporal movement to '+ divaCharacter.getOptions().name+'. ['+movement.action+','+movement.priority+']');
															}
															managerPreLoaderMovement(); 
														}
						);
			
		//after loading the corporal movements, load the movements with a bar loading
		} else if (preLoadMovementsStack.length > 0) {
			
			var movement = preLoadMovementsStack.pop();
			loadMovement(movement.action,false,function() { 
															managerPreLoaderMovement(); 
														  }
						);
			
		//in the last, load the movements in background	
		} else if (backgroundPreLoadMovementsStack.length > 0) {
			
			var movement = backgroundPreLoadMovementsStack.pop();
			loadMovement(movement.action,true,function() { 
															managerPreLoaderMovement(); 
														  }
						);
		}	
		
	};
	
	/**
	 *   Method loadMovement
 	 *   Pre-Load the frames of the movement
	 *
	 *	 @param action - movement that will be loaded
	 *   @param background - (boolean) if the movement should be loading in background
	 *   @param callback - function that will be executed after finish the loading
	 */
	//==================================================================
	this.preLoadMovement = function(action,background,callback) 
	//==================================================================
	{
		//verifies that this movement is load
		if (!loadedMovements[action]) {
			
			loadMovement(action,background,callback,0);
			
		} 		
	};
	
	/**
	 *   Method loadMovement
 	 *   Pre-Load a list of movements
	 *
	 *   @param action - movements that will be loaded
	 *   @param background - (boolean) if the movement should be loading in background
	 */
	//==================================================================
	var loadMovements = function(movements,background) 
	//==================================================================
	{		
		//verifies all movies is loaded
		for (i=0;i<movements.length;i++) {
			if (!loadedMovements[movements[i].action]) {
				var movementNow = movements[i];
				loadMovement(movementNow.action,false,function() {loadMovements(movements,background);});
				return null;
			}
		}
		
		for (i=0;i<movements.length;i++) {
			
			movementsStack.push(movements[i]);
		}
	}
		
	/**
	 *   Method loadMovement
 	 *   Pre-Load the frames of the movement
	 *
	 *   @param action - movement that will be loaded
	 *   @param background - (boolean) if the movement should be loading in background
	 *   @param execute - (boolean) if the movement should be executed after finish the loading
	 *   @param actualFrame - the frame will be loaded
	 */
	//==================================================================
	var loadMovement = function(action,background,callback,actualFrame) 
	//==================================================================
	{	
		if (!actualFrame) {
			actualFrame = '0';
			//initiates the object map to store the frames
			loadedMovements[action] = new Object();
			
			if (!background) {
				divaCharacter.toggleLoadBar();
			}
		}
		
		var imgSrc = divaCharacter.getOptions().pictspath+divaCharacter.getOptions().charname+'/'+divaCharacter.getOptions().resolution+'/'+action+'/'+action+completeFrameNumber(actualFrame)+'.png';			

		//pre-load the image frame
		$('<img />')
		 //when an error occurs, it is finished loading, because the next frame does not exist
		.error(function() {
	    	if (!background) {
				divaCharacter.toggleLoadBar();
			}
	    	if($.isFunction(callback)) {
	    		callback();
	    	}
	    })
	    .attr('src', imgSrc)
	    .load(function(){

	    	if (divaLiteDebugger) {
	    		divaLiteDebugger.log('Image loaded: ' + action + " frame: " + actualFrame);
	    	}
	    	
	    	//when pre-load finish, store the reference of img
	    	loadedMovements[action][actualFrame] = this.src;
	    	//load the next frame
	    	actualFrame++;
	    	loadMovement(action,background,callback,actualFrame);
	    });	    
	};
	
	/**
	 *   Method completeFrameNumber
 	 *   Complete the number that represent the frame
 	 *   
 	 *   Ex: transform: 01 to 0001
	 *
	 *   @param frameNumber
	 */
	//==================================================================
	var completeFrameNumber = function(frameNumber) 
	//==================================================================
	{
		var digitsNumber = 4;
		for (i=frameNumber.toString().length;i<digitsNumber;i++) {
			frameNumber = "0"+frameNumber;
		}
		return frameNumber;
	};
};




