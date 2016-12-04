'use strict'

angular.module('sbAdminApp')
		.controller('AmostrasController', AmostrasController);

	AmostrasController.$inject = ['$rootScope', '$scope', '$localStorage', 'Amostra','Projeto','Sistema', 'Servico'];

	function AmostrasController($rootScope, $scope, $localStorage, Amostra, Projeto, Sistema, Servico){
		var vm = this;
		vm.listar_projetos = listar_projetos;
		vm.edit_registro = edit_registro;
		vm.edit_registro_adm = edit_registro_adm;
		vm.add_amostra = add_amostra;
		vm.submit = submit;
		vm.remove = remove;
		vm.rejeitar_amostra = rejeitar_amostra;
		vm.receber_amostra = receber_amostra;
		vm.lista_projetos=[];
		vm.lista_amostras=[];
		vm.lista_sistemas=[];
		vm.lista_servicos=[];
		vm.lista_tipos=[{"id":"O","descricao": "Organismo"},{"id":"G","descricao": "Gel"}];
		vm.usuario=$localStorage.user.id;
		vm.nivel_acesso=$localStorage.user.nivel_acesso;
		listar_projetos();
		listar_sistemas();
		listar_servicos();

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
		function listar_sistemas() {
			Sistema.listar_sistemas().then(sistemaSuccessFn, sistemaErrorFn);

			  function sistemaSuccessFn(data, status, headers, config) {
				vm.lista_sistemas = data.data;
			  }

			  function sistemaErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Erro ao carregar Sistemas!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function listar_servicos() {
			Servico.listar_servicos().then(servicoSuccessFn, servicoErrorFn);

			  function servicoSuccessFn(data, status, headers, config) {
				vm.lista_servicos = data.data;
			  }

			  function servicoErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Erro ao carregar Servicos!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function edit_registro(index) {
			listar_projetos();
			vm.index = index;
			vm.id = vm.lista_projetos[index].id;
			vm.lista_amostra_projeto = vm.lista_projetos[index].amostras;
			$('#EditProjetoModal').modal('show');
		}

		function edit_registro_adm(index) {
			listar_projetos();
			vm.index = index;
			vm.id = vm.lista_projetos[index].id;
			vm.lista_amostra_projeto = vm.lista_projetos[index].amostras;
			$('#EditProjetoAdmModal').modal('show');
		}
		function add_amostra(){
			$('#AddAmostraModal').modal('show');
			vm.status = 1;
			vm.sistema= null;
			vm.servico = null;
			vm.tipo = null;
			vm.organismo = null;
			vm.observacao = null;
			vm.cod_origem= null;
			vm.qualidade= null;
		}
		function receber_amostra(registro){
			vm.status = 2;
			vm.id = registro.amostra.id;
			vm.sistema= registro.amostra.sistema.id;
			vm.servico = registro.amostra.servico.id;
			vm.tipo = registro.amostra.tipo;
			vm.organismo = registro.amostra.organismo;
			vm.observacao = registro.amostra.observacao;
			vm.cod_origem= registro.amostra.cod_origem;
			vm.qualidade= registro.amostra.qualidade;
			Amostra.update(vm.id, vm.sistema,vm.servico,vm.tipo, vm.status, vm.organismo, vm.observacao, vm.cod_origem, vm.qualidade).then(amostraSuccessFn, amostraErrorFn);

			function amostraSuccessFn(data, status, headers, config) {
				listar_projetos();
				$('#EditProjetoAdmModal').modal('hide');
			  }

			  function amostraErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Amostra não pode ser recebida!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}

		function rejeitar_amostra(registro){
			vm.status = 3;
			vm.id = registro.amostra.id;
			vm.sistema= registro.amostra.sistema.id;
			vm.servico = registro.amostra.servico.id;
			vm.tipo = registro.amostra.tipo;
			vm.organismo = registro.amostra.organismo;
			vm.observacao = registro.amostra.observacao;
			vm.cod_origem= registro.amostra.cod_origem;
			vm.qualidade= registro.amostra.qualidade;
			Amostra.update(vm.id, vm.sistema,vm.servico,vm.tipo, vm.status, vm.organismo, vm.observacao, vm.cod_origem, vm.qualidade).then(amostraSuccessFn, amostraErrorFn);

			function amostraSuccessFn(data, status, headers, config) {
				listar_projetos();
				$('#EditProjetoAdmModal').modal('hide');
			  }

			  function amostraErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Amostra não pode ser rejeitada!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		function submit(){
		Amostra.submit(vm.sistema.id,vm.servico.id,vm.tipo.id, vm.status, vm.organismo, vm.observacao, vm.cod_origem, vm.qualidade).then(amostraSuccessFn, amostraErrorFn);

			function amostraSuccessFn(data, status, headers, config) {
				vm.resposta = angular.fromJson(data);
				vm.id_amostra = vm.resposta.data.id;
				vm.responsavel_envio = vm.usuario;
				Amostra.add_projetoamostra(vm.id,vm.id_amostra, vm.responsavel_envio);
				vm.sistema = null;
				vm.servico = null;
				vm.tipo_organismo = null;
				vm.organismo= null;
				vm.observacao= null;
				vm.cod_origem= null;
				vm.qualidade= null;
				$('#AddAmostraModal').modal('hide');
				$('#EditProjetoModal').modal('hide');
				$('#EditProjetoAdmModal').modal('hide');
				listar_projetos();
				Snackbar.show({ pos: 'bottom-center', text: 'Amostra adicionada com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});

			  }

			  function amostraErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Projeto não pode ser adicionado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}

		function remove(registro){

			Amostra.destroy(registro.amostra.id).then(amostraSuccessFn, amostraErrorFn);

			function amostraSuccessFn(data, status, headers, config) {
				var index = vm.lista_amostra_projeto.indexOf(registro);
				vm.lista_amostra_projeto.splice(index, 1);
				listar_projetos();
			}

			function amostraErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Membro não pode ser excluido!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			}
		}
	}
