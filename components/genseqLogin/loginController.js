'use strict';

	angular.module('sbAdminApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', '$scope', '$localStorage', 'Login', 'Autenticacao'];


	function LoginController($location, $scope, $localStorage, Login, Autenticacao){
		var vm = this;

		vm.login = login;

		activate();

		function activate() {
			if ( $localStorage.user != null) { console.log($localStorage.user); }
			if (Autenticacao.isAuthenticated()){
				$location.url('/');
			}

		}

		function login() {
			Login.login(vm.email, vm.password);
		}
	}
