'use strict';

	angular
		.module('sbAdminApp')
		.factory('Autenticacao', Autenticacao);

	Autenticacao.$inject = ['$cookies', '$http','$localStorage'];

	function Autenticacao($cookies, $http, $localStorage) {


    	var GENSEQ_API_Server = 'http://127.0.0.1:8000/genseq_api/';

		var Autenticacao = {
			//registro: registro,
			//login: login,
			//logout: logout,
			setAuthenticatedUser: setAuthenticatedUser,
			getAuthenticatedUser: getAuthenticatedUser,
			getLocalUser: getLocalUser,
			isAuthenticated: isAuthenticated,
			unauthenticate: unauthenticate
		};

		return Autenticacao;

		function setAuthenticatedUser(user_info) {
			// $cookies.authenticatedUser = JSON.stringify(usuario);
			//var json_user = JSON.parse(user_info);

			//$cookies.authenticatedUser = ('authkey ' + btoa(user_info.email)) ;
			if ( user_info.nivel_acesso == null) {
				user_info.nivel_acesso = undefined;
			}
			$cookies.authenticatedUser = ('user: ' + user_info);
			$localStorage.user = user_info;

			//Tentativa de settar algum componente próprio de autenticação
			//var authdata = Base64.encode(
		}

		function getAuthenticatedUser(){
			if (!$cookies.authenticatedUser){
				return;
			}

			return JSON.parse($cookies.authenticatedUser);
		}

		function getLocalUser() {
			if($localStorage.user) {
				return $localStorage.user
		 	} else {
		 		return null;
			}
		}

		function isAuthenticated() {
			return !!$cookies.authenticatedUser;
		}

		function unauthenticate() {
			delete $cookies.authenticatedUser;
			$localStorage.user = null;
		}
	}
