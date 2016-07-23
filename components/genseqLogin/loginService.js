'use strict';

	angular
		.module('sbAdminApp')
		.factory('Login', Login);

	Login.$inject = ['$cookies', '$http'];

	function Login($cookies,$http) {


    	var GENSEQ_API_Server = 'http://127.0.0.1:8000/genseq_api/';

		var Login = {
			//registro: registro,
			login: login,
			logout: logout,
			//setAuthenticatedUser: setAuthenticatedUser,
			//getAuthenticatedUser: getAuthenticatedUser,
			//isAuthenticated: isAuthenticated,
			//unauthenticate: unauthenticate
		};

		return Login;
/*
		function registro(email, password, nome){
			return $http.post('http://127.0.0.1:8000/genseq_api/usuarios/',{
				email: email,
				password: password,
				nome: nome
			}).then(registroSuccess, registroError);

			//Se o usuário foi registrado com sucesso, faz login
			//VERIFICAR UTILIZAÇÃO DESSA FUNÇÃO NO NOSSO CONTEXTO
			function registroSuccess(data, status, headers, config) {
				Autenticacao.login(email, password);
			}

			function registroError(data, status, headers, config) {
				console.error('Erro no registro! *sad face* ')
			}
		} */

		function login(email, password) {
			return $http.post('http://127.0.0.1:8000/genseq_api/login/',{
				email: email,
				password: password
			}).then(loginSuccess, loginError);

			function loginSuccess(data, status, headers, config) {
				Autenticacao.setAuthenticatedUser(data.data);
				window.location = '/#/dashboard/novo_usuario'; //CHECK EFFECT
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

				window.location = '/#/dashboard';
			}

			function logoutError(data, status, headers, config) {
				cosole.error('Erro ao tentar logout! *sad face* ')
			}

		}

        /*
		function setAuthenticatedUser(usuario) {
			$cookies.authenticatedUser = JSON.stringify(usuario);
		}

		function getAuthenticatedUser(){
			if (!$cookies.authenticatedUser){
				return;
			}

			return JSON.parse($cookies.authenticatedUser);
		}

		function isAuthenticated() {
			return !!$cookies.authenticatedUser;
		}

		function unauthenticate() {
			delete $cookies.authenticatedUser;
		}
        */
	}
