'use strict'

angular
		.module('sbAdminApp')
		.factory('Instituicao', Instituicao);

	Instituicao.$inject = ['$http'];

	function Instituicao($http) {

		var Instituicao = {
			submit: submit,
			listar_instituicoes: listar_instituicoes,
			destroy: destroy
		};

		return Instituicao;

		function submit(descricao){
			return $http.post('http://127.0.0.1:8000/genseq_api/instituicao/',{
				nome: nome
			});
		}

		function listar_instituicoes(){
			return $http.get('http://127.0.0.1:8000/genseq_api/instituicao/');
		}

		function destroy(descricao) {
			return $http.delete('http://127.0.0.1:8000/genseq_api/instituicao/' + nome + '/');
		}
	}