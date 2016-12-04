'use strict';

	angular.module('sbAdminApp')
		.controller('ServicosController', ServicosController);

	ServicosController.$inject = [ '$rootScope', '$scope', 'Servico'];

	function ServicosController( $rootScope, $scope, Servico){
		var vm = this;
		vm.submit = submit;
		vm.destroy = destroy;
		vm.lista_servicos=[];
		activate();

		function submit() {

			Servico.submit(vm.descricao).then(servicosSuccessFn, servicosErrorFn);

			function servicosSuccessFn(data, status, headers, config) {
				vm.descricao = [];
				activate();
				Snackbar.show({ pos: 'bottom-center', text: 'Serviço adicionado com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
			}
			function servicosErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Serviço não pode ser adicionado!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			}
		}
		function destroy(id) {
			Servico.destroy(vm.lista_servicos[id].id).then(delservicosSuccessFn, delservicosErrorFn);

		  function delservicosSuccessFn(data, status, headers, config) {
			activate();
			Snackbar.show({ pos: 'bottom-center', text: 'Serviço excluido com sucesso!', actionText: 'Ocultar', actionTextColor: '#00FF00'});
		  }

		  function delservicosErrorFn(data, status, headers, config) {
			Snackbar.show({ pos: 'bottom-center', text: 'Serviço não pode ser excluido!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
		  }
		}
		function activate() {
			Servico.listar_servicos().then(servicosSuccessFn, servicosErrorFn);

			  function servicosSuccessFn(data, status, headers, config) {
				vm.lista_servicos = data.data;
			  }

			  function servicosErrorFn(data, status, headers, config) {
				Snackbar.show({ pos: 'bottom-center', text: 'Erro ao carregar serviços!', actionText: 'Ocultar', actionTextColor: '#FF0000'});
			  }

		}
	}
