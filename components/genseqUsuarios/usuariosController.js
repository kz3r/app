'use strict';

	angular.module('sbAdminApp')
		.controller('UsuariosController', UsuariosController);

	UsuariosController.$inject = ['$location', '$scope', 'Usuario'];

	function UsuariosController($location, $scope, Usuario) {
		var vm = this;

		vm.usuario = undefined;

		activate();

		/** Activate é evocado no momento em que o controller é instanciado **/
		function activate() {
			//var emailUsuario = $routeParams.username.substr(1); // TODO Check $routeParams.username
			Usuario.get('Papyrus').then(usuarioSuccessFn, usuarioErrorFn);

			function usuarioSuccessFn(data, status, headers, config) {
				vm.usuario = data.data;
			}
			function usuarioErrorFn(data, status, headers, config) {
				window.location = '/#/dashboard/home';
				SnackBar.error('Usuário não encontrado.')
			}
		}

		function update() {
			Usuario.update('Papyrus').then(usuarioSuccessFn, usuarioErrorFn);

			function usuarioSuccessFn(data, status, headers, config) {
				SnackBar.show('Seu perfil foi atualizado');
			}
			function usuarioErrorFn(data, status, headers, config) {
				SnackBar.error(data.error);
			}
		}
	}
