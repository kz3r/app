'use strict';

	angular.module('sbAdminApp')
		.controller('NavController', NavController);

	NavController.$inject = ['$location', '$scope', 'Login'];

	function NavController($location, $scope, Login) {
		var vm = this;

		vm.callLogout = callLogout;

		function callLogout() {
			Login.logout();
	  }
}
