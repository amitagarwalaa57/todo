var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//connect to db
mongoose.connect('',{ useUnifiedTopology: true, useNewUrlParser: true });


//create schema
var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo', todoSchema);  

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

    app.get('/todo', function(req, res){
        // get data from the mongodb and pass it to the view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos:data});
        });
        
    });

    app.post('/todo', urlencodedParser, function(req, res){
        //console.log(req.body);
        //get data from view add it to mondodb
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });

    });

    app.delete('/todo/:item', function(req, res){
        // delete requested data from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
}
