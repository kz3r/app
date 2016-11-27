'use strict';

	angular.module('sbAdminApp')
		.controller('UsuariosController', UsuariosController);

	UsuariosController.$inject = ['$location', '$scope','$localStorage', 'Usuario'];

	function UsuariosController($location, $scope, $localStorage, Usuario) {
		var vm = this;

		vm.usuario = undefined;
		vm.registro = registro;
		vm.update = update;

		activate();

		/* GUIDE MASK EXAMPLES
		Getting the unmasked typed value
		$('.date').cleanVal();

		Getting a masked value programmatically
		$('.date').masked('19840807');
		// END
		//Form Telefone
		var options =  {
				onKeyPress: function(phone, e, field, options){
				  var masks = ['(00)0000-00000', '(00)00000-0000'];
			    var thisMask = (phone.length>13) ? masks[1] : masks[0];
				  $('.phone-mask').mask(thisMask, options);
				}
		};
		$('.phone-mask').mask('(00)0000-00000', options);
		*/

		/** Activate é evocado no momento em que o controller é instanciado **/
		function activate() {
			//var emailUsuario = $routeParams.username.substr(1); // TODO Check $routeParams.username
			if (!!$localStorage.user) {
				vm.usuario = $localStorage.user;

				console.log("Local Storage Yeah");
			} else {
				window.location = '/#/dashboard/home'
				console.log("Erro ao recuperar informaçoes do usuário. Armazenamento local desabilitado");
			}
			// Usuario.get('Papyrus').then(usuarioSuccessFn, usuarioErrorFn);
			//
			// function usuarioSuccessFn(data, status, headers, config) {
			// 	vm.usuario = data.data;
			// }
			// function usuarioErrorFn(data, status, headers, config) {
			// 	window.location = '/#/dashboard/home';
			// 	SnackBar.error('Usuário não encontrado.')
			// }
		}

		function update() {

			Usuario.update(vm.usuario).then(usuarioSuccessFn, usuarioErrorFn);

			function usuarioSuccessFn(data, status, headers, config) {
				SnackBar.show('Seu perfil foi atualizado');
			}
			function usuarioErrorFn(data, status, headers, config) {
				SnackBar.error(data.error);
			}
		}

		function registro() {
			Usuario.registro(vm.email, vm.password, vm.nome);
		}
	}
