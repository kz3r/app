'use strict';

	angular
		.module('sbAdminApp')
		.factory('Usuario', Usuario);

	Usuario.$inject = ['$http'];

	function Usuario($http) {

		var Usuario = {
			listar_usuarios : listar_usuarios,
			get: get,
			update: update

		};
        var GENSEQ_API_Server = 'http://127.0.0.1:8000/genseq_api/';

		return Usuario;

		function listar_usuarios(){
			return $http.get('http://127.0.0.1:8000/genseq_api/usuarios/');
		}

		function get(emailUsuario) {
			return $http.get('http://127.0.0.1:8000/genseq_api/usuarios/' + emailUsuario + '/');
		}

		function update(perfilUsuario) {
			return $http.put('http://127.0.0.1:8000/genseq_api/usuarios/' + emailUsuario + '/', perfilUsuario );
		}
	}
