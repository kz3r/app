'use strict'

angular.module('sbAdminApp')
		.controller('KitDeplecaoController', KitDeplecaoController);

	KitDeplecaoController.$inject = ['$rootScope', '$scope', 'KitDeplecao'];

	function KitDeplecaoController($rootScope, $scope, KitDeplecao){
		var vm = this;

		vm.submit = submit;
		vm.destroy = destroy;
		vm.lista_kitdeplecao=[];
		activate();

		function submit() {

			KitDeplecao.submit(vm.descricao).then(kitdeplecaoSuccessFn, kitdeplecaoErrorFn);

			function kitdeplecaoSuccessFn(data, status, headers, config) {
				vm.lista_kitdeplecao.unshift({
				descricao: vm.descricao
				});
				vm.descricao = [];
				Snackbar.show({ pos: 'bottom-center', text: 'Kit de Depleção adicionado com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
			  }

			  function kitdeplecaoErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Kit de Depleção não pode ser adicionado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		function destroy(id) {
		  KitDeplecao.destroy(vm.lista_kitdeplecao[id].descricao).then(delkitdeplecaoSuccessFn, delkitdeplecaoErrorFn);

		  function delkitdeplecaoSuccessFn(data, status, headers, config) {
			activate();
			Snackbar.show({ pos: 'bottom-center', text: 'Kit de Depleção excluido com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
		  }

		  function delkitdeplecaoErrorFn(data, status, headers, config) {
			Snackbar.show({ pos: 'bottom-center', text: 'Kit de Depleção não pode ser excluido!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
		  }
		}
		function activate() {
			KitDeplecao.listar_kitdeplecao().then(kitdeplecaoSuccessFn, kitdeplecaoErrorFn);

			  function kitdeplecaoSuccessFn(data, status, headers, config) {
				vm.lista_kitdeplecao = data.data;
			  }

			  function kitdeplecaoErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Erro ao carregar kits de depleção!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
	}
