'use strict'

angular
		.module('sbAdminApp')
		.factory('Instituicao', Instituicao);

	Instituicao.$inject = ['$http'];

	function Instituicao($http) {

		var Instituicao = {
			submit: submit,
			update: update,
			listar_instituicoes: listar_instituicoes,
			destroy: destroy
		};

		return Instituicao;

		function submit(nome){
			return $http.post('http://127.0.0.1:8000/genseq_api/instituicao/',{
				nome: nome
			});
		}
		function update(id, nome){
			return $http.put('http://127.0.0.1:8000/genseq_api/instituicao/' + id + '/',{
				nome: nome
			});
		}
		function listar_instituicoes(){
			return $http.get('http://127.0.0.1:8000/genseq_api/instituicao/');
		}

		function destroy(nome) {
			return $http.delete('http://127.0.0.1:8000/genseq_api/instituicao/' + nome + '/');
		}
	}