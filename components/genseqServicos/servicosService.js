'use strict';

	angular
		.module('sbAdminApp')
		.factory('Servico',['$http', function($http, Servico) {

	//Servico.$inject = ['$cookies', '$http'];
	//function Servico($cookies,$http) {
		var GENSEQ_API_Server = 'http://127.0.0.1:8000/genseq_api/';
		var Servico = {
			submit: submit,
			listar_servicos : listar_servicos,
			destroy: destroy
		};

		return Servico;

		function submit(descricao){
			return $http.post('http://127.0.0.1:8000/genseq_api/servicos/',{
				descricao: descricao
			});
		}

		function listar_servicos(){
			return $http.get('http://127.0.0.1:8000/genseq_api/servicos/');
		}

		function destroy(descricao) {
			return $http.delete('http://127.0.0.1:8000/genseq_api/servicos/' + descricao + '/');
		}
	}]);
