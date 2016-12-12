'use strict';

	angular.module('sbAdminApp')
		.controller('UsuariosController', UsuariosController);

	UsuariosController.$inject = ['$location', '$scope','$localStorage', 'Instituicao', 'Usuario'];

	function UsuariosController($location, $scope, $localStorage, Instituicao, Usuario) {
		var vm = this;



		vm.usuario = undefined;
		vm.registro = registro;
		vm.update = update;
		vm.update_adm = update_adm;
		vm.lista_usuarios = [];
		vm.edit_registro_adm = edit_registro_adm;
		vm.add_instituicao = add_instituicao;
		vm.pick_instituicao = pick_instituicao;
		//listar_papeis()
		vm.lista_niveisacesso = [];
		vm.lista_instituicoes=[];
		listar_instituicoes();
		listar_usuarios();
		listar_niveisacesso();

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
			} else {
				window.location = '/#/dashboard/home'
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
				Snackbar.show('Seu perfil foi atualizado');
			}
			function usuarioErrorFn(data, status, headers, config) {
				Snackbar.error(data.error);
			}
		}

		function update_adm() {
			var updateUser = {
				id: this.id,
				nome: this.nome,
				email: this.email,
				instituicao: this.instituicao.id,
				nivel_acesso: this.niveis_acesso.id,
				telefone: this.telefone,
				status: null,
				setor: this.setor,
				password: "",
				confirm_password: ""
			}
			//console.log("this");
			Usuario.update(updateUser);
		}

		function registro() {
//			vm.nivel_acesso ={id:2,descricao:'Usuário'}
			Usuario.registro(vm.email, vm.password, vm.nome, 2,vm.instituicao.id);
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
				Snackbar.show({ pos: 'bottom-center', text: 'Erro ao carregar Instituições!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function listar_niveisacesso() {
			Usuario.listar_niveisacesso().then(requestSuccess, requestError);

			  function requestSuccess(data, status, headers, config) {
				vm.lista_niveisacesso = data.data;
			  }

			  function requestError(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Erro ao carregar níveis de acesso!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function add_instituicao(){

			Instituicao.submit(vm.filtro_instituicao).then(instituicaoSuccessFn, instituicaoprojetoErrorFn);

			function instituicaoSuccessFn(data, status, headers, config) {
				listar_instituicoes();
				Snackbar.show({ pos: 'bottom-center', text: 'Instituição adicionada com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});

				}

				function instituicaoprojetoErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Instituição não pode ser adicionada!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
				}
		}

		function listar_usuarios() {
			Usuario.listar_usuarios().then(requestSuccess, requestError);

			  function requestSuccess(data, status, headers, config) {
				vm.lista_usuarios = data.data;
			  }

			  function requestError(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Erro ao carregar Usuarios!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
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
