'use strict'

angular.module('sbAdminApp')
		.controller('ProjetosController', ProjetosController);

	ProjetosController.$inject = ['$rootScope', '$scope', '$localStorage', 'Instituicao', 'Projeto','Usuario'];

	function ProjetosController($rootScope, $scope, $localStorage, Instituicao, Projeto, Usuario){
		var vm = this;

		vm.add_instituicao = add_instituicao;
		vm.limpar_membros = limpar_membros;
		vm.remove = remove;
		vm.remove_bd = remove_bd;
		vm.add_membro = add_membro;
		vm.salvar_membros = salvar_membros;
		vm.edit_membros = edit_membros;
		vm.pick_instituicao = pick_instituicao;
		vm.submit = submit;
		vm.adicionar_projeto = adicionar_projeto;
		vm.edit_registro = edit_registro;
		vm.edit_registro_adm = edit_registro_adm;
		vm.update = update;
		vm.aprovar_projeto = aprovar_projeto;
		vm.desaprovar_projeto = desaprovar_projeto;
		vm.projeto = {};
		vm.lista_projetos=[];
		vm.lista_instituicoes=[];
		vm.lista_papeis = [];
		vm.membros_projeto=[];
		vm.membros_projeto_view=[];
		vm.resposta= [];
		vm.usuario=$localStorage.user.id;
		vm.nivel_acesso=$localStorage.user.nivel_acesso;
		listar_instituicoes();
		listar_projetos();
		listar_usuarios();
		listar_papeis();


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
		function limpar_membros(){
			vm.membros_projeto = [];
			vm.membros_projeto_view = [];
		}
		function remove(registro){
			var index = vm.membros_projeto.indexOf(registro);
			vm.membros_projeto.splice(index, 1);
			vm.membros_projeto_view.splice(index, 1);
		}
		function remove_bd(registro){
		var index = vm.membros_projeto_view.indexOf(registro);
			if (registro.id != null){
				Projeto.delete_membro(registro.id);
			}
			vm.membros_projeto.splice(index, 1);
			vm.membros_projeto_view.splice(index, 1);

		}
		function add_membro(membro,papel){
			vm.membros_projeto_view.unshift({
				usuario: membro,
				papel:vm.lista_papeis[0]

			});

			vm.membros_projeto.unshift({
				usuario: membro.id,
				papel:vm.lista_papeis[0]

			});

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
		function listar_papeis(){
			Projeto.listar_papeis().then(projetoSuccessFn, projetoErrorFn);

			  function projetoSuccessFn(data, status, headers, config) {
				vm.lista_papeis = data.data;
			  }

			  function projetoErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Erro ao carregar Papéis!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}

		function listar_projetos() {
			if (vm.usuario != null && vm.nivel_acesso!= 1 ){
				Projeto.listar_projetos_usuario(vm.usuario).then(projetoSuccessFn, projetoErrorFn);
			}else if (vm.nivel_acesso == 1){
				Projeto.listar_projetos().then(projetoSuccessFn, projetoErrorFn);
			}
			  function projetoSuccessFn(data, status, headers, config) {
				vm.lista_projetos = data.data;
			  }

			  function projetoErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Erro ao carregar Projetos!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}

		function listar_usuarios() {
			Usuario.listar_usuarios().then(projetoSuccessFn, projetoErrorFn);

			  function projetoSuccessFn(data, status, headers, config) {
				vm.lista_usuarios = data.data;
			  }

			  function projetoErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Erro ao carregar Usuarios!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}

		function submit() {

			Projeto.submit(vm.nome,vm.descricao,vm.instituicao.id).then(projetoSuccessFn, projetoErrorFn);

			function projetoSuccessFn(data, status, headers, config) {
				vm.descricao = null;
				vm.nome = null;
				vm.instituicao = null;
				$('#AddProjetoModal').modal('hide');
				vm.resposta = angular.fromJson(data);
				vm.id = vm.resposta.data.id;
				salvar_membros();
				limpar_membros();
				listar_projetos();
				Snackbar.show({ pos: 'bottom-center', text: 'Projeto adicionado com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
				
			  }

			  function projetoErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Projeto não pode ser adicionado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		function update(){
			Projeto.update(vm.id, vm.nome, vm.descricao, vm.instituicao.id).then(projetoSuccessFn, projetoErrorFn);

			function projetoSuccessFn(data, status, headers, config) {
				vm.id =null;
				vm.descricao = null;
				vm.nome = null;
				vm.instituicao = null;
				limpar_membros();
				$('#EditProjetoModal').modal('hide');
				Snackbar.show({ pos: 'bottom-center', text: 'Projeto editado com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
				listar_projetos();
			  }

			  function projetoErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Projeto não pode ser editado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		function aprovar_projeto(){
			vm.autorizado_em = new Date();
			Projeto.aprovar_projeto(vm.id,vm.usuario, vm.autorizado_em, vm.nome, vm.descricao, vm.instituicao.id).then(projetoSuccessFn, projetoErrorFn);

			function projetoSuccessFn(data, status, headers, config) {
				listar_projetos();
				limpar_membros();
				$('#EditProjetoAdmModal').modal('hide');
			  }

			  function projetoErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Projeto não pode ser aprovado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}

		function desaprovar_projeto(){
			vm.autorizado_em = null;
			Projeto.aprovar_projeto(vm.id,vm.usuario, vm.autorizado_em, vm.nome, vm.descricao, vm.instituicao.id).then(projetoSuccessFn, projetoErrorFn);

			function projetoSuccessFn(data, status, headers, config) {
				listar_projetos();
				limpar_membros();
				$('#EditProjetoAdmModal').modal('hide');
			  }

			  function projetoErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Projeto não pode ser desaprovado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}

		function edit_registro(registro) {
			var index = vm.lista_projetos.indexOf(registro);
			limpar_membros();
			vm.id = vm.lista_projetos[index].id;
			vm.nome = vm.lista_projetos[index].nome;
			vm.descricao = vm.lista_projetos[index].descricao;
			vm.instituicao = vm.lista_projetos[index].instituicao;
			vm.dt_autorizacao = vm.lista_projetos[index].autorizado_em;
			var i;
			for (i in vm.lista_projetos[index].membros){
				vm.membros_projeto.unshift({
					id: vm.lista_projetos[index].membros[i].id,
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
			}
			$('#EditProjetoModal').modal('show');
		}

		function adicionar_projeto(){
			vm.id = null;
			vm.nome = null;
			vm.descricao = null;
			vm.instituicao = null;
			vm.dt_autorizacao =null;
			limpar_membros();
			$('#AddProjetoModal').modal('show');
			}
		function edit_registro_adm(registro) {
			var index = vm.lista_projetos.indexOf(registro);
			limpar_membros();
			$('#EditProjetoAdmModal').modal('show');
			vm.id = vm.lista_projetos[index].id;
			vm.nome = vm.lista_projetos[index].nome;
			vm.descricao = vm.lista_projetos[index].descricao;
			vm.instituicao = vm.lista_projetos[index].instituicao;
			vm.dt_autorizacao = vm.lista_projetos[index].autorizado_em;
			var i;
			for (i in vm.lista_projetos[index].membros){
				vm.membros_projeto.unshift({
					id: vm.lista_projetos[index].membros[i].id,
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
			}
		}
		function edit_membros() {

			var i;
			for (i in vm.membros_projeto){
				if (vm.membros_projeto[i].id !=null){
						vm.membros_projeto_view[i].papel = vm.membros_projeto[i].papel;
						Projeto.update_membros(vm.membros_projeto[i].id, vm.membros_projeto[i].usuario, vm.membros_projeto[i].projeto, vm.membros_projeto[i].papel.id).then(projetoSuccessFn, projetoErrorFn);
				}else{
					Projeto.add_membros(vm.membros_projeto[i].usuario,vm.id, vm.membros_projeto[i].papel.id).then(projetoSuccessFn, projetoErrorFn);
				}
			}
			listar_projetos();
			$('#EditMembrosModal').modal('hide');
			$('#EditProjetoAdmModal').modal('hide');
			$('#EditProjetoModal').modal('hide');

			function projetoSuccessFn(data, status, headers, config) {

			  }

			  function projetoErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Membro não pode ser editado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		function salvar_membros() {

			var i;
			for (i in vm.membros_projeto_view){
				Projeto.add_membros(vm.membros_projeto_view[i].usuario.id,vm.id, vm.membros_projeto_view[i].papel.id).then(projetoSuccessFn, projetoErrorFn);
			}
			$('#AddMembrosModal').modal('hide');

			function projetoSuccessFn(data, status, headers, config) {

			  }

			  function projetoErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Membro não pode ser editado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
	}
