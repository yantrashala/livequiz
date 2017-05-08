var bluebird = require('bluebird');
var app = require('../server/server');

var currentQuestionDetails = {"questionId":"", "correctAnswer":"", "questionPostedTime": "", "questionDuration":0};	
// Delay for each state in milli seconds.
 var waitStateDelay=20000;	
 var welcomeStateDelay=20000;
 var resultStateDelay=10000;
 var thankYouStateDelay=10000;

exports.start = function () {
  console.log('In director.Start()...');
	
  
	
  setWaitState()
        .then(() => setWelcomeState())
        .then(() => setQuestionAnswerState())
		.then(() => setResultState())
		.then(() => setThankYouState());
}

// Private functions.
function createStage(stage) {
  var Stage = app.models.Stage;
    Stage.upsert(stage, function (err, cb) {
       // Stage.create({"type":stage.type}, function (err, cb) {
    if (err) {
      console.log('error creating stage' + err);
    } else if(stage.type == "question"){
		   // store question details
		   currentQuestionDetails.questionId = stage.questionId;
		   currentQuestionDetails.correctAnswer = "";
		   currentQuestionDetails.questionPostedTime = new Date();
       currentQuestionDetails.questionDuration = stage.questionDuration;
	   }
  });
}

function setWaitState() {
  return new Promise(function (resolve, reject) {
	  createStage({
        "id": 1,
        "type": "wait"
      });
    setTimeout(function () {
      console.log("wait state");
      resolve();
    }, waitStateDelay)
  });
}

function setWelcomeState() {
  return new Promise(function (resolve, reject) {
         createStage({
        "id": 1,
        "type": "welcome"
      });

	  setTimeout(function () {
      console.log("welcome state");
      resolve();
    }, welcomeStateDelay)
  });
}

function setResultState() {
  return new Promise(function (resolve, reject) {
      createStage({
        "id": 1,
        "type": "result"
      });

	  setTimeout(function () {
      console.log("result state");
      resolve();
    }, resultStateDelay)
  });
}

function setThankYouState() {
  return new Promise(function (resolve, reject) {
      createStage({
        "id": 1,
        "type": "thankYou",
		"questionId": 0,
		"questionDuration": 0,
		"questionImage": "",
		"answerImage": "0",
		"correctAnswer": "",
      });

	  setTimeout(function () {
      console.log("thankYou state");
      resolve();
    }, thankYouStateDelay)
  });
}

function setQuestionAnswerState(){
 return new Promise(function (resolve, reject) {
    var Question=app.models.Question;
    Question.find({},(err,questions)=>{
        if(err){
            console.log('error in setQuestionAnswerState' + err);
        }
        else{
            runQuestionAnswer(questions).then(()=>resolve());
        }
    });
 });
}

function  runQuestionAnswer(questions){
 return new Promise(function (resolve, reject) {
   var promises = [];

   questions.forEach((question)=> {
        promises.push(setQuestion(question));
        promises.push(setAnswer(question));
    });

//promises.reduce((prev, cur) => prev.then(() =>cur), bluebird.resolve() );
 
//   var p = promises[0];
//    for (var i = 1; i < promises.length; i++){
//        p = p.then( ()=> {promises[i]; });
//        
//    }

//    bluebird.all(promises).then( ()=> {
//         console.log("QA complete");
//     });   
	
//	
//	  bluebird.map(promises, function (promiseFn) {
//    return promiseFn(); //make sure that here You return Promise
//}, {concurrency: 1}); //it will run promises sequentially 

	
	 
						 
	bluebird.resolve(promises)
		   .mapSeries(function(asyncMethodPassed) {
		return asyncMethodPassed();
	}).then(function(results) {
		console.log('Question-Answer over');
		resolve();
    });
});
}


function setQuestion(question) {
 return function(value) {
   return new Promise(function (resolve, reject) {
    createStage({
        "id": 1,
        "type": "question",
        "questionId": question.id,
        "questionImage": question.questionImage,
	    	"correctAnswer": "",
        "questionDuration": question.questionDuration
      });
	      
console.log('Question updated ' + question.id);

		setTimeout(function(){
			console.log('Question over ' + question.id);
			resolve();
		},question.questionDuration);

  });
}}


function setAnswer(question) {
	return function(value) {
   // TODO : change Question model and add 'time'... Remove below hardcoded value
    return new Promise(function (resolve, reject) {
      createStage({
        "id": 1,
        "type": "answer",
        "answerImage": question.answerImage,
        "correctAnswer": question.correctAnswer
      });
	  console.log(question.id + " answer updated");
		
		
		currentQuestionDetails.correctAnswer = question.correctAnswer;
		calculateAndUpdateScore();

		setTimeout(function () {
		  console.log(question.id + " answer over");
		  resolve();
		}, 15000);
  });
}}

function calculateAndUpdateScore() {
	app.models.Participant.updateScore(currentQuestionDetails,function(err,data){
		if(err){
			console.log('Error in calculateAndUpdateScore()' + err); 
		}
	});
}