'use strict'

angular.module('sbAdminApp')
		.controller('ProjetosController', ProjetosController);

	ProjetosController.$inject = ['$rootScope', '$scope', 'Instituicao', 'Projeto','Usuario'];

	function ProjetosController($rootScope, $scope, Instituicao, Projeto, Usuario){
		var vm = this;

		vm.add_instituicao = add_instituicao;
		vm.limpar_membros = limpar_membros;
		vm.remove = remove;
		vm.add_membro = add_membro;
		vm.pick_instituicao = pick_instituicao;
		vm.submit = submit;
		vm.edit_registro = edit_registro;
		vm.update = update;
		vm.projeto = {};
		vm.lista_projetos=[];
		vm.lista_instituicoes=[];
		vm.membros_projeto=[];
		listar_instituicoes();
		listar_projetos();
		listar_usuarios();

		function add_instituicao(){

			Instituicao.submit(vm.filtro_instituicao).then(instituicaoSuccessFn, instituicaoprojetoErrorFn);

			function instituicaoSuccessFn(data, status, headers, config) {
				listar_instituicoes();
				SnackBar.show({ pos: 'bottom-center', text: 'Instituição adicionada com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});

			  }

			  function instituicaoprojetoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Instituição não pode ser adicionada!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		function limpar_membros(){
			vm.membros_projeto = [];
		}
		function remove(registro){
			var index = vm.membros_projeto.indexOf(registro);
			vm.membros_projeto.splice(index, 1);
			index = vm.usuariosprojeto.indexOf(registro);
			vm.usuariosprojeto.splice(index, 1);  
		}
		function add_membro(membro){
			var papel = 1;
			vm.membros_projeto.unshift({
				usuario: membro,
				papel:papel

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
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar Instituições!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}

		function listar_projetos() {
			Projeto.listar_projetos().then(projetoSuccessFn, projetoErrorFn);

			  function projetoSuccessFn(data, status, headers, config) {
				vm.lista_projetos = data.data;
			  }

			  function projetoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar Projetos!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}

		function listar_usuarios() {
			Usuario.listar_usuarios().then(projetoSuccessFn, projetoErrorFn);

			  function projetoSuccessFn(data, status, headers, config) {
				vm.lista_usuarios = data.data;
			  }

			  function projetoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar Usuarios!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}

		function submit() {

			Projeto.submit(vm.nome,vm.descricao,vm.instituicao, vm.membros_projeto).then(projetoSuccessFn, projetoErrorFn);

			function projetoSuccessFn(data, status, headers, config) {
				vm.descricao = [];
				vm.nome = [];
				vm.instituicao = [];
				vm.membros_projeto = [];
			
				vm.usuariosprojeto = [];
				$('#AddProjetoModal').modal('hide');
				SnackBar.show({ pos: 'bottom-center', text: 'Projeto adicionado com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
				listar_projetos();
			  }

			  function projetoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Projeto não pode ser adicionado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		function update(){
			Projeto.update(vm.id, vm.nome, vm.descricao, vm.instituicao,vm.membros_projeto).then(projetoSuccessFn, projetoErrorFn);
			
			function projetoSuccessFn(data, status, headers, config) {
				vm.id =[];
				vm.descricao = [];
				vm.nome = [];
				vm.instituicao = [];
				vm.membros_projeto = [];
				$('#EditProjetoModal').modal('hide');
				SnackBar.show({ pos: 'bottom-center', text: 'Projeto editado com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
				listar_projetos();
			  }

			  function projetoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Projeto não pode ser editado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		
		function edit_registro(index) {
			$('#EditProjetoModal').modal('show');
			vm.id = vm.lista_projetos[index].id;
			vm.nome = vm.lista_projetos[index].nome;
			vm.descricao = vm.lista_projetos[index].descricao;
			vm.instituicao = vm.lista_projetos[index].instituicao;
			vm.membros_projeto =vm.lista_projetos[index].membros;
		}
	}
