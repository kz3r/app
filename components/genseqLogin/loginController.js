'use strict';

	angular.module('sbAdminApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', '$scope', 'Login', 'Autenticacao'];


	function LoginController($location, $scope, Login, Autenticacao){
		var vm = this;

		vm.login = login;

		//activate();

		function activate() {
			if (Autenticacao.isAuthenticated()){
				$location.url('/');
			}
		}

		function login() {
			Login.login(vm.email, vm.password);
		}
	}
