const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(
  'mongodb://admin:reacteur123@ds155823.mlab.com:55823/todo-reacteur-db',
  { useNewUrlParser: true },
  function(err) {
    if (err) throw err;
  }
);

const TodoModel = mongoose.model('Todo', {
  title: String,
  description: String
});

// const newTodo = new TodoModel({
//     title: 'chercher pain',
//     description: 'a la boulangerie'
// });

// firstTodo.save();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// app.post('/', function(req, res) {
//   res.send('Sofiane le Magnifique');
// });

app.get('/getTodos', function(req, res) {
  TodoModel.find(function(err, todos) {
    if (err) return console.error(err);

    res.send(todos);
  });
});

app.post('/createTodo', function(req, res) {
  //Capter les données passés dans le body
  const title = req.body.title;
  const description = req.body.description;

  //Créer un todo
  const newTodo = new TodoModel({
    title,
    description
  });

  newTodo.save();

  res.send('OK');
});

app.delete('/deleteTodo', function(req, res) {
  res.send('delete todo');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
