'use strict'

angular.module('sbAdminApp')
		.controller('AmostrasController', AmostrasController);

	AmostrasController.$inject = ['$rootScope', '$scope', 'Amostra','Projeto','Sistema', 'Servico'];

	function AmostrasController($rootScope, $scope, Amostra, Projeto, Sistema, Servico){
		var vm = this;
		vm.listar_projetos = listar_projetos;
		vm.edit_registro = edit_registro;
		vm.submit = submit;
		vm.lista_projetos=[];
		vm.lista_amostras=[];
		vm.lista_sistemas=[];
		vm.lista_servicos=[];
		listar_projetos();
		listar_sistemas();
		listar_servicos();

		function listar_projetos() {
			Projeto.listar_projetos().then(projetoSuccessFn, projetoErrorFn);

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
		function submit(){
		vm.status = 1;
		Amostra.submit(vm.sistema.id,vm.servico.id,vm.tipo_organismo, vm.status, vm.organismo).then(amostraSuccessFn, amostraErrorFn);

			function amostraSuccessFn(data, status, headers, config) {
				vm.resposta = angular.fromJson(data);
				vm.id_amostra = vm.resposta.data.id;
				vm.responsavel_envio = 2;
				Amostra.add_projetoamostra(vm.id,vm.id_amostra, vm.responsavel_envio);
				vm.sistema = [];
				vm.servico = [];
				vm.tipo_organismo = [];
				vm.organismo= [];
				listar_projetos();
				vm.lista_amostra_projeto = vm.lista_projetos[vm.index].amostras;
				$('#AddAmostraModal').modal('hide');
				SnackBar.show({ pos: 'bottom-center', text: 'Amostra adicionada com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
				
			  }

			  function amostraErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Projeto não pode ser adicionado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
	}
