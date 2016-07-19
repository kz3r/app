'use strict';

	angular.module('sbAdminApp')
		.controller('SistemasController', SistemasController);

	SistemasController.$inject = ['$rootScope', '$scope', 'Sistema'];

	function SistemasController($rootScope, $scope, Sistema){
		var vm = this;

		vm.submit = submit;
		vm.destroy = destroy;
		vm.lista_sistemas=[];
		activate();

		function submit() {

			Sistema.submit(vm.descricao).then(sistemasSuccessFn, sistemasErrorFn);

			function sistemasSuccessFn(data, status, headers, config) {
				vm.lista_sistemas.unshift({
				descricao: vm.descricao
				});
				vm.descricao = [];
				SnackBar.show({ pos: 'bottom-center', text: 'Sistema adicionado com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
			  }

			  function sistemasErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Sistema não pode ser adicionado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }
		}
		function destroy(id) {
		  Sistema.destroy(vm.lista_sistemas[id].descricao).then(delsistemasSuccessFn, delsistemasErrorFn);

		  function delsistemasSuccessFn(data, status, headers, config) {
			activate();
			SnackBar.show({ pos: 'bottom-center', text: 'Sistema excluido com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
		  }

		  function delsistemasErrorFn(data, status, headers, config) {
			SnackBar.show({ pos: 'bottom-center', text: 'Sistema não pode ser excluido!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
		  }
		}
		function activate() {
			Sistema.listar_sistemas().then(sistemasSuccessFn, sistemasErrorFn);

			  function sistemasSuccessFn(data, status, headers, config) {
				vm.lista_sistemas = data.data;
			  }

			  function sistemasErrorFn(data, status, headers, config) {
				SnackBar.show({ pos: 'bottom-center', text: 'Erro ao carregar sistemas!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
	}
