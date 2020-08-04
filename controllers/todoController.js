var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//connect to db
mongoose.connect('mongodb+srv://test:test@test.rj8mb.mongodb.net/<mydb>?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true });
/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@test.rj8mb.mongodb.net/<mydb>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("connected");
  //client.close();
});*/

//create schema
var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo', todoSchema);  
/*var itemOne = Todo({item : 'buy flowers'}).save(function(err){
    if(err) throw err;
    console.log('item saved');
});*/

//var data = [{item : 'get milk'}, {item : 'coding'}, {item : 'eating'}];

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