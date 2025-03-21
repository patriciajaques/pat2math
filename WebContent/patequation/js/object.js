/**
 * @author Felipe de Morais
 * 
 * @description Constructor of a equation
 * 
 * @param {String} equation - equation with pat2math text notation
 * @param {int} points - the total of points of a equation
 *      
 * */
function Equation(equation, points) {
    this.equation = equation;  //the equation string in pat2math text notation 
    this.equationToString = replaceAll (equation, "*(", "(");
    this.points = points; //maximum points of this equation (come from the system)
    this.userPoints = 0; //points that the user get
    this.userPassNumber = 0; //number of pass concluded in this equation
    this.userErrorPoints = 0; // error points in each pass of the resolution
    this.nAnswers = 1; // number of answears that the user entry
    this.twoAnswers = false; // if this equation has two (true) or one (false) answears
    this.initialEquation = equation;// use just for bhaskara, contains the initial valid equation
    this.isComplete = false; // if the equation is complete
    this.isAnswer; //if the system are waiting for a response
    this.lastStep = null; //a object Step with the last valid step from user
    this.currentStep = ""; //the current step, this step is the one that the user is setting (no checked still) and in the natural format
    this.steps = new Array(); //array of Step (object Step)

    this.addPoints = addPoints;
    
   
    function addPoints(value) {
    	if (value === 10) {
            this.userPassNumber += 1;
           
        } else if (value < 0) {
            this.userErrorPoints -= value;
            calculatePoints(this);
        }
    	
    	if (this.userPoints >= this.points - 5) {  		
    		if (this.userPoints === this.points - 5) {
    	        this.userPoints += 5;
    	        calculatePoints(this);
    		}
    	}
    	
    	else {
            this.userPoints += value;
            calculatePoints(this);
    	}
    	
    	if (levelGamification !== undefined && levelGamification === "full" && isLoadEquation === false)
    		addOrRemoveScore(value);
    }

    this.isAnswer = isAnswer;
    function isAnswer() {
        if ((points / 10) === this.userPassNumber + 1) {
            return true;
        }
        return false;
    }
}

function Step(step, type) {
    this.step = step; //string that contains the step of resolution
    this.type = type; //type of the step (NORMAL_STEP, NORMAL_SOLUTION, DELTA_SOLUTION, x1_SOLUTION e x2_SOLUTION)
}

function TaskItem (taskSetID, taskID){
	this.taskSetID=taskSetID; //The id of the set of tasks
	this.taskID = taskID; // the id of the task
}

function Regra (nome, explicacao) {
	this.nome = nome;
	this.explicacao = explicacao;
}

//function EquationPlan (idFirstEquation, idNextPlan) {
//	this.idFirstEquation = idFirstEquation;
//	this.idNextPlan = idNextPlan;
//}

function Fraction (numerator, denominator) {
	this.numerator = numerator;
	this.denominator = denominator;
	this.toString = numerator + "/" + denominator;
}