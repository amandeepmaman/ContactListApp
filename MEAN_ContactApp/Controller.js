var contactListApp = angular.module('contactListApp', [])
.controller('appController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello world from controller");
//contact = person;
var refresh = function(){
    $scope.disableAdd = false;
    $scope.enableUpdate = true;
    $http.get('/contactList').success(function(response){
    	console.log("I got the data I requested.");
    	$scope.contactList = response;
    	$scope.person = '';
    });
 };
 refresh();
    $scope.addContact = function(){
	    $http.post('/contactList', $scope.person).success(function(response){
		    refresh();
	    })
    };

    $scope.remove = function(id){
    	$http.delete('/contactList/' + id).success(function(response){
    		refresh();
    	})
    };
    $scope.edit = function(id){
    	$http.get('/contactList/' + id)
        .success(function(response){
    		$scope.person = response;
    	})
        .finally(function(){
            $scope.disableAdd = true;
            $scope.enableUpdate = false;
        });
    };
    $scope.update = function(){
    	$http.put('/contactList/' + $scope.person._id, $scope.person).success(function(response){
    		refresh();
    	})
    };
    $scope.deselect = function(){
    	$scope.person = '';
    }
}]);