'use strict';

	angular.module('sbAdminApp')
		.controller('UsuariosController', UsuariosController);

	UsuariosController.$inject = ['$location', '$scope','$localStorage', 'Instituicao', 'Usuario'];

	function UsuariosController($location, $scope, $localStorage, Instituicao, Usuario) {
		var vm = this;



		vm.usuario = undefined;
		vm.registro = registro;
		vm.update = update;
		vm.lista_usuarios = [];
		vm.edit_registro_adm = edit_registro_adm;
		listar_instituicoes();
		//listar_papeis()
		listar_usuarios();

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

		function pick_instituicao(registro){
			vm.instituicao = registro;
		}

		function listar_instituicoes() {
			Instituicao.listar_instituicoes().then(instituicaoSuccessFn, instituicaoErrorFn);

			  function instituicaoSuccessFn(data, status, headers, config) {
				vm.lista_instituicoes = data.data;
			  }

			  function instituicaoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar Instituições!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}

		function listar_usuarios() {
			Usuario.listar_usuarios().then(requestSuccess, requestError);

			  function requestSuccess(data, status, headers, config) {
				vm.lista_usuarios = data.data;
			  }

			  function requestError(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar Usuarios!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}

		function edit_registro_adm(index) {
			$('#EditUsuarioAdmModal').modal('show');
			vm.id = vm.lista_usuarios[index].id;
			vm.nome = vm.lista_usuarios[index].nome;
			vm.email = vm.lista_usuarios[index].email;
			vm.instituicao = vm.lista_usuarios[index].instituicao;
			vm.dt_autorizacao = vm.lista_usuarios[index].autorizado_em;
			/*var i;
			for (i in vm.lista_usuarios[index].membros){
				vm.membros_projeto.unshift({
					id: vm.lista_usuarios[index].membros[i].id,
					usuario: vm.lista_projetos[index].membros[i].usuario.id,
					papel:vm.lista_projetos[index].membros[i].papel,
					projeto:vm.lista_projetos[index].id
				});
				vm.membros_projeto_view.unshift({
					id: vm.lista_projetos[index].membros[i].id,
					usuario: vm.lista_projetos[index].membros[i].usuario,
					papel:vm.lista_projetos[index].membros[i].papel,
					projeto:vm.lista_projetos[index].id
				});
			}*/
		}
	}
