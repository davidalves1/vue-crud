// BASE SETUP
// =============================================================================

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tasks = require('./server/models/Tasks.js');

const app = express();

mongoose.connect('mongodb://userdb:123+456@ds017256.mlab.com:17256/tasks-vue');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set a port
const port = process.env.PORT || 3333;

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

router.use((req, res, next) => {
	console.log('Something else happening.');

	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

router.route('/tasks')

    // create a task (accessed at POST http://localhost:8080/api/tasks)
    .post(function(req, res) {
        
        let task = new Task();      // create a new instance of the task model
        task.name = req.body.name;  // set the tasks name (comes from the request)

        // save the task and check for errors
        task.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Task created!' });
        });
        
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`Magic happens on port on localhost:${port}/api`);