'use strict'

angular
		.module('sbAdminApp')
		.factory('KitDeplecao', KitDeplecao);

	KitDeplecao.$inject = ['$http'];

	function KitDeplecao($http) {

		var KitDeplecao = {
			submit: submit,
			listar_kitdeplecao : listar_kitdeplecao,
			destroy: destroy
		};

		return KitDeplecao;

		function submit(descricao){
			return $http.post('http://127.0.0.1:8000/genseq_api/kit_deplecao/',{
				descricao: descricao
			});
		}

		function listar_kitdeplecao(){
			return $http.get('http://127.0.0.1:8000/genseq_api/kit_deplecao/');
		}

		function destroy(descricao) {
			return $http.delete('http://127.0.0.1:8000/genseq_api/kit_deplecao/' + descricao + '/');
		}
	}
