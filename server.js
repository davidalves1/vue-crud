// BASE SETUP
// =============================================================================

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Task = require('./server/models/Tasks');

const app = express();

mongoose.connect('mongodb://userdb:123+456@ds017256.mlab.com:17256/tasks-vue');

// Configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set a port
const port = process.env.PORT || 3333;

// ROUTES FOR OUR API
// =============================================================================
// get an instance of the express Router
const router = express.Router();              

router.use((req, res, next) => {
	// Resolve the cross-origin problem
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	console.log(`method: ${req.method} | url: ${req.url}`);

	next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Bem vindo a API de Tarefas!' });   
});

// Routes from the API
router.route('/tasks')
    // create a task
    .post(function(req, res) {
        
        let task = new Task();      // create a new instance of the task model
        task.date = req.body.date;  // set the tasks date (comes from the request)
        task.description = req.body.description;  // set the tasks descríption (comes from the request)

        // save the task and check for errors
        task.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Tarefa registrada' });
        });
        
    })
    // get all the tasks
    .get(function(req, res) {
        Task.find(function(err, tasks) {
            if (err)
                res.send(err);

            res.json(tasks);
        });
    });

router.route('/tasks/:task_id')
    // get one task
    .get(function(req, res){
        Task.findById(req.params.task_id, function(err, task) {
            if (err)
                res.send(err);

            res.json(task);
        });
    })
    // update a task
    .put(function(req, res) {
        console.log('update');
    })
    // delete a task
    .delete(function(req, res) {
        Task.remove({
            _id: req.params.task_id
        }, function(err, task) {
            if (err)
                res.send(err);

            res.json({deleted: true, status: 200})
        })
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`Magic happens on port on localhost:${port}/api`);