'use strict';

	angular
		.module('sbAdminApp')
		.factory('Sistema',['$http', function($http, Sistema) {

	//Sistema.$inject = ['$cookies', '$http'];
	//function Sistema($cookies,$http) {
		var GENSEQ_API_Server = 'http://127.0.0.1:8000/genseq_api/';
		var Sistema = {
			submit: submit,
			listar_sistemas : listar_sistemas,
			destroy: destroy
		};

		return Sistema;

		function submit(descricao){
			return $http.post('http://127.0.0.1:8000/genseq_api/sistemas/',{
				descricao: descricao
			});
		}

		function listar_sistemas(){
			return $http.get('http://127.0.0.1:8000/genseq_api/sistemas/');
		}

		function destroy(descricao) {
			return $http.delete('http://127.0.0.1:8000/genseq_api/sistemas/' + descricao + '/');
		}
	}]);
