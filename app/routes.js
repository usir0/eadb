var Employee = require('./models/emp');

module.exports = function(app) {

	// api ---------------------------------------------------------------------

	app.get('/api/employees', function(req, res) {

		// use mongoose to get all todos in the database
		Employee.find(function(err, employees) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(employees); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/employees', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Employee.create({
			name : req.body.name,
			position : req.body.position,
			assgn : req.body.assgn,
			accom: req.body.accom,
			available : req.body.available,
			done : false
		}, function(err, employee) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Employee.find(function(err, employees) {
				if (err)
					res.send(err)
				res.json(employees);
			});
		});

	});

	// delete a todo
	app.delete('/api/employees/:employee_id', function(req, res) {
		Employee.remove({
			_id : req.params.employee_id
		}, function(err, employee) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Employee.find(function(err, employees) {
				if (err)
					res.send(err)
				res.json(employees);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};