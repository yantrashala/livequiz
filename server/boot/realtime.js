var es = require('event-stream');
module.exports = function(app) {
  var Question = app.models.Question;
  Question.createChangeStream(function(err, changes) {
    changes.pipe(es.stringify()).pipe(process.stdout);
  });

 
}