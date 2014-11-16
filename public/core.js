var app1 = angular.module('app1', []);

function mainController($scope, $http) {
	$scope.formData = {};
	$scope.incomplete = true;

	// when landing on the page, get all todos and show them
	$http.get('/api/employees')
		.success(function(data) {
			$scope.employees = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createEmployee = function() {
		$http.post('/api/employees', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.employees = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteEmployee = function(id) {
		$http.delete('/api/employees/' + id)
			.success(function(data) {
				$scope.employees = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
}