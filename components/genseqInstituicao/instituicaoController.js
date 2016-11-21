'use strict'

angular.module('sbAdminApp')
		.controller('InstituicaoController', InstituicaoController);

	InstituicaoController.$inject = ['$rootScope', '$scope', 'Instituicao'];

	function InstituicaoController($rootScope, $scope, Instituicao){
		var vm = this;

		vm.submit = submit;
		vm.submit_edit = submit_edit;
		vm.destroy = destroy;
		vm.edit_registro = edit_registro;
		vm.lista_instituicao=[];
		activate();

		function submit() {

			Instituicao.submit(vm.nome).then(instituicaoSuccessFn, instituicaoErrorFn);

			function instituicaoSuccessFn(data, status, headers, config) {
				activate();
				vm.nome = [];
				SnackBar.show({ pos: 'bottom-center', text: 'Instituição adicionada com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
			  }

			  function instituicaoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Instituição não pode ser adicionada!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		function submit_edit(){
		Instituicao.update(vm.id, vm.nome).then(instituicaoSuccessFn, instituicaoErrorFn);
	
			function instituicaoSuccessFn(data, status, headers, config) {
				vm.id = [];
				vm.nome = [];
				activate();
				SnackBar.show({ pos: 'bottom-center', text: 'Instituicao salva com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
				$('#EditInstituicaoModal').modal('hide');
				
			}

			function instituicaoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Instituicao não pode ser editada!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			}
		}			  
		
		
		function destroy(registro) {
		  Instituicao.destroy(registro.id).then(instituicaoSuccessFn, instituicaoErrorFn);

		  function instituicaoSuccessFn(data, status, headers, config) {
			activate();
			SnackBar.show({ pos: 'bottom-center', text: 'Instituição excluida com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
		  }

		  function instituicaoErrorFn(data, status, headers, config) {
			SnackBar.show({ pos: 'bottom-center', text: 'Instituição não pode ser excluida!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
		  }
		}
		function activate() {
			Instituicao.listar_instituicoes().then(instituicaoSuccessFn, instituicaoErrorFn);

			  function instituicaoSuccessFn(data, status, headers, config) {
				vm.lista_instituicao = data.data;
			  }

			  function instituicaoErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar instituições!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
		function edit_registro(registro){
			vm.id = registro.id;
			vm.nome = registro.nome;
			$('#EditInstituicaoModal').modal('show');
		}
		
	}
