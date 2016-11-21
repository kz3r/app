'use strict'

angular.module('sbAdminApp')
		.controller('AmostrasController', AmostrasController);

	AmostrasController.$inject = ['$rootScope', '$scope', '$localStorage', 'Amostra','Projeto','Sistema', 'Servico'];

	function AmostrasController($rootScope, $scope, $localStorage, Amostra, Projeto, Sistema, Servico){
		var vm = this;
		vm.listar_projetos = listar_projetos;
		vm.edit_registro = edit_registro;
		vm.edit_registro_adm = edit_registro_adm;
		vm.submit = submit;
		vm.remove = remove;
		vm.rejeitar_amostra = rejeitar_amostra;
		vm.receber_amostra = receber_amostra;
		vm.lista_projetos=[];
		vm.lista_amostras=[];
		vm.lista_sistemas=[];
		vm.lista_servicos=[];
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
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar Projetos!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function listar_sistemas() {
			Sistema.listar_sistemas().then(sistemaSuccessFn, sistemaErrorFn);

			  function sistemaSuccessFn(data, status, headers, config) {
				vm.lista_sistemas = data.data;
			  }

			  function sistemaErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar Sistemas!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function listar_servicos() {
			Servico.listar_servicos().then(servicoSuccessFn, servicoErrorFn);

			  function servicoSuccessFn(data, status, headers, config) {
				vm.lista_servicos = data.data;
			  }

			  function servicoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar Servicos!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function edit_registro(index) {
			$('#EditProjetoModal').modal('show');
			vm.index = index;
			vm.id = vm.lista_projetos[index].id;
			vm.lista_amostra_projeto = vm.lista_projetos[index].amostras;
		}
		
		function edit_registro_adm(index) {
			$('#EditProjetoAdmModal').modal('show');
			vm.index = index;
			vm.id = vm.lista_projetos[index].id;
			vm.lista_amostra_projeto = vm.lista_projetos[index].amostras;
		}
		function receber_amostra(registro){
			vm.status = 2;
			vm.id = registro.amostra.id;
			vm.sistema= registro.amostra.sistema.id;
			vm.servico = registro.amostra.servico.id;
			vm.tipo = registro.amostra.tipo;
			vm.organismo = registro.amostra.organismo;
			vm.observacao = registro.amostra.observacao;
			Amostra.update(vm.id, vm.sistema,vm.servico,vm.tipo, vm.status, vm.organismo, vm.observacao).then(amostraSuccessFn, amostraErrorFn);
			
			function amostraSuccessFn(data, status, headers, config) {
				listar_projetos();
				$('#EditProjetoAdmModal').modal('hide');
			  }

			  function amostraErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Amostra não pode ser recebida!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
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
			Amostra.update(vm.id, vm.sistema,vm.servico,vm.tipo, vm.status, vm.organismo, vm.observacao).then(amostraSuccessFn, amostraErrorFn);
			
			function amostraSuccessFn(data, status, headers, config) {
				listar_projetos();
				$('#EditProjetoAdmModal').modal('hide');
			  }

			  function amostraErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Amostra não pode ser rejeitada!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		function submit(){
		vm.status = 1;
		Amostra.submit(vm.sistema.id,vm.servico.id,vm.tipo, vm.status, vm.organismo, vm.observacao).then(amostraSuccessFn, amostraErrorFn);

			function amostraSuccessFn(data, status, headers, config) {
				vm.resposta = angular.fromJson(data);
				vm.id_amostra = vm.resposta.data.id;
				vm.responsavel_envio = 2;
				Amostra.add_projetoamostra(vm.id,vm.id_amostra, vm.responsavel_envio);
				vm.sistema = [];
				vm.servico = [];
				vm.tipo_organismo = [];
				vm.organismo= [];
				vm.observacao= [];
				listar_projetos();
				$('#AddAmostraModal').modal('hide');
				$('#EditProjetoModal').modal('hide');
				SnackBar.show({ pos: 'bottom-center', text: 'Amostra adicionada com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
				
			  }

			  function amostraErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Projeto não pode ser adicionado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		
		function remove(registro){
			
			Amostra.destroy(registro.amostra.id).then(amostraSuccessFn, amostraErrorFn);			
	
			function amostraSuccessFn(data, status, headers, config) {
				
				listar_projetos();
				$('#EditProjetoModal').modal('hide');
			}

			function amostraErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Membro não pode ser excluido!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			}
		}
	}
