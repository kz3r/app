'use strict'

angular.module('sbAdminApp')
		.controller('AmostrasController', AmostrasController);

	AmostrasController.$inject = ['$rootScope', '$scope', 'Amostra','Projeto'];

	function AmostrasController($rootScope, $scope, Amostra, Projeto){
		var vm = this;
		vm.listar_projetos = listar_projetos;
		vm.edit_registro = edit_registro;
		vm.lista_projetos=[];
		
		listar_projetos();

		function listar_projetos() {
			Projeto.listar_projetos().then(projetoSuccessFn, projetoErrorFn);

			  function projetoSuccessFn(data, status, headers, config) {
				vm.lista_projetos = data.data;
			  }

			  function projetoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar Projetos!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function edit_registro(index) {
			$('#EditProjetoModal').modal('show');
			vm.id = vm.lista_projetos[index].id;
			vm.nome = vm.lista_projetos[index].nome;
			vm.descricao = vm.lista_projetos[index].descricao;
			vm.instituicao = vm.lista_projetos[index].instituicao;
			vm.membros_projeto_view =vm.lista_projetos[index].membros;
			var i;
			for (i in vm.lista_projetos[index].membros){
				vm.membros_projeto.unshift({
					id: vm.lista_projetos[index].membros[i].id,
					usuario: vm.lista_projetos[index].membros[i].usuario.id,
					papel:vm.lista_projetos[index].membros[i].papel,
					projeto:vm.lista_projetos[index].id
				});
			}
		}
		
	}
