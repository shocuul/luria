angular.module('starter.controllers', [])

.controller('DisorderCtrl', function($scope, Disorder, $timeout, $ionicModal,$ionicListDelegate,$ionicScrollDelegate) {

	$scope.listCanSwipe = true;
	$scope.disorders = Disorder.all();
	$scope.loaded = Disorder.state();
	$ionicModal.fromTemplateUrl('templates/new-disorder.html',{
		scope : $scope
	}).then(function(modal){
		$scope.modal = modal;
	});

	$timeout(function(){
		$scope.loaded = Disorder.state();
	},1000);

	$scope.createDisorder = function(data){
		Disorder.create(data);
		data.name = "";
		$scope.modal.hide();
	}
	$scope.hideSearch = function(){
		$ionicScrollDelegate.scrollTo(0,44,true);
	}
 	$scope.deleteDisorder = function(disorderId){
		Disorder.delete(disorderId);
		$ionicListDelegate.closeOptionButtons();
	}




  $scope.clearSearch = function() {
    $scope.searchQuery = '';
  };

})

.controller('DisorderDetailCtrl', function($scope,$stateParams,Disorder,Criteria,$ionicModal){
	$scope.disorder = Disorder.get($stateParams.disorderId);
	$scope.criterion = Criteria.all();
	$scope.loaded = Disorder.state();
	$ionicModal.fromTemplateUrl('templates/list-criteria.html',{
		scope : $scope
	}).then(function(modal){
		$scope.modal = modal;
	});
	$scope.createRelation = function(criteriaId){
		Disorder.createRelation($stateParams.disorderId,criteriaId);
		$scope.modal.hide()
	}
})

.controller('CriteriaCtrl', function($scope,Criteria,$ionicModal) {
  $scope.criterion = Criteria.all();
	$scope.listCanSwipe = true
  $ionicModal.fromTemplateUrl('templates/new-criteria.html',{
		scope : $scope
	}).then(function(modal){
		$scope.modal = modal;
	});

	$scope.deleteCriteria = function(criteriaId){
		Criteria.delete(criteriaId);
		$ionicListDelegate.closeOptionButtons();
	}

	$scope.createCriteria = function(data){
		Criteria.create(data);
		data.description = '';
		$scope.modal.hide();
	}
	$scope.getItemHeight = function(item) {
	return angular.element(item).offsetHeight;
	};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
