'use strict';

	angular.module('sbAdminApp')
		.controller('NavController', NavController);

	NavController.$inject = ['$location', '$scope', 'Login', 'Autenticacao'];

	function NavController($location, $scope, Login, Autenticacao) {
		var vm = this;

		vm.callLogout = callLogout;
		vm.usuarioAtual = "";

		activate();

		function activate(){

			var usuario = Autenticacao.getLocalUserName();
			if (usuario) {
				vm.usuarioAtual = usuario;
			}

		}

		function callLogout() {
			Login.logout();
	  }
}
