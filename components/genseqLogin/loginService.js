'use strict';

	angular
		.module('sbAdminApp')
		.factory('Login', Login);

	Login.$inject = ['$cookies', '$http', 'Autenticacao'];

	function Login($cookies, $http, Autenticacao) {

    	var GENSEQ_API_Server = 'http://127.0.0.1:8000/genseq_api/';

		var Login = {
			login: login,
			logout: logout,
		};

		return Login;

		function login(email, password) {
			return $http.post('http://127.0.0.1:8000/genseq_api/login/',{
				email: email,
				password: password
			}).then(loginSuccess, loginError);

			function loginSuccess(data, status, headers, config) {
				Autenticacao.setAuthenticatedUser(data.data);
				window.location = '/#/dashboard/home'; //CHECK EFFECT
			}

			function loginError(data, status, headers, config) {
				console.error('Login Error! *sad face* ');
			}
		}

		function logout() {
			return $http.post( GENSEQ_API_Server + 'logout/').then(
				logoutSuccess, logoutError);

			function logoutSuccess(data, status, headers, config) {
				Autenticacao.unauthenticate();

				//window.location = '/#/dashboard';
			}

			function logoutError(data, status, headers, config) {
				console.error('Erro ao tentar logout! *sad face* ')
			}

		}

	}
