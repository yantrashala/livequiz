var bluebird = require('bluebird');
var app = require('../../server/server');

module.exports = function (Participant) {

  Participant.updateScore = function (data, cb) {
    app.models.UserSelection.find({
      where: {
        "questionId": data.questionId
      }
    }, function (err, userSelections) {

      userSelections.forEach(function (userSelection) {
        if (userSelection.answer != data.correctAnswer) {
          //console.log('Incorrect answer!!!  ', userSelection.answer, '(' , data.correctAnswer,')');
          return; // dont continue with iteration
        }

        // calculate the score based on milli-seconds left to answer
        var score =  new Date( data.questionPostedTime.getTime() + data.questionDuration ) - userSelection.lastModified;
        console.log('SCORe', score);

         if (score <= 0 || score > data.questionDuration ) {
          return; // dont continue with iteration
        }

        getParticipant(userSelection.participantId)
          .then((participant) => {
            score += participant.score;

            upsertParticipant({
              "id": userSelection.participantId,
              "name": participant.name,
              "score": score
            });
          })
          .then(() => {
            cb(null, true);
          })
          .catch((error) => {
            console.log('error in Participant.updateScore' + error);
            cb(null, error);
          });
      });
    });
  }
};

// private functions

function getParticipant(id) {
  return new Promise(function (resolve, reject) {
    app.models.Participant.findOne({
      "where": {
        "id": id
      }
    }, function (err, participant) {
      if (err) {
        console.log('In participant.getParticipant()' + err);
        reject(err);
      } else {
        resolve(participant);
      }
    });
  });
}


function upsertParticipant(data) {
  return new Promise(function (resolve, reject) {
    app.models.Participant.upsert(data,
      function (err, record) {
        if (err) {
          console.log('Error in participant.upsertParticipant()' + err);
          reject(err);
        } else {
          resolve(record);
        }
      });
  });
}
