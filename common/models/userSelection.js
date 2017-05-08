var bluebird = require('bluebird');	
var app = require('../../server/server');

module.exports = function(UserSelection) {
	UserSelection.upsertAnswer = function (data,cb) {
		
		/*UserSelection.upsertWithWhere({"where":{"participantId":data.participantId, "questionId":data.questionId}}, 
									  data,
									  function (err,participants) {
										if(err){
											console.log('Error in UserSelection.upsert()'+err);
											cb(null,err);
										}
										else{
											cb(null,data);
										}
									}); */
		/* UserSelection.destroyAll({"where":{"participantId":data.participantId, "questionId":data.questionId}}, 
									  data,
									  function (err,participants) {
										if(err){
											console.log('Error in UserSelection.delete()'+err);
											cb(null,err);
										}
										else{
											//cb(null,data);
											UserSelection.create(data, function (err,participants) {
										if(err){
											console.log('Error in UserSelection.upsert()'+err);
											cb(null,err);
										}
										else{
											cb(null,data);
										}
									});
										}
									}); */
		
		
		getUserSelectionsByParticipantAndQuestion(data).
			then((result)=>{
			 
			    // add the Id if same participantId and questionId exists
				if(result && result.length>0){
					data.id = result[0].id;
				}
				
				//add timestamp and upsert
				data.lastModified = new Date();
				upsertUserSelection(data);
				
		    }).
		   then(()=>{
			  cb(null,data);
		   }).
		   catch((error)=>{
			  cb(null,error);
		   });
	}
};


//private functions
 function getUserSelectionsByParticipantAndQuestion (data){
	 return new Promise(function (resolve, reject) {	
		app.models.UserSelection.find({"where":{"participantId":data.participantId, "questionId":data.questionId}},
						  	function(err,record){
								if(err){
									console.log('Error in UserSelection.find()'+err);
									reject(err);
								}
								else {
									resolve(record);
								}
							}
						  );
	});
}


function upsertUserSelection (userSelection){
	  return new Promise(function (resolve, reject) {	
		app.models.UserSelection.upsert(userSelection,
						  	function(err,record){
								if(err){
									console.log('Error in UserSelection.upsertUserSelection()'+err);
									reject(err);
								}
								else {
									resolve(record);
								}
							}
						  );
	});
}
